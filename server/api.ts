import Stripe from 'stripe';
import { getStore } from '@netlify/blobs';
import type { User } from '@netlify/identity';
import { MEMBER_RECIPES, MEMBER_ROUTINES, MEMBER_PALETTES, MEMBER_STYLING, MEAL_COLLECTIONS, OUTFIT_LOOKS, CLASSIC_ISSUES } from '../data/memberExpansion';
import { MEMBER_PROGRAMS } from '../data/memberGuides';
import type { SubscriptionState } from '../types';

// Amounts and product identities are controlled exclusively by the server.
export const PLANS = {
  essentials: { name: 'Essentials', amount: 999 },
  plus: { name: 'Plus', amount: 1999 },
  coach: { name: 'Complete', amount: 3499 },
} as const;
type Tier = keyof typeof PLANS;
const productId = (tier: Tier) => `lifestylehub_${tier}_v1`;
const lookupKey = (tier: Tier) => `lifestylehub_${tier}_monthly_usd_v1`;
export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
type Store = ReturnType<typeof getStore>;
export interface ApiDependencies {
  getUser: () => Promise<User | null>;
  getStripe: () => Stripe;
  getStore: () => Pick<Store, 'get' | 'setJSON'>;
  origin: string;
}
const json = (body: unknown, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie', 'X-Content-Type-Options': 'nosniff' },
});
function requireTier(value: unknown): Tier {
  if (typeof value !== 'string' || !Object.hasOwn(PLANS, value)) throw new HttpError(400, 'Choose a valid membership plan.');
  return value as Tier;
}
function isMissingResource(error: unknown): boolean {
  return error instanceof Error && 'code' in error && error.code === 'resource_missing';
}
export async function ensurePrice(stripe: Stripe, tier: Tier): Promise<string> {
  const plan = PLANS[tier];
  const prices = await stripe.prices.list({ active: true, lookup_keys: [lookupKey(tier)], limit: 1 });
  if (prices.data[0]) {
    const price = prices.data[0];
    if (price.unit_amount !== plan.amount || price.currency !== 'usd' || price.recurring?.interval !== 'month' || price.recurring.interval_count !== 1 || price.product !== productId(tier)) {
      throw new HttpError(503, 'The billing catalog needs attention. Please contact support.');
    }
    return price.id;
  }
  try { await stripe.products.retrieve(productId(tier)); }
  catch (error) {
    if (!isMissingResource(error)) throw error;
    await stripe.products.create({ id: productId(tier), name: `LifestyleHub ${plan.name}`, metadata: { app: 'lifestylehub', tier } }, { idempotencyKey: `lh-product-${tier}-v1` });
  }
  const price = await stripe.prices.create({ product: productId(tier), unit_amount: plan.amount, currency: 'usd', recurring: { interval: 'month' }, lookup_key: lookupKey(tier) }, { idempotencyKey: `lh-price-${tier}-v1` });
  return price.id;
}

export function createApi(deps: ApiDependencies) {
  async function customerFor(user: User, create = false): Promise<string | null> {
    const store = deps.getStore();
    const key = `customers/${user.id}`;
    const saved = await store.get(key, { type: 'json' }) as { id: string } | null;
    if (saved) return saved.id;
    if (!create) return null;
    const customer = await deps.getStripe().customers.create({ email: user.email, name: user.name, metadata: { app: 'lifestylehub', identity_user_id: user.id } }, { idempotencyKey: `lh-customer-${user.id}` });
    const result = await store.setJSON(key, { id: customer.id }, { onlyIfNew: true });
    if (result.modified) return customer.id;
    const winner = await store.get(key, { type: 'json' }) as { id: string } | null;
    if (!winner) throw new HttpError(503, 'Your billing account could not be saved. Please try again.');
    return winner.id;
  }
  async function membership(user: User, customer: string | null): Promise<SubscriptionState | null> {
    if (!customer) return null;
    // Live Stripe reads avoid stale webhook ordering and revoke access on failed renewals/cancellation.
    const subscriptions = await deps.getStripe().subscriptions.list({ customer, status: 'all', limit: 100, expand: ['data.latest_invoice'] });
    for (const sub of subscriptions.data) {
      if (sub.status !== 'active' || sub.metadata.identity_user_id !== user.id || sub.metadata.app !== 'lifestylehub') continue;
      const item = sub.items.data[0];
      const tier = Object.keys(PLANS).find(t => item?.price.product === productId(t as Tier)) as Tier | undefined;
      const invoice = sub.latest_invoice;
      if (!tier || sub.items.data.length !== 1 || item.quantity !== 1 || item.price.unit_amount !== PLANS[tier].amount || item.price.currency !== 'usd' || item.price.recurring?.interval !== 'month' || item.price.recurring.interval_count !== 1 || item.current_period_end * 1000 <= Date.now() || typeof invoice !== 'object' || !invoice || invoice.status !== 'paid') continue;
      return { isActive: true, tier, subscribedAt: new Date(sub.created * 1000).toISOString(), customerName: user.name || '', customerEmail: user.email || '', paymentMethod: 'Managed securely by Stripe', invoiceId: invoice.number || invoice.id, autoRenew: !sub.cancel_at_period_end, currentPeriodEnd: new Date(item.current_period_end * 1000).toISOString() };
    }
    return null;
  }
  return async (request: Request): Promise<Response> => {
    try {
      const path = new URL(request.url).pathname.replace(/^\/(?:api|\.netlify\/functions\/api)\/?/, '');
      const routes: Record<string, string> = { me: 'GET', checkout: 'POST', portal: 'POST', 'checkout-status': 'POST', content: 'GET' };
      if (!routes[path]) throw new HttpError(404, 'API endpoint not found.');
      if (request.method !== routes[path]) return new Response(null, { status: 405, headers: { Allow: routes[path], 'Cache-Control': 'no-store' } });
      if (request.method === 'POST') {
        if (request.headers.get('origin') !== deps.origin) throw new HttpError(403, 'Please submit this request from LifestyleHub.');
        if (!request.headers.get('content-type')?.startsWith('application/json')) throw new HttpError(415, 'Expected JSON.');
        if (Number(request.headers.get('content-length') || 0) > 8192) throw new HttpError(413, 'Request too large.');
      }
      const user = await deps.getUser();
      if (!user?.id || !user.email || !user.confirmedAt) throw new HttpError(401, 'Sign in with a confirmed email address to continue.');
      const stripe = deps.getStripe();
      const customer = await customerFor(user);
      const sub = await membership(user, customer);
      if (path === 'me') return json({ user: { id: user.id, name: user.name || '', email: user.email }, subscription: sub });
      if (path === 'content') {
        if (!sub) throw new HttpError(403, 'An active paid membership is required.');
        const kind = new URL(request.url).searchParams.get('kind');
        if (kind === 'recipes') return json({ recipes: MEMBER_RECIPES, collections: MEAL_COLLECTIONS });
        if (kind === 'classic-food') return json({ issue: CLASSIC_ISSUES.food, recipes: MEMBER_RECIPES, collections: MEAL_COLLECTIONS });
        if (!['plus', 'coach'].includes(sub.tier)) throw new HttpError(403, 'This feature requires Plus or Complete membership.');
        if (kind === 'workouts') return json({ routines: MEMBER_ROUTINES });
        if (kind === 'classic-exercise') return json({ issue: CLASSIC_ISSUES.exercise, routines: MEMBER_ROUTINES });
        if (kind === 'styling') return json({ styling: MEMBER_STYLING, palettes: MEMBER_PALETTES, looks: OUTFIT_LOOKS });
        if (kind === 'classic-fashion') return json({ issue: CLASSIC_ISSUES.fashion, styling: MEMBER_STYLING, palettes: MEMBER_PALETTES, looks: OUTFIT_LOOKS });
        if (kind === 'programs') {
          if (sub.tier !== 'coach') throw new HttpError(403, 'Four-week programs require Complete membership.');
          return json({ programs: MEMBER_PROGRAMS });
        }
        throw new HttpError(400, 'Unknown member feature.');
      }
      if (path === 'portal') {
        if (!customer) throw new HttpError(409, 'You do not have a billing account yet.');
        // Reuse a dedicated configuration; never alter the merchant's default portal.
        const configs = await stripe.billingPortal.configurations.list({ active: true, limit: 100 });
        let config = configs.data.find(c => c.metadata?.app === 'lifestylehub');
        if (!config) config = await stripe.billingPortal.configurations.create({ business_profile: { headline: 'Manage your LifestyleHub membership' }, features: { customer_update: { enabled: true, allowed_updates: ['name', 'address'] }, invoice_history: { enabled: true }, payment_method_update: { enabled: true }, subscription_cancel: { enabled: true, mode: 'at_period_end' } }, metadata: { app: 'lifestylehub' } }, { idempotencyKey: 'lh-portal-v1' });
        const portal = await stripe.billingPortal.sessions.create({ customer, configuration: config.id, return_url: `${deps.origin}/?billing=returned` });
        return json({ url: portal.url });
      }
      let body: Record<string, unknown>;
      try {
        const raw = await request.text();
        if (raw.length > 8192) throw new HttpError(413, 'Request too large.');
        body = JSON.parse(raw);
        if (!body || Array.isArray(body) || typeof body !== 'object') throw new Error();
      } catch (error) { if (error instanceof HttpError) throw error; throw new HttpError(400, 'Invalid request.'); }
      if (path === 'checkout-status') {
        if (typeof body.sessionId !== 'string' || !/^cs_(test_|live_)?[a-zA-Z0-9]+$/.test(body.sessionId)) throw new HttpError(400, 'Invalid checkout session.');
        const session = await stripe.checkout.sessions.retrieve(body.sessionId);
        if (!customer || session.customer !== customer || session.client_reference_id !== user.id || session.mode !== 'subscription') throw new HttpError(403, 'This checkout belongs to a different account.');
        if (session.status !== 'complete' || session.payment_status !== 'paid' || !sub) return json({ pending: true, subscription: null }, 202);
        return json({ subscription: sub });
      }
      const tier = requireTier(body.tier);
      if (sub) throw new HttpError(409, 'You already have a membership. Manage your existing subscription before starting another.');
      if (body.agreedToLegal !== true) throw new HttpError(400, 'Please accept the terms before checkout.');
      const billingCustomer = customer || await customerFor(user, true);
      // Reuse an open session to prevent double submissions and multiple in-flight subscriptions.
      const open = await stripe.checkout.sessions.list({ customer: billingCustomer!, status: 'open', limit: 100 });
      for (const previous of open.data) {
        if (previous.client_reference_id !== user.id) continue;
        if (previous.metadata?.tier === tier && previous.url) return json({ url: previous.url });
        await stripe.checkout.sessions.expire(previous.id);
      }
      const price = await ensurePrice(stripe, tier);
      const consentAt = new Date().toISOString();
      const session = await stripe.checkout.sessions.create({ mode: 'subscription', adaptive_pricing: { enabled: true }, locale: 'auto', customer: billingCustomer!, client_reference_id: user.id, line_items: [{ price, quantity: 1 }], subscription_data: { billing_mode: { type: 'flexible' }, metadata: { app: 'lifestylehub', identity_user_id: user.id } }, metadata: { app: 'lifestylehub', tier, identity_user_id: user.id, terms_version: '2026-11-07', terms_accepted_at: consentAt }, success_url: `${deps.origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${deps.origin}/?checkout=canceled` });
      if (!session.url) throw new HttpError(503, 'Checkout is temporarily unavailable.');
      return json({ url: session.url });
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      // No credentials, raw SDK errors, or customer/payment details in client responses or logs.
      console.error('Membership request failed', { type: error instanceof Error ? error.name : 'UnknownError' });
      return json({ error: 'Account or billing services are unavailable. Please try again shortly.' }, 503);
    }
  };
}
