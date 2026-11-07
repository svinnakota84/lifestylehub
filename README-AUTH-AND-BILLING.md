# Verified accounts and billing

## Release status

The custom domain `lifestyle.radiantsparkllc.com` currently runs on GitHub Pages.
The main branch's public Pages workflow builds and publishes the global public experience.
GitHub Pages cannot execute the account/payment API implemented in this change.
The secure membership APIs must be deployed to the connected Netlify project,
with its Identity service and server secret configured, before switching the public domain.
The public UI detects unavailable server services and keeps paid checkout disabled.

## Runtime setup

The Netlify account and its runtime secret configuration are not accessible through
the current GitHub/Stripe connections. A Stripe connection in ChatGPT does not give
the deployed website an API credential. Never put a Stripe secret in chat, source,
a VITE_ variable, the browser, or localStorage.

Once hosting access is available, configure the Netlify project to build this branch
with `npm ci` / `npm run build`, publish `dist`, and deploy `netlify/functions` as
declared in `netlify.toml`. Enable Netlify Identity with open registration and email
confirmation, keep its confirmation/recovery email delivery enabled, and set the
server-only `STRIPE_SECRET_KEY` for the Radiant Spark LLC account. Netlify provides
`URL`, Identity runtime context, and site-wide Blobs authentication automatically.
Validate on its Netlify URL before moving the custom domain from GitHub Pages.

No manual product or price creation is required. The server provisions stable,
idempotent LifestyleHub products and monthly USD prices on first checkout:
Essentials $9.99, Plus $19.99, Complete $34.99. Existing catalog entries are checked
against these amounts. A dedicated customer portal configuration is created when
needed, including cancellation at period end, payment method changes and invoices.
Existing merchant portal defaults are not modified.

## Authentication and authorization

- `@netlify/identity` handles signup, confirmed-email login, password recovery,
  invitation acceptance, logout and session refresh. Credentials are submitted to
  Identity; application code does not store passwords or implement password hashing.
- The Identity SDK manages its own cookies/session storage. The server uses
  `refreshSession()` and `getUser()`; it does not trust submitted email, user IDs,
  roles, customer IDs, or locally stored membership flags.
- The API requires a confirmed user. A strongly consistent, private Netlify Blobs
  store maps the verified user ID to a Stripe Customer. This is billing linkage,
  never a client-owned entitlement record.
- Checkout is hosted by Stripe. There are no card/CVC inputs or merchant-key inputs
  in the app. Prices, customer association, consent timestamps and redirect URLs
  are controlled server-side.
- A checkout return alone never grants access. Its customer and client reference
  must match the authenticated account, payment must be paid, and a live subscription
  check must succeed. Pending/unpaid checkouts remain locked.
- Every account/content request checks Stripe live. Only active, unexpired,
  correctly priced LifestyleHub subscriptions with a paid latest invoice qualify.
  This intentionally uses on-demand verification instead of a webhook-fed cache:
  cancellation/failed renewals cannot leave stale database entitlements behind.
- Recipe payloads require a paid plan. Workout and styling payloads require Plus
  or Complete. These payloads are not bundled into the frontend. Editorial pages are
  public. The source repository itself remains public as before.
- Private API responses use `Cache-Control: private, no-store`. PWA navigation
  fallback excludes API/Identity paths; private JSON is not cached for offline use.
- POST endpoints validate Origin and JSON content type, reject oversized bodies,
  and are subject to Netlify rate limiting. Stripe errors/secrets are not returned
  to clients. Unknown routes and unsupported methods fail explicitly.
- The UI refreshes entitlement state on focus and once per minute; failure clears
  paid access. Logout clears displayed user/member content. Legacy demo records
  are discarded. Progress storage is scoped by authenticated user ID on the device;
  cross-device health-data synchronization is outside this change.

## API

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/me` | GET | Current verified account and live membership |
| `/api/checkout` | POST | Create/reuse hosted subscription Checkout |
| `/api/checkout-status` | POST | Verify the returning account's Checkout Session |
| `/api/portal` | POST | Open customer-scoped billing management |
| `/api/content?kind=recipes` | GET | Paid recipe data |
| `/api/content?kind=workouts` | GET | Plus/Complete workout data |
| `/api/content?kind=styling` | GET | Plus/Complete styling data |

## Validation

`npm test` runs security/flow tests using an injected Identity/Stripe/store fixture;
`npm run typecheck` checks canonical source directories, excluding stale duplicate
exports; `npm run build` creates the deployable frontend. These checks do not make
real customer charges and do not substitute for a configured-host integration test.
Before release, verify confirmation/recovery emails, login/logout, a test checkout,
return ownership, billing portal cancellation, failed renewal and denied content
without a subscription. A live-mode account connection alone is not evidence that
these hosted-runtime tests passed.
