import type { SubscriptionState } from '../types';
export interface AccountUser { id: string; name: string; email: string }
export interface AccountState { user: AccountUser; subscription: SubscriptionState | null }
export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export async function api<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`/api/${path}`, {
    method: body === undefined ? 'GET' : 'POST', credentials: 'same-origin', cache: 'no-store',
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data: any;
  try { data = await response.json(); }
  catch { throw new ApiError(503, 'Account services are not available on this deployment. Please try again later.'); }
  if (!response.ok) throw new ApiError(response.status, data.error || 'Your request could not be completed.');
  return data;
}
export function getAccount() { return api<AccountState>('me'); }
export async function startCheckout(tier: string) {
  const { url } = await api<{ url: string }>('checkout', { tier, agreedToLegal: true });
  const target = new URL(url);
  if (target.protocol !== 'https:' || target.hostname !== 'checkout.stripe.com') throw new Error('Invalid checkout destination.');
  window.location.assign(url);
}
export async function openBillingPortal() {
  const { url } = await api<{ url: string }>('portal', {});
  const target = new URL(url);
  if (target.protocol !== 'https:' || target.hostname !== 'billing.stripe.com') throw new Error('Invalid billing destination.');
  window.location.assign(url);
}
