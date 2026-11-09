# Lifestyle Hub by Radiant Spark

Editorial food, movement and style website with a working recipe search, recipe dialogs and browser-local saved collection. Node 24: `npm ci`, `npm test`, `npm run lint`, `npm run build`.

The original uploaded Lifestyle ZIP was only an HTML shell. This source comes from the existing Lifestyle Hub GitHub repository, retaining its recipe collection while removing simulated payments, health profiles, legal immunity claims, fabricated trend rankings and obsolete compiled assets.

Saved recipe IDs stay in localStorage on this browser. No account, health data, progress tracker, personalized diet, AI coaching, daily WhatsApp delivery or cross-device sync is claimed. Images are illustrative recipe photography from the original source.

Subscription availability defaults to unavailable. `VITE_STRIPE_LINKS` may contain actual live Stripe Payment Links keyed by `essentials`, `plus`, `coach`; the actual service description, USD price, billing and cancellation terms must be reviewed on Stripe. A link does not activate a local member account. Authenticated membership and verified Stripe webhooks are required for paid fulfillment. Never add secret keys to VITE variables.

`VITE_CORPORATE_URL` links to the main site. The ten-agent owner workspace is there; `netlify/functions/agents.mjs` is also included in this project so a Netlify deployment may serve its backend. GitHub Pages is static and cannot execute it. See `docs/COMPOSIO-SETUP.md`. No server credentials or connected accounts were available for a live integration test.

The build publishes only `dist` and supplies a 404/SPA fallback. `public/CNAME` preserves the Lifestyle custom domain from the existing project. Domain settings and DNS are separate from this file. No new service was purchased.
