# Decisions

## Purpose
Stores accepted, proposed, superseded, or rejected decisions with consequences and evidence.

## Last verified
2026-03-13

## Confidence
verified

## Evidence
- package.json
- angular.json
- DEPLOYMENT.md
- src/app/app.routes.ts
- src/app/pages/home/home.component.ts
- src/app/pages/impressum/impressum.component.ts
- src/app/pages/datenschutz/datenschutz.component.ts
- src/app/services/theme.service.ts
- src/app/services/cookie-consent.service.ts
- src/app/services/analytics.service.ts
- public/contact.php

## Content
### Accepted

#### D-001: Use an Angular standalone SPA with route-level lazy loading
- Status: accepted
- Confidence: verified
- Decision: the site is implemented as a standalone Angular SPA using `loadComponent` routes instead of NgModules.
- Why: repository code shows a lightweight router shell and route-level code splitting for the small page set.
- Consequences: browser routing and static-host rewrites are required for deployment, and page-level behavior remains primarily client-side.

#### D-002: Keep theming client-side and system-preference driven
- Status: accepted
- Confidence: verified
- Decision: theme mode is derived from system preference and applied client-side by toggling the root `dark` class.
- Why: `ThemeService` reads `matchMedia('(prefers-color-scheme: dark)')` and does not persist a user override.
- Consequences: there is no remembered manual theme preference across sessions, and any manual toggle is session-scoped.

#### D-003: Gate Google Analytics behind explicit cookie consent
- Status: accepted
- Confidence: verified
- Decision: analytics is not initialized until consent includes analytics, and default analytics storage is denied before later update.
- Why: `CookieConsentService` calls `AnalyticsService.initializeAnalytics()` only on analytics consent.
- Consequences: consent handling is part of the critical user journey and must remain legally accurate and test-covered.

#### D-004: Target static hosting with Apache/PHP-capable delivery for contact capture
- Status: accepted
- Confidence: verified
- Decision: deployment artifacts assume a static frontend that can be served from Apache-style hosting, with PHP support required when the shipped contact flow is enabled.
- Why: the repo includes `.htaccess`, sitemap/robots assets, and a standalone PHP contact endpoint in `public/`.
- Consequences: if PHP mail execution is not actually deployed, the current shipped contact flow is non-operational and the frontend behavior is misleading.

### Accepted

#### D-005: The contact form must perform a real submission
- Status: accepted
- Confidence: verified
- Decision: the website contact form is a real lead-capture flow and must actually send user input instead of simulating success.
- Why: user clarification explicitly states that the contact form should really send.
- Consequences: Angular must call a supported backend endpoint, the submission path must be validated end to end, and legal/privacy copy must match the actual data flow.

#### D-006: Provide an in-product consent-withdrawal path
- Status: accepted
- Confidence: verified
- Decision: the product should offer a user-visible way to reopen and withdraw analytics consent after the initial choice.
- Why: user input requested this direction, legal copy already promises revocation, and the current worktree now implements a footer-driven withdrawal flow backed by a globally mounted cookie banner.
- Consequences: consent state handling, UI placement, accessibility, and privacy documentation must stay aligned, and shell-level behavior should remain tested across all routes.

#### D-007: Apply route-level SEO metadata from Angular router data in the SPA shell
- Status: accepted
- Confidence: verified
- Decision: the current site uses Angular route data plus a client-side `SeoService` to set title, description, canonical URL, and basic Open Graph/Twitter tags after app bootstrap and navigation.
- Why: repository code now carries per-route SEO data and initializes a dedicated SEO service from the root app shell.
- Consequences: browser-visible metadata improves for normal navigations, but the initial HTML for legal routes remains generic until a prerender or SSR decision is made.

#### D-008: Keep SEO delivery SPA-only for now
- Status: accepted
- Confidence: verified
- Decision: do not add SSR or prerender at this stage; the current Angular SPA metadata approach is explicitly accepted for the present site scope.
- Why: user direction states that the SPA solution is sufficient.
- Consequences: SEO work should focus on accurate runtime metadata, sitemap/robots hygiene, and share-preview assets rather than a rendering-mode change.

#### D-009: Standardize repository runtime on Node 24 LTS
- Status: accepted
- Confidence: verified
- Decision: the repository runtime baseline is Node 24 LTS.
- Why: the repo already pins Node 24 through `package.json` engines and both `.nvmrc` and `.node-version`, while local builds under Node 25 emitted non-LTS warnings.
- Consequences: local development and any future CI should use Node 24 to avoid avoidable version drift and Angular runtime warnings.

### Proposed

#### D-010: Establish a minimum frontend quality gate in CI
- Status: proposed
- Confidence: inferred
- Decision: add an active frontend workflow that runs Angular build plus the focused Vitest suite on pull requests, then expand to browser-based accessibility checks.
- Why: bundle budgets exist, but no current workflow enforces Angular build/test or frontend regressions.
- Consequences: adopting this decision will require choosing and maintaining an e2e/accessibility toolchain, most likely alongside the existing Vitest-based unit setup.

## Open questions
- Should the repo standardize on Playwright for browser tests and accessibility checks, or keep the decision open until implementation planning starts?
- Whether `public/contact.php` remains the supported submission endpoint after deployment verification, or whether a different delivery backend is needed.
