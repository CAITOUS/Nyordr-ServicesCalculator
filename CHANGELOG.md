# Changelog

## 1.2.0 — 2026-11-05

Feedback button.

- **Feedback** button in the header, next to the light/dark toggle. It opens a short form (in a new tab) for bugs, questions and ideas about this app

## 1.1.0 — 2026-11-04

Nordic theme, light and dark modes, accessibility.

- New look shared across the CAITO tool suite: an airy Nordic palette with its own accent and icon (also the browser tab icon)
- **Light / dark toggle** in the header. It follows your device until you choose, then remembers your choice across all the tools
- Inter font (SIL Open Font License) is now built into the file, so the app makes no font requests and looks the same everywhere
- Accessibility: every control has a label, all text meets WCAG AA contrast in both modes, and keyboard focus is clearly visible
- Chart series and highlights now use the shared palette.

## 1.0.0 — 2026-11-03

First public release.

- Contract term in monthly, quarterly or annual intervals, with one-time onboarding and per-interval other costs
- Base rate, rate per endpoint, EP growth (% or fixed), and a discount on recurring charges
- Committed-EP billing with periodic true-ups (premium, admin fee, commitment reset, optional true-down), or billing on actual EPs
- Price ramps as fixed $ steps (monthly or annual price) or % steps (base, base + EP, or all recurring; compounding or simple), prorated mid-interval
- Helpdesk services: remote and onsite hours and rates per month or year, visits with trip fees, hours growth, per-interval overrides
- Inflation on its own schedule (every n months from a chosen month), never triggered by ramp steps, applied to the prior period total (default), the starting price only, or the current total
- Inflation shown as its own charge; every other category at starting prices
- Manual entry, table overrides, and CSV / Excel upload of Schedule and Settings tables
- Executive PDF: summary figures, executive summary, cost-by-year chart, annual breakdown, assumptions, optional full schedule
- CSV export of the interval schedule
- Fully self-contained: all libraries embedded, works offline, no external requests
- Clear split between labeled sample data and a client contract
- Light and dark themes (follows the system setting)
- Version check against a public `nyordr.json`, with repository-move support
- Footer with authorship, LinkedIn and Portfolio Toolbox links
