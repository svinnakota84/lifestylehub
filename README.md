# Lifestyle Hub

The previous Lifestyle Hub appearance and features are restored. Only the payment flow and its required backend/build support are changed.

Node 24: `npm ci`, `npm test`, `npm run lint`, `npm run build`. GitHub Actions deploys the frontend to Pages. Netlify deployment support packages the same frontend with server-side payment handlers.

The existing plan dialog opens Stripe-hosted checkout only when the backend is configured. It never collects card details on this website or simulates a successful subscription. Membership requires a server-signed browser session, verified Stripe payment, signed webhook processing and an active paid subscription. Prices are validated server-side in USD. See [payment setup and verification](docs/PAYMENTS.md).

Live payments are disabled by default. Stripe Tax head-office settings, confirmed tax classification/registrations, real recurring prices, server secrets, webhook delivery and paid service fulfillment still need verification before enabling charges. No purchase or customer charge was made during this work.
