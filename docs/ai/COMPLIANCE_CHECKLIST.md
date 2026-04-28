# Compliance Checklist

## Purpose
Stores compliance-relevant controls, open questions, and decision dependencies.

## Last verified
2026-03-13

## Confidence
verified

## Evidence
- src/app/pages/impressum/impressum.component.ts
- src/app/pages/datenschutz/datenschutz.component.ts
- src/app/components/cookie-banner/cookie-banner.component.html
- src/app/services/cookie-consent.service.ts
- src/app/services/analytics.service.ts
- src/app/components/contact/contact.component.ts
- public/contact.php
- DEPLOYMENT.md

## Current controls
- [verified] The site exposes dedicated imprint and privacy-policy routes.
- [verified] A cookie banner asks users to accept analytics cookies or keep only necessary cookies.
- [verified] Google Analytics is not initialized until analytics consent is granted.
- [verified] Consent state is persisted locally in the browser.
- [verified] Users can now withdraw analytics consent and reopen cookie settings through footer actions.
- [verified] The contact form now submits to `public/contact.php` instead of simulating success.
- [verified] The cookie banner is now mounted globally, so the reopen flow is available on legal routes as well.
- [verified] The contact form now provides a point-of-collection privacy hint linking to the privacy page.
- [verified] The deployment documentation and legal pages attempt to cover imprint, privacy, analytics, and contact handling obligations.

## Open gaps
- [verified] The privacy page now reflects the PHP contact flow more accurately, but it still lacks evidence-backed disclosure for the current mail-processing chain, concrete host, retention details, and outbound email metadata.
- [verified] The concrete hosting provider is not identified in repository evidence, even though the privacy page references external hosting.
- [verified] If `contact.php` is deployed, the current origin check may reject legitimate same-origin requests in some host or proxy configurations.
- [verified] The repository still does not evidence how consent proof, mail retention, temp-file retention, or host-level logs are governed operationally.

## Decision dependencies
- [verified] Contact capture is real product functionality and now needs an implemented and documented delivery path.
- [verified] Analytics remains in scope in the current worktree, so withdrawal and proof-of-consent handling still need to be defined concretely.
- [inferred] A dedicated Compliance / Privacy review is warranted before shipping changes to contact processing or consent behavior.

## Open questions
- Which live hosting provider and mail-processing path must be named in the legal copy?
- Are contact submissions retained only in email inboxes, or also in logs/CRM systems outside this repository?
