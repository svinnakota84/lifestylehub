import type { SubscriptionState, PlanTier } from '../types';

async function api(path: string, body?: unknown) {
  const response = await fetch(`/api/${path}`, {
    method: body === undefined ? 'GET' : 'POST', credentials: 'same-origin',
    cache: 'no-store', headers: { 'Content-Type': 'application/json' },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Secure subscriptions are not connected yet. No payment has been taken.');
  }
  return response.json();
}

export async function getVerifiedSubscription(): Promise<SubscriptionState | null> {
  const data = await api('membership');
  // The backend must authenticate the customer and query Stripe, not trust this UI.
  return data.subscription?.isActive === true ? data.subscription : null;
}

export async function beginCheckout(input: {plan: PlanTier; name: string; email: string; termsAccepted: boolean}) {
  const data = await api('checkout', input);
  const url = new URL(data.url);
  if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com') {
    throw new Error('A valid Stripe checkout was not returned. No payment has been taken.');
  }
  window.location.assign(url.href);
}

export async function askCoach(question: string): Promise<string> {
  const data = await api('coach', {question});
  if (typeof data.answer !== 'string') throw new Error('The coach is unavailable. Please try later.');
  return data.answer;
}
