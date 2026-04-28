# Baseline

## Purpose
Stores the current verified or inferred state of the Rabuks website as detected from repository evidence.

## Last verified
2026-03-13

## Confidence
verified

## Evidence
- package.json
- angular.json
- tsconfig.json
- README.md
- DEPLOYMENT.md
- src/index.html
- src/main.ts
- src/styles.css
- src/app/app.config.ts
- src/app/app.routes.ts
- src/app/pages/home/home.component.ts
- src/app/components/contact/contact.component.ts
- src/app/services/theme.service.ts
- src/app/services/cookie-consent.service.ts
- src/app/services/analytics.service.ts
- public/contact.php
- .github/workflows/orchestrator-contracts.yml
- .github/workflows/security-hygiene.yml

## Content
- [verified] Repository role: marketing website frontend for Rabuks, implemented as an Angular 21 standalone single-page application with lazy-loaded route components.
- [verified] Package manager and runtime signals: npm is the declared package manager (`npm@11.4.0`), Angular CLI/build tooling is present, and TypeScript strict mode is enabled.
- [verified] The repository pins Node 24 LTS through `package.json` engines plus both `.nvmrc` and `.node-version`.
- [verified] Styling stack: Tailwind CSS v4 is imported from `src/styles.css`; the site uses utility classes plus a small global theme token layer and custom animations.
- [verified] Route surface: the application exposes three browser routes, `/`, `/impressum`, and `/datenschutz`, plus a wildcard redirect back to `/`; the routes now also carry client-applied SEO metadata for title and description.
- [verified] UI composition: the home route composes header, hero, features, screenshot showcase, pricing, contact, and footer components; the cookie banner is now mounted globally in the root app shell so it can also appear on legal routes.
- [verified] Homepage product proof now includes a dedicated single-card screenshot showcase with first-party desktop and mobile screenshots, automatic and dot-based slider navigation between core scenes, equal-height mixed-format previews, and a click-to-open gallery across the full current screenshot set.
- [verified] Shared-shell accessibility has improved: the header now exposes mobile-menu state with ARIA attributes, moves focus correctly for keyboard users, and the cookie banner reclaims focus when reopened.
- [verified] State shape: local UI state is held in Angular signals for menu state, contact form state, cookie consent, and theme mode. There is no app-wide store.
- [verified] Third-party integration: Google Analytics 4 is injected at runtime only after consent is granted through `CookieConsentService`.
- [verified] Persistence boundary: browser persistence is limited to `localStorage` key `cookie-consent`; no client-side IndexedDB or server-side database usage is evidenced in the Angular app.
- [verified] Backend footprint in this repo: there is no TypeScript/Node backend. A standalone `public/contact.php` mail endpoint exists and is now called by the Angular contact form.
- [verified] Deployment signals: `public/.htaccess`, `robots.txt`, `sitemap.xml`, and `DEPLOYMENT.md` indicate static Apache-style hosting with PHP support now required for the shipped contact flow.
- [verified] Build hygiene baseline: production bundle budgets are configured in `angular.json`, but there is no repo-level frontend CI workflow that runs Angular build, test, accessibility, or performance checks.
- [verified] Test posture: the repo now contains frontend specs for the app shell, contact form, cookie-consent service, route SEO metadata, header focus behavior, and cookie-banner reopen focus behavior; no e2e test harness or CI enforcement is evidenced.
- [inferred] The current product is a public brochure/lead-generation site rather than the actual Rabuks application; page copy references future product capabilities, but the repository contains only marketing-site functionality.

## Open questions
- Whether `public/contact.php` is deployed in production with working PHP mail support and is the intended long-term submission backend.
- Which hosting provider serves the live site and legal pages; the privacy copy references external hosting, but the concrete host is not identified in repo evidence.
- Which production host and mail-delivery chain back the PHP contact endpoint in live deployment.
