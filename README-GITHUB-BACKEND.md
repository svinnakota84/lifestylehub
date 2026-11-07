# Production accounts and subscriptions with GitHub Pages

The old audit refers to commit `0f9fc27`. Current main no longer grants a default
Plus membership, reads local subscription JSON as authorization, collects raw card
fields, or simulates payment success. Protected collections require an authenticated
server response and live Stripe membership verification.

## Architecture

GitHub Pages continues to host the public React app. Supabase Auth provides accounts
and JWT/refresh-token lifecycle; a Supabase Edge Function runs the existing Stripe
and content authorization API; PostgreSQL stores the private verified-user-to-Stripe
Customer mapping. Netlify is optional and is not required for this architecture.

The public `runtime-config.json` selects the provider and endpoint. It contains only
the Supabase project URL and publishable key, which are intended for browser use.
Neither Stripe secrets nor Supabase service-role keys belong in that file or Git.
An unconfigured provider keeps checkout unavailable rather than pretending to work.

## Authentication

- Supabase Auth manages signup, password verification, confirmation/recovery emails,
  sessions, token expiry, automatic refresh, logout and PKCE redirect handling.
- Passwords are sent to the Auth provider, not saved by the application. The browser
  SDK manages session credentials in its normal session storage. These are bearer
  credentials, not locally editable paid-access flags.
- Browser API calls use the user's access JWT in Authorization and the public project
  key in `apikey`. Tokens are sent only to the configured same-origin Supabase API.
- Every private Edge Function request calls authoritative `auth.getUser(jwt)` and
  requires a confirmed email. It does not authorize requests from browser metadata,
  decoded JWT payloads, submitted customer IDs or an `isActive` flag.
- Email/password is the implemented sign-in method. The SDK supports redirect handling;
  adding an external OAuth provider requires that provider's configuration first.

## Payment and access

Hosted Stripe Checkout collects card information. Server-only prices/customer IDs,
checkout ownership checks and live paid-invoice/subscription checks remain in place.
The USD price is charged at checkout and on renewals; Adaptive Pricing is disabled.
The card issuer handles any conversion from USD to the customer's card currency.
The connected payout bank account does not replace the API integration credential.

The server uses `membership_customers` for billing linkage only, never as a cached
entitlement flag. Row Level Security and grants deny browser access. A service-only
PostgreSQL function provides an atomic per-user request limit. Exact-origin CORS,
POST Origin checks and no-store responses protect the external API.

No webhook-fed entitlement cache is used: every protected request checks Stripe live.
Cancellation, nonpayment and expired billing periods therefore fail closed. Existing
content tier tests remain applicable to both server adapters.

## Prepared deployment assets

- `supabase/migrations/202611070001_membership.sql`: private tables, RLS/grants and rate limit.
- `server/supabase-handler.ts`: verified identity, CORS and database adapter.
- `server/supabase-entry.ts`: Deno runtime and server-only environment settings.
- `npm run build:supabase`: produces the self-contained Edge Function including private content.
- `supabase/config.toml`: the public config/OPTIONS endpoints bypass the legacy JWT gateway;
  the handler itself performs authoritative Auth verification for every private route.
- `services/identity.ts`: Auth provider adapter, signup/login/recovery and session lifecycle.
- `services/stripeService.ts`: supports the external authenticated API from GitHub Pages.

## Connection required before activation

Supabase installation/connection has been confirmed. However, its project/database
management tools were not exposed in the active session, so no project, database,
Auth configuration or Edge Function has yet been provisioned. This is a tool-access
blocker, not a request to reconnect the account. The code and deployment assets are
prepared; project provisioning and secure Stripe-secret configuration remain pending.

After connection, select the project, apply the migration, enable email confirmation
with autoconfirm disabled, allow the website's confirmation/recovery redirect URL,
and deploy the generated membership function. Set `APP_ORIGIN` to the exact website
origin and securely configure the Radiant Spark LLC `STRIPE_SECRET_KEY` in the function
secrets. Supabase's own URL/service-role environment values stay server-side.

Finally update only the public runtime configuration with the actual project URL,
publishable key and `/functions/v1/membership` endpoint. Validate real confirmation,
recovery, refresh/logout, a test-mode checkout, cancellation and denied access before
claiming production activation. No real card charges are made by the automated tests.
