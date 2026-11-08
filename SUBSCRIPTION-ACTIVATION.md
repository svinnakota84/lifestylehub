# Subscription activation status

The public site is served by GitHub Pages, which cannot execute payment webhooks, authentication or private AI services. The former Sarah Jenkins profile and simulated checkout were removed. No frontend local-storage record is accepted as proof of payment. No card fields are collected by this site.

The authenticated Stripe connection for Radiant Spark LLC returned zero active USD recurring prices on 2026-11-08. Only a live account was exposed; sandbox card tests have not been performed. Account charges_enabled/payouts_enabled could not be retrieved with the exposed account operations. An account connection is not evidence of gateway activation.

## Required private backend before taking subscriptions

Use a server-capable deployment under the same origin (or a securely configured authenticated API), durable customer accounts and server secrets. Do not put Stripe secret keys or AI credentials in VITE variables, browser storage, GitHub source or generated bundles.

Frontend contracts (currently unavailable and fail closed):
- POST /api/checkout: authenticated customer, allowlisted plan ID; validate consent server-side, choose authoritative monthly USD Stripe price, disable adaptive_pricing, use hosted Checkout subscription mode and flexible billing. Reject an already active subscription and make retries idempotent. Return {url} on checkout.stripe.com. Bind Stripe customer to authenticated user; do not trust a submitted customer ID, price or tier.
- GET /api/membership: authenticate user, query authoritative subscription/payment state and return {subscription} or {subscription:null}; no-store. Never grant access from return URLs or browser data.
- POST /api/coach: recheck authenticated paid access server-side for every request, enforce quotas and rate limits, use server-side AI credentials; disclose AI processing before sharing user information. Do not diagnose, prescribe, provide clinical diets or claim a human clinician. Route medical, pregnancy, child and eating-disorder requests to qualified care. Keep sensitive prompts out of logs.
- POST /api/portal: bind to signed-in customer's Stripe ID and create a Customer Portal session for cancellation, billing details and payment-method updates.

Verify signed webhooks with raw request bodies and timestamp tolerance; deduplicate durable events and handle retries/out-of-order events by retrieving current Stripe state. Handle checkout.session.completed/async_payment_succeeded gated by payment_status, customer.subscription.*, invoice.paid/payment_failed, charge.dispute.created, charge.refunded and radar.early_fraud_warning.created. Revoke or review entitlement consistently. Server-gate premium content itself; hiding a React panel is not a paywall.

Activate only after sandbox end-to-end tests covering new signup, successful/declined/3DS cards, cancel checkout, forged browser membership, duplicate submission, renewals, cancellation, failed invoice, duplicate/out-of-order webhooks, risk events, account isolation and unauthorized coach calls. Never enter test card numbers in a live checkout.

USD card charges can be converted by the card issuer into the cardholder's account currency. Issuer fees, acceptance and exchange rates vary. USD presentment is distinct from settlement/payout currency. Tax registrations and Stripe Tax configuration require verification before automatic tax collection.

The daily edit rotates automatically each UTC day through existing library items. It is not a live news ingestion service. Coach, customer accounts and payment activation remain blocked on private backend hosting, credentials and sandbox access.
