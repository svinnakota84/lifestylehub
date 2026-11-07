import Stripe from 'stripe';
import { getStore } from '@netlify/blobs';
import { getUser, refreshSession } from '@netlify/identity';
import { createApi, HttpError } from '../../server/api';

let stripe: Stripe | undefined;
export default async (request: Request) => {
  const origin = process.env.URL;
  if (!origin) return Response.json({ error: 'Hosting is not configured.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  return createApi({
    origin: new URL(origin).origin,
    getUser: async () => { await refreshSession(); return getUser(); },
    getStripe: () => {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key || !/^(sk|rk)_(live|test)_/.test(key)) throw new HttpError(503, 'Secure billing setup is not complete. Please try again later.');
      stripe ||= new Stripe(key, { maxNetworkRetries: 2, timeout: 10000 });
      return stripe;
    },
    getStore: () => getStore({ name: 'lifestylehub-billing', consistency: 'strong' }),
  })(request);
};
export const config = {
  path: '/api/*',
  rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ['ip', 'domain'], action: 'rate_limit' },
};
