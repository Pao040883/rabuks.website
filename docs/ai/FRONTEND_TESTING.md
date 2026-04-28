# Frontend Testing

## Purpose
Stores frontend testing strategy, coverage shape, and UI validation approach.

## Last verified
2026-03-13

## Confidence
verified

## Evidence
- package.json
- angular.json
- tsconfig.spec.json
- src/app/app.spec.ts
- src/app/app.html
- src/app/app.routes.ts
- src/app/app.routes.spec.ts
- src/app/pages/home/home.component.ts
- src/app/components/header/header.component.ts
- src/app/components/header/header.component.spec.ts
- src/app/components/pricing/pricing.component.ts
- src/app/components/contact/contact.component.ts
- src/app/components/cookie-banner/cookie-banner.component.spec.ts
- src/app/services/cookie-consent.service.ts
- src/app/services/analytics.service.ts
- src/app/services/seo.service.ts

## Current state
- [verified] Unit-test tooling is present through Angular's unit-test builder and Vitest globals in `tsconfig.spec.json`.
- [verified] The repo now contains specs for the app shell, contact component, cookie-consent service, route SEO metadata presence, header focus behavior, and cookie-banner reopen focus behavior.
- [verified] The repo also now contains focused screenshot-showcase coverage for gallery opening, Escape close with focus return, and cyclic next-navigation across all available screenshots.
- [verified] Screenshot-showcase tests now also cover opening the gallery from mobile preview cards and the combined desktop/mobile gallery asset set.
- [verified] Screenshot-showcase tests now also cover the single-card slider state transitions for the active preview scene.
- [verified] Screenshot-showcase tests now also cover auto-advance timing, wrap-around navigation in both directions, and safer gallery-open bounds handling.
- [verified] `src/app/app.spec.ts` was updated to match the current router-shell app structure.
- [verified] No Playwright, Cypress, or other browser-test harness is evidenced in the repository.
- [verified] No automated accessibility checks, responsive checks, or visual-regression tooling are evidenced.
- [verified] No active GitHub Actions workflow runs Angular build or frontend tests on pull requests.
- [verified] Local validation now includes a passing `npm run build` plus focused passing test runs for the contact component and cookie-consent service after dependency install.
- [verified] A later full frontend test run was reported as passing with 4 test files and 10 tests after the accessibility and SEO updates.
- [verified] A subsequent frontend test run was reported as passing with 6 test files and 13 tests after the screenshot and focus-management updates.
- [inferred] Full regression confidence is still incomplete because no browser-test harness or CI execution path is present, and the editor still reports stale spec diagnostics inconsistent with the CLI test results.

## Critical journeys that need coverage
- [verified] Initial route rendering for `/`, `/impressum`, and `/datenschutz`.
- [verified] Header and footer navigation, including route-to-section scroll behavior and mobile-menu keyboard/focus behavior.
- [verified] Theme toggle behavior and dark-mode class application.
- [verified] Cookie consent persistence, analytics enablement, and future withdrawal flow if analytics remains enabled.
- [verified] Pricing calculator logic and cheapest-plan highlighting.
- [verified] Contact form behavior, including structured backend error handling, privacy disclosure, and live-submit contract fields.
- [verified] Runtime SEO updates, including title, description, canonical URL, and route metadata application on navigation.
- [verified] Homepage screenshot rendering, lazy-loaded below-the-fold imagery, and future desktop/mobile asset switching once mobile screenshots exist.
- [verified] Screenshot gallery behavior, including modal opening, keyboard close, focus return, and previous/next navigation across all current assets.
- [verified] Desktop/mobile screenshot pairing in the showcase, including portrait mobile preview rendering and mobile-triggered gallery entry.
- [verified] Slider behavior for the single active showcase card, including previous/next cycling and direct scene selection.
- [verified] Automatic showcase progression and equal-height preview rendering for mixed landscape/portrait assets within the single-card layout.

## Recommended baseline
1. [verified] Replace the stale root spec with smoke coverage for router-shell rendering and home-route composition.
2. [verified] Add focused unit or integration tests for pricing calculation, cookie-consent persistence, and navigation/scroll orchestration.
3. [inferred] Add focused tests for `SeoService` side effects rather than only asserting route metadata presence.
4. [inferred] Add browser-level tests for homepage rendering, legal-page routing, screenshot visibility, mobile menu behavior, and consent UX.
5. [inferred] Add automated accessibility assertions for the main user journeys once a browser-test harness exists.
6. [inferred] Run Angular build and the selected frontend test suite in CI on pull requests.

## Open questions
- Whether the team wants pure Vitest-based component/integration testing first, or a simultaneous rollout of browser tests.
- Whether contact submission should be tested against `contact.php`, a different backend, or a mocked external provider.
- Whether the repo should include a PHP-capable local test path for end-to-end contact verification.
