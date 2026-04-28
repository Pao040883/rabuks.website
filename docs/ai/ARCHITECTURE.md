# Architecture

## Purpose
Stores the current system structure, boundaries, runtime shape, and key flows.

## Last verified
2026-03-13

## Confidence
verified

## Evidence
- src/main.ts
- src/app/app.ts
- src/app/app.html
- src/app/app.config.ts
- src/app/app.routes.ts
- src/app/app.routes.spec.ts
- src/app/pages/home/home.component.ts
- src/app/pages/impressum/impressum.component.ts
- src/app/pages/datenschutz/datenschutz.component.ts
- src/app/components/header/header.component.ts
- src/app/components/hero/hero.component.ts
- src/app/components/screenshot-showcase/screenshot-showcase.component.ts
- src/app/components/features/features.component.ts
- src/app/components/pricing/pricing.component.ts
- src/app/components/contact/contact.component.ts
- src/app/components/footer/footer.component.ts
- src/app/components/cookie-banner/cookie-banner.component.ts
- src/app/services/theme.service.ts
- src/app/services/cookie-consent.service.ts
- src/app/services/analytics.service.ts
- src/app/services/seo.service.ts
- src/index.html

## Content
### Runtime shape
- [verified] Application bootstrap uses `bootstrapApplication(App, appConfig)` with router providers and in-memory scrolling enabled.
- [verified] The root shell is intentionally thin and renders a router outlet plus the global cookie banner.
- [verified] All declared routes use `loadComponent`, so route-level code splitting exists for home and legal pages.
- [verified] The app is client-rendered only; no SSR, prerender, or hydration configuration is evidenced.
- [verified] Route-specific SEO metadata is applied client-side from router data through `SeoService`, which updates the document title, description, canonical link, and basic Open Graph/Twitter tags after bootstrap and navigation.

### Route and component boundaries
- [verified] `/` loads `HomeComponent`, which composes the landing-page sections from separate standalone components.
- [verified] `/impressum` and `/datenschutz` each render self-contained page components that wrap the shared header and footer.
- [verified] The header and footer both own cross-route section-navigation behavior, including route-to-home navigation followed by delayed DOM scrolling.
- [verified] The shared header now uses semantic interactive controls for navigation and exposes mobile-menu state with ARIA labels, `aria-expanded`, and `aria-controls`.
- [verified] The home page now includes a dedicated screenshot-showcase component between features and pricing as a single slider-driven card, while the hero remains text-first without embedded product imagery.
- [verified] The pricing component contains presentation plus pricing-calculator logic in one component.
- [verified] The contact component contains presentation, reactive-form validation, and root-relative POST submission to `contact.php` in one component.
- [verified] Cookie consent UI is isolated in `CookieBannerComponent`, while persistence, reopen/withdraw behavior, and analytics enablement live in `CookieConsentService`; the banner is mounted at app-shell level instead of only on the home page.

### State and data flow
- [verified] Theme state lives in `ThemeService` as a signal and is derived from system color-scheme preference. It is applied by toggling the `dark` class on `document.documentElement`.
- [verified] Cookie consent state lives in `CookieConsentService`, is restored from `localStorage`, and triggers analytics initialization when consent includes analytics.
- [verified] Cookie-banner visibility now also drives focus behavior in the banner component so reopened consent settings receive a usable keyboard entry point.
- [verified] Pricing calculator state is local to `PricingComponent`; it recalculates totals on slider changes and does not call a backend.
- [verified] Contact-form state is local to `ContactComponent`; submit behavior now uses a reactive form, `fetch('/contact.php')`, and success/error status signals.
- [verified] The contact form includes optional phone plus hidden honeypot fields, and it surfaces structured backend validation/rate-limit/mail-failure responses in German UI copy.
- [verified] Footer actions can reopen cookie settings and withdraw analytics consent through `CookieConsentService`.
- [verified] Screenshot content is currently static, first-party, and served from `public/Screenshots` plus `public/Mobile-Screenshots`; the showcase now presents one active product scene at a time with text, desktop preview, and height-led mobile preview side by side, auto-advances between scenes, and can open a gallery over all currently available screenshot assets.
- [inferred] The legal pages are now closer to the implemented contact flow and consent lifecycle, but deployment-specific provider and retention facts are still unresolved in repository evidence.

### Integration boundaries
- [verified] Google Analytics 4 is the only third-party runtime integration evidenced in Angular code.
- [verified] Analytics is injected dynamically by appending script tags to `document.head`; default analytics storage is denied until later consent update.
- [verified] `public/contact.php` is the only first-party server-side file in the repo. It accepts POST fields and forwards mail via PHP `mail()`.
- [verified] The Angular app invokes `contact.php`, so the effective frontend runtime now depends on a same-origin PHP-capable host for lead capture.

### Quality and maintainability notes
- [verified] Componentization is adequate for section-level decomposition, but interaction logic is duplicated across header, hero, pricing, and footer instead of being centralized in a navigation/scroll service.
- [verified] The obsolete external HTML legal-page templates were removed after the inline TypeScript templates became the sole active legal-page source.
- [verified] The codebase uses a mix of modern Angular control flow (`@if`, `@for`, `@switch`) and legacy structural directives (`*ngIf`).
- [verified] Cookie settings can now be reopened from footer actions on legal routes because the banner is mounted globally in the root app shell.
- [verified] Accessibility improved materially in the shared shell: the mobile menu now moves focus on open, supports Escape to close, and returns focus to its trigger; the cookie banner now focuses a primary action when reopened.
- [verified] SEO coverage improved for browser-executed navigations, but route-specific metadata is still not present in the initial HTML response for legal routes because the app remains SPA-only.
- [inferred] The architecture is still simple enough for low-cost cleanup, but deployment, compliance, and verification issues should be resolved before further feature expansion.

## Open questions
- Whether the site should remain pure static hosting plus optional PHP, or whether lead capture and consent management require a supported backend service.
- Whether the duplicated scroll/navigation logic should be normalized into a shared service before additional sections or pages are added.
