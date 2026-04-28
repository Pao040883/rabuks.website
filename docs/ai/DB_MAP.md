# DB Map

## Purpose
Stores actual data stores, core entities, relations, and migration-sensitive areas.

## Last verified
2026-03-13

## Confidence
verified

## Evidence
- src/app/services/cookie-consent.service.ts
- src/app/services/theme.service.ts
- src/app/components/pricing/pricing.component.ts
- src/app/components/contact/contact.component.ts
- public/contact.php

## Content
- [verified] No application database, ORM, schema files, or migrations are present in this repository.
- [verified] Persistent client-side state is limited to browser `localStorage` key `cookie-consent` with shape `{ necessary: boolean, analytics: boolean, timestamp: number }`.
- [verified] Theme preference is not persisted; it is recalculated from system preference on each load.
- [verified] Pricing and contact-form data are held in component-local signals or properties and are reset in memory.
- [verified] `public/contact.php` sends email via PHP `mail()` and does not persist submissions to a database.
- [verified] `public/contact.php` writes an IP-derived cooldown marker to the server temp directory for rate limiting.
- [verified] No migration-sensitive data model is currently evidenced.
- [inferred] The primary data-retention concern is email/workflow handling plus host-level temp-file retention rather than relational schema migration.

## Open questions
- Whether contact submissions are retained anywhere outside this repository in production mailboxes, CRM tools, or host logs.
- How long the temp-directory cooldown marker and related host logs are retained in production.
- Whether future analytics, lead capture, or CMS requirements will introduce a real data store.
