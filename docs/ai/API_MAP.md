# API Map

## Purpose
Stores actual API surfaces, contracts, auth model, and versioning information.

## Last verified
2026-03-13

## Confidence
verified

## Evidence
- src/app/app.routes.ts
- src/app/components/contact/contact.component.ts
- src/app/services/cookie-consent.service.ts
- src/app/services/analytics.service.ts
- public/contact.php

## Content
### Browser route surface
- [verified] `GET /` renders the marketing landing page.
- [verified] `GET /impressum` renders the imprint/legal-notice page.
- [verified] `GET /datenschutz` renders the privacy-policy page.
- [verified] Unknown client routes redirect back to `/`.
- [verified] Each declared browser route now carries route data for title and description, which `SeoService` applies client-side to the document head together with a canonical URL and basic Open Graph/Twitter tags.
- [verified] The home route also renders first-party screenshot assets from `public/Screenshots` through the hero preview and screenshot-showcase section; no separate screenshot API exists.

### First-party HTTP endpoints
- [verified] `ContactComponent` performs a first-party `POST /contact.php` with `application/x-www-form-urlencoded` body containing `name`, `email`, `company`, optional `phone`, honeypot `website`, and `message`.
- [verified] `public/contact.php` supports JSON and form-encoded POST requests and returns JSON payloads with `success`, `message`, and optional `error`/`fields` keys.
- [verified] `public/contact.php` now enforces POST-only access, validates content type and required fields, applies a simple IP-based cooldown, and attempts same-origin checking from `Origin` against deduplicated host candidates derived from request host metadata.
- [verified] `public/contact.php` uses PHP `mail()` for delivery and adds sender IP address and timestamp to the outbound email body.
- [inferred] The current origin check is less brittle than before, but it still depends on deployment host/proxy metadata and should be validated in the real ingress setup.

### Third-party endpoints and scripts
- [verified] Google Analytics 4 is loaded from `https://www.googletagmanager.com/gtag/js?id=G-EMVJ6PZZBX` only after consent is granted.
- [verified] Analytics is configured with a default denied consent state before later `gtag('consent', 'update', ...)` calls.

### Auth, permissions, and versioning
- [verified] No authentication, authorization, session, or role model is evidenced in the frontend repository.
- [verified] No internal API versioning scheme is evidenced.
- [verified] `contact.php` is now an active unauthenticated internet-facing submission endpoint when deployed.

## Open questions
- Whether the current PHP mail-based endpoint remains the supported contract after deployment hardening and verification.
- Whether the endpoint should keep best-effort same-origin filtering only, or move to an explicit deployment-configured canonical origin model.
