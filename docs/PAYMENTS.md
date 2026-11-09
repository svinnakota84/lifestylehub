# Lifestyle Hub payment correction

The previous website interface and non-payment features have been restored from the version preceding the redesign. Changes are limited to checkout, payment verification, subscription management, backend payment handlers and the build support needed for them.

## Corrected behavior

- Existing plan buttons open the same checkout dialog with a fresh, blank name/email form. Card details are entered only on Stripe's hosted checkout page.
- Checkout is disabled when the secure backend is missing. A missing endpoint, a redirect parameter or browser storage never activates a membership.
- The server accepts only its configured Essentials ($9.99), Plus ($19.99) or Coach ($34.99) monthly USD Price ID. It verifies currency, amount, recurrence and active status against Stripe. Client-supplied amounts are ignored. Adaptive pricing is disabled so Checkout remains in USD; card issuers determine conversion and fees.
- A signed, HttpOnly, Secure, SameSite cookie binds the creating browser to its checkout session. This is browser-bound membership access, not a full cross-device sign-in system.
- Successful payment and webhook verification are required for access. The membership endpoint also retrieves current subscription and invoice status from Stripe. A new browser needs a separate verified recovery/login flow; entering an email address alone cannot unlock another customer's subscription.
- Verified subscribers can open Stripe's billing portal to manage payment details and cancellation. The portal needs to be configured in Stripe before use.

## Runtime

The Netlify function implementations are `checkout`, `membership`, `stripe-webhook`, `billing-portal` and `payment-status`. They use the Stripe SDK and a strongly consistent Netlify Blobs store. `netlify.toml` packages these with the site. GitHub Pages can publish the restored frontend, but it is static and cannot execute these functions. The payment frontend must be hosted with these handlers on the same origin, or have an equivalent trusted server-side reverse proxy.

Set the server-only settings in `.env.example`. Use a minimally scoped restricted Stripe key and protected hosting variables. Never put keys or webhook secrets into VITE variables, source code or chat. Keep `PAYMENTS_ENABLED=false` until the backend, real prices, tax setup, webhook delivery, customer portal and actual paid service fulfillment have been verified. The public frontend does not need a Stripe secret key or a locally installed Stripe application.

## Required webhook events

Configure the live endpoint `/api/stripe-webhook` for:

- `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`
- `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
- `invoice.paid`, `invoice.payment_failed`
- `charge.dispute.created`, `charge.refunded`, `radar.early_fraud_warning.created`

The endpoint verifies Stripe's signature against the raw request body. State writes are idempotent by Stripe event ID. Renewal failures and cancellations remove entitlement; refunds and risk notifications mark the affected subscription for review through Stripe's charge → payment → invoice → subscription graph. No refund, cancellation or charge is performed by these handlers themselves. An operator must investigate and resolve risk holds in the durable store. No local Customer PII copy is maintained.

## Tax status observed during implementation

The connected live Stripe account had no active recurring USD prices, active payment links or webhook endpoints. Stripe Tax status was `pending`, with `head_office` missing, and no tax registrations. The user confirmed that the business collects tax; this does not establish which jurisdictions or product tax classification apply. No tax address, jurisdiction, registration or tax code was guessed or changed. Threshold monitoring returned no locations and no computation timestamp; it provides no fresh obligation finding here.

The runtime requires active Stripe Tax settings and at least one active registration before creating checkout. The product's confirmed tax code and price tax behavior must be configured before launch. A qualified tax adviser should confirm the applicable classification and registrations. Actual catalog setup remains pending that information; no customer has been charged.

## Validation

`npm test`, `npm run lint`, `npm run build`, plus bundling the serverless functions. Tests use isolated test doubles and dummy credentials. They are not live card charges or proof that the live backend is deployed. Live checkout cannot be called complete until server credentials, prices, tax registration, signed webhook delivery and fulfillment are verified.
