import test from 'node:test';
import assert from 'node:assert/strict';
import { createApi, ensurePrice } from '../server/api';
const origin = 'https://lifestylehub.netlify.app';
const user = { id: 'user_1', email: 'member@example.com', name: 'Member', confirmedAt: '2026-11-01' };
const validSubscription = () => ({ id: 'sub_1', status: 'active', created: 1793500000, cancel_at_period_end: false, metadata: { app: 'lifestylehub', identity_user_id: user.id }, items: { data: [{ quantity: 1, current_period_end: Math.floor(Date.now() / 1000) + 86400, price: { product: 'lifestylehub_plus_v1', unit_amount: 1999, currency: 'usd', recurring: { interval: 'month', interval_count: 1 } } }] }, latest_invoice: { id: 'in_1', number: 'INV-1', status: 'paid' } });
function fixture(options: { user?: any; subscription?: any; storedCustomer?: string | null; session?: any } = {}) {
  const records = new Map<string, any>();
  if (options.storedCustomer !== null) records.set('customers/user_1', { id: options.storedCustomer || 'cus_1' });
  const calls: any[] = [];
  const stripe = {
    subscriptions: { list: async () => ({ data: options.subscription ? [options.subscription] : [] }) },
    customers: { create: async (params: any) => { calls.push(['customer', params]); return { id: 'cus_new' }; } },
    prices: { list: async () => ({ data: [{ id: 'price_1', unit_amount: 1999, currency: 'usd', recurring: { interval: 'month', interval_count: 1 }, product: 'lifestylehub_plus_v1' }] }) },
    checkout: { sessions: {
      list: async () => ({ data: [] }),
      create: async (params: any) => { calls.push(['checkout', params]); return { id: 'cs_test_123', url: 'https://checkout.stripe.com/c/pay/test' }; },
      retrieve: async () => options.session || { customer: 'cus_other', client_reference_id: user.id, mode: 'subscription', payment_status: 'paid', status: 'complete' },
    } },
    billingPortal: { configurations: { list: async () => ({ data: [{ id: 'bpc_1', metadata: { app: 'lifestylehub' } }] }) }, sessions: { create: async (params: any) => { calls.push(['portal', params]); return { url: 'https://billing.stripe.com/p/session/test' }; } } },
  };
  const handler = createApi({ origin, getUser: async () => Object.hasOwn(options, 'user') ? options.user : user, getStripe: () => stripe as any, getStore: () => ({ get: async (key: string) => records.get(key) || null, setJSON: async (key: string, value: any) => { if (records.has(key)) return { modified: false }; records.set(key, value); return { modified: true }; } }) as any });
  const request = (path: string, body?: any, headers: Record<string, string> = {}) => handler(new Request(`${origin}/api/${path}`, { method: body === undefined ? 'GET' : 'POST', headers: { origin, 'content-type': 'application/json', ...headers }, body: body === undefined ? undefined : JSON.stringify(body) }));
  return { request, calls, stripe, handler };
}
test('anonymous users cannot read account or premium content', async () => {
  const { request } = fixture({ user: null });
  assert.equal((await request('me')).status, 401);
  assert.equal((await request('content?kind=recipes')).status, 401);
});
test('unconfirmed email cannot activate an account', async () => {
  assert.equal((await fixture({ user: { ...user, confirmedAt: undefined } }).request('me')).status, 401);
});
test('local storage or client-provided subscription flags cannot grant access', async () => {
  const { request } = fixture();
  assert.equal((await request('content?kind=recipes')).status, 403);
  const response = await request('checkout', { tier: 'plus', agreedToLegal: true, isActive: true, amount: 1, customer: 'cus_victim' });
  assert.equal(response.status, 200);
});
test('checkout uses authenticated customer and server price, ignores client amounts and redirects', async () => {
  const { request, calls } = fixture();
  await request('checkout', { tier: 'plus', agreedToLegal: true, amount: 1, customer: 'cus_victim', success_url: 'https://evil.example' });
  const params = calls.find(([kind]) => kind === 'checkout')[1];
  assert.equal(params.customer, 'cus_1'); assert.equal(params.client_reference_id, user.id);
  assert.deepEqual(params.line_items, [{ price: 'price_1', quantity: 1 }]);
  assert.equal(params.success_url, `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`);
});
test('invalid plans and missing consent fail before creating checkout', async () => {
  const { request, calls } = fixture();
  assert.equal((await request('checkout', { tier: '__proto__', agreedToLegal: true })).status, 400);
  assert.equal((await request('checkout', { tier: 'plus', agreedToLegal: false })).status, 400);
  assert.equal(calls.length, 0);
});
test('cross-origin requests are rejected even for authenticated users', async () => {
  assert.equal((await fixture().request('checkout', { tier: 'plus', agreedToLegal: true }, { origin: 'https://evil.example' })).status, 403);
});
test('active paid Plus subscription returns protected content with no-store', async () => {
  const response = await fixture({ subscription: validSubscription() }).request('content?kind=workouts');
  assert.equal(response.status, 200); assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  assert.ok((await response.json()).routines.length > 0);
});
test('Essentials membership cannot access Plus features', async () => {
  const sub = validSubscription(); sub.items.data[0].price.product = 'lifestylehub_essentials_v1'; sub.items.data[0].price.unit_amount = 999;
  const { request } = fixture({ subscription: sub });
  assert.equal((await request('content?kind=recipes')).status, 200);
  assert.equal((await request('content?kind=workouts')).status, 403);
  assert.equal((await request('content?kind=styling')).status, 403);
});
test('canceled, unpaid, past_due, and expired subscriptions cannot access premium content', async () => {
  for (const status of ['canceled', 'past_due', 'unpaid', 'incomplete', 'trialing']) {
    const sub = validSubscription(); sub.status = status;
    assert.equal((await fixture({ subscription: sub }).request('content?kind=recipes')).status, 403, status);
  }
  const sub = validSubscription(); sub.items.data[0].current_period_end = 1;
  assert.equal((await fixture({ subscription: sub }).request('content?kind=recipes')).status, 403);
});
test('unpaid invoices and mismatched ownership cannot grant membership', async () => {
  const unpaid = validSubscription(); unpaid.latest_invoice.status = 'open';
  assert.equal((await fixture({ subscription: unpaid }).request('content?kind=recipes')).status, 403);
  const other = validSubscription(); other.metadata.identity_user_id = 'another_user';
  assert.equal((await fixture({ subscription: other }).request('content?kind=recipes')).status, 403);
});
test('paid subscribers cannot accidentally buy a duplicate subscription', async () => {
  const { request, calls } = fixture({ subscription: validSubscription() });
  assert.equal((await request('checkout', { tier: 'plus', agreedToLegal: true })).status, 409);
  assert.equal(calls.length, 0);
});
test('checkout success requires matching customer and user, not just a supplied session ID', async () => {
  const response = await fixture({ subscription: validSubscription() }).request('checkout-status', { sessionId: 'cs_test_123' });
  assert.equal(response.status, 403);
});
test('matching completed paid checkout returns verified membership', async () => {
  const session = { customer: 'cus_1', client_reference_id: user.id, mode: 'subscription', payment_status: 'paid', status: 'complete' };
  const response = await fixture({ subscription: validSubscription(), session }).request('checkout-status', { sessionId: 'cs_test_123' });
  assert.equal(response.status, 200); assert.equal((await response.json()).subscription.tier, 'plus');
});
test('pending checkout never grants membership', async () => {
  const session = { customer: 'cus_1', client_reference_id: user.id, mode: 'subscription', payment_status: 'unpaid', status: 'open' };
  const response = await fixture({ session }).request('checkout-status', { sessionId: 'cs_test_123' });
  assert.equal(response.status, 202); assert.equal((await response.json()).subscription, null);
});
test('portal is scoped to the authenticated customer', async () => {
  const { request, calls } = fixture({ subscription: validSubscription() });
  assert.equal((await request('portal', {})).status, 200);
  assert.equal(calls[0][1].customer, 'cus_1');
});
test('catalog provisioning rejects a changed or spoofed price', async () => {
  const { stripe } = fixture();
  stripe.prices.list = async () => ({ data: [{ id: 'price_wrong', unit_amount: 1, currency: 'usd', recurring: { interval: 'month', interval_count: 1 }, product: 'lifestylehub_plus_v1' }] });
  await assert.rejects(ensurePrice(stripe as any, 'plus'), /billing catalog/);
});
test('catalog creates product and monthly price automatically with idempotency keys', async () => {
  const calls: any[] = [];
  const missing = Object.assign(new Error('Not found'), { code: 'resource_missing' });
  const stripe: any = {
    products: { retrieve: async () => { throw missing; }, create: async (...args: any[]) => calls.push(['product', ...args]) },
    prices: { list: async () => ({ data: [] }), create: async (...args: any[]) => { calls.push(['price', ...args]); return { id: 'price_new' }; } },
  };
  assert.equal(await ensurePrice(stripe, 'essentials'), 'price_new');
  assert.equal(calls[1][1].unit_amount, 999); assert.equal(calls[1][1].recurring.interval, 'month');
  assert.ok(calls.every(call => call[2].idempotencyKey));
});
test('new customers are saved under the verified identity id', async () => {
  const { request, calls } = fixture({ storedCustomer: null });
  assert.equal((await request('checkout', { tier: 'plus', agreedToLegal: true })).status, 200);
  assert.equal(calls.find(([type]) => type === 'customer')[1].metadata.identity_user_id, user.id);
  assert.equal(calls.find(([type]) => type === 'checkout')[1].customer, 'cus_new');
});
test('hosted checkout enables local-currency Adaptive Pricing and automatic locale', async () => {
  const { request, calls } = fixture();
  await request('checkout', { tier: 'plus', agreedToLegal: true });
  const parameters = calls.find(([kind]) => kind === 'checkout')[1];
  assert.deepEqual(parameters.adaptive_pricing, { enabled: true });
  assert.equal(parameters.locale, 'auto');
});
test('Complete programs are denied to Plus and granted only to Complete', async () => {
  const plus = fixture({ subscription: validSubscription() });
  assert.equal((await plus.request('content?kind=programs')).status, 403);
  const complete = validSubscription(); complete.items.data[0].price.product = 'lifestylehub_coach_v1'; complete.items.data[0].price.unit_amount = 3499;
  const response = await fixture({ subscription: complete }).request('content?kind=programs');
  assert.equal(response.status, 200);
  const data=await response.json();assert.equal(data.programs.length,3);assert.ok(data.programs.every((program:any)=>program.weeks.length===4));
});
test('Classic Edition requires authentication and an active paid membership', async()=>{
  assert.equal((await fixture({user:null}).request('content?kind=classic-food')).status,401);
  assert.equal((await fixture().request('content?kind=classic-food')).status,403);
});
test('Essentials unlocks Classic food but cannot open Classic fashion or fitness', async()=>{
  const sub=validSubscription();sub.items.data[0].price.product='lifestylehub_essentials_v1';sub.items.data[0].price.unit_amount=999;
  const {request}=fixture({subscription:sub});
  const food=await request('content?kind=classic-food');assert.equal(food.status,200);assert.equal((await food.json()).recipes.length,15);
  assert.equal((await request('content?kind=classic-fashion')).status,403);
  assert.equal((await request('content?kind=classic-exercise')).status,403);
});
test('Plus unlocks all Classic editions and the expanded collections',async()=>{
  const {request}=fixture({subscription:validSubscription()});
  const food=await (await request('content?kind=classic-food')).json();
  assert.equal(food.issue.items.length,8);assert.equal(food.recipes.length,15);assert.equal(food.collections.length,5);
  const fashion=await (await request('content?kind=classic-fashion')).json();
  assert.equal(fashion.issue.items.length,8);assert.equal(fashion.palettes.length,8);assert.equal(fashion.looks.length,8);
  const fitness=await (await request('content?kind=classic-exercise')).json();
  assert.equal(fitness.issue.items.length,8);assert.equal(fitness.routines.length,10);
});
