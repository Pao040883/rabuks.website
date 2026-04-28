# Logging Policy

## Purpose
Stores logging expectations, sensitive-data rules, and structured logging guidance.

## Last verified
2026-03-13

## Confidence
inferred

## Evidence
- public/contact.php
- DEPLOYMENT.md
- docs/ai/OBSERVABILITY.md

## Content
- [verified] No application-level structured logging, request logging policy, or mail-failure logging policy is evidenced for the PHP contact endpoint.
- [verified] The current PHP endpoint returns structured HTTP errors for validation, throttling, and mail failure, but there is no repo-evidenced sink for retaining or alerting on these outcomes.
- [inferred] Until the deployment owner documents real host logs or mail-transport logs, support for contact-flow incidents remains primarily manual.

## Open questions
- Which host- or application-level logs exist for `contact.php` requests, mail failures, throttling, and abuse review.
