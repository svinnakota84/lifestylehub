# Global LifestyleHub experience

The custom domain now builds the canonical React/Vite source, rather than copying
outdated compiled bundles from the repository root. Both GitHub Pages and Netlify
can build the same source, so the interface no longer depends on which historical
export a host happened to publish. GitHub Actions installs the lockfile, tests,
typechecks, builds and verifies all homepage assets before publishing `dist`.

## Customer experience

- Editorial cream, olive and terracotta design; responsive layouts, large local
  photographic assets, scrolling highlights and reduced-motion support.
- Free: three complete journal stories, a simple bowl recipe and a working
  five-minute movement timer. No account or payment required.
- Essentials ($9.99 USD/month): full recipe collection, cooking steps/timers,
  seven-day meal planner and automatically generated grocery list.
- Plus ($19.99 USD/month): Essentials plus workouts, interval timers,
  silhouette/colour studio and a browser-session activity log.
- Complete ($34.99 USD/month, internal tier `coach`): Plus plus three original
  self-guided four-week programs, weekly checklists and CSV meal-plan export.
  This is explicitly digital/self-guided, not human nutritionist access.
- Paid content is requested from authenticated server APIs; public previews show
  descriptions rather than protected payloads. Existing Stripe ownership,
  confirmed-identity and paid-invoice checks remain enforced.

## Currency and location

The display currency starts from browser locale. On a configured Netlify runtime,
`/api/config` can also suggest the currency using the request's country metadata.
A manual currency override is saved on the device. No browser geolocation
permission or third-party IP-location service is needed.

The currency selector uses locale-formatted amounts and a daily USD exchange-rate
snapshot from the public fawazahmed0/exchange-api dataset. Two independent CDN
endpoints are tried with timeouts. Missing or stale rates fall back to explicit
USD base prices; no made-up conversions are used. All non-USD equivalents are
marked approximate and display the rate date. They are not guaranteed Stripe
quotes, and can differ from Checkout because of provider rates, fees and taxes.

Hosted Checkout now explicitly disables Adaptive Pricing to honour the requested
USD-only billing policy. Local currency amounts on the website are estimates for
reference. The customer's bank/card issuer handles any card-currency conversion
and fees. Stripe confirms the USD charge before payment.

## Hosting activation

GitHub Pages serves the public experience and currency estimates. It cannot execute
Identity, billing or member-content APIs. The interface probes `/api/config`; it
never simulates a successful subscription. Until Netlify Identity and the merchant's
server-only Stripe secret are configured, paid buttons explain that checkout is
unavailable and do not collect cards or take payments. Free content remains usable.

The initial `lifestylehub.netlify.app` site is a separate existing deployment.
Updating its hosting configuration requires access to that Netlify account. The
current GitHub and Stripe connections do not supply Netlify administration or
runtime secret provisioning. See README-AUTH-AND-BILLING.md for activation details.
