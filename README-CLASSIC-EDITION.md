# Classic Edition archive and expanded member library

## Preserved previous version

`archive/classic-lifestylehub-2026-11-07` points to commit
`37e3402bfe8ec4d64a12e23ef7897531b86433be`: the restored cream-and-gold
site before the global public redesign. It is an exact GitHub snapshot, not a
replacement for main and not a second production deployment.

Archive URL:
https://github.com/svinnakota84/lifestylehub/tree/archive/classic-lifestylehub-2026-11-07

The archive preserves the historical code, including its old demo membership
behaviour. The current main branch uses server-verified membership; archived demo
billing logic is not reused in the member application.

## Member experience

The public global homepage remains. Its member-collection preview now includes
Classic Edition. Authenticated paid members receive the earlier cream-and-gold
editorial layout, three section tabs, editorial cards, and a journal/tools switch.
The original `EditorialIssueView` component is reused with server-delivered data.

| Collection | Before | Now |
| --- | --- | --- |
| Recipes | 5 | 15 |
| Meal collections | No dedicated collection filter | 5 |
| Movement routines | 4 | 10 |
| Colour palettes | 4 | 8 |
| Curated outfit looks | No separate lookbook | 8 |
| Editorial entries per Classic section | 5 | 8 |

The five food collections are All recipes, Plant-forward, Weeknight quick,
Indian-inspired and Mediterranean-inspired. These are recipe preferences and
inspiration, not medical diets. New recipes contain ingredients and cooking steps;
nutrition figures are explicitly illustrative estimates. New movement options
include short walks, desk breaks, seated movement, indoor marching and mobility.
They use working interval timers and do not invent calorie-burn guarantees.

Additional style palettes are selectable, not just returned in a payload. The
lookbook can be filtered by Everyday, Work, Weekend and Evening. Each body-shape
collection also receives two additional outfit formulas.

## Access and release

Essentials includes all food recipes, collections, planner, grocery list and the
Classic food edition. Plus and Complete also include Classic fashion/fitness,
all workouts, lookbook and palettes. Complete retains the four-week programs and
CSV export. API checks enforce these distinctions on every content request.
The public preview includes only design/feature descriptions, not paid payloads.

The Netlify Identity/Stripe-secret activation requirement remains unchanged.
GitHub Pages can display the public site and previews but cannot serve paid APIs.
No payment is simulated and no paid access is granted while those services are
unavailable.

General content references:
- https://www.cdc.gov/physical-activity/features/getting-more-active-minutes.html
- https://www.cdc.gov/healthy-weight-growth/physical-activity/getting-started.html
- https://www.myplate.gov/sites/default/files/2024-06/TipSheet-24-Meal-Planning.pdf

Verification includes API tier tests, recipe/collection reference checks, unique
content IDs, valid colour swatches, timer-duration checks, typecheck, production
build, and a check that protected content is absent from the public JS bundle.
