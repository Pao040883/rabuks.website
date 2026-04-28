# Observability

## Purpose
Stores metrics, traces, dashboards, alerting, and operational visibility expectations.

## Last verified
2026-03-12

## Confidence
verified

## Evidence
- README.md
- .github/skills/logging-observability/SKILL.md
- .github/prompts/release-readiness.prompt.md
- .github/ISSUE_TEMPLATE/incident-report.md
- .github/ISSUE_TEMPLATE/operational-change.md

## Content
- [verified] Logging baseline: prefer structured logs and correlation identifiers where the host stack supports them.
- [verified] Operational review baseline: release and operational changes should capture logging, metrics, tracing, and alerting consequences.
- [verified] Intake support: the operational-change issue template explicitly asks for observability impact and validation checks.
- [verified] Incident handling support: the incident-report template captures detection signals, observability gaps, and follow-up actions.
- [verified] The current website now depends on `public/contact.php` plus mail delivery for real lead capture, but the repository still shows no concrete logs, metrics, alerts, or synthetic checks for contact submission success, rejection, or mail failure.
- [inferred] Release readiness for the contact flow currently relies on manual smoke tests rather than repo-evidenced operational instrumentation.

## Suggested sections for adopting repositories
- Logging sinks and retention
- Metrics and service-level indicators
- Tracing and correlation IDs
- Alerting and escalation paths
- Post-release verification checks

## Open questions
- Which operational signal should own contact-flow health: HTTP error rate, mail-delivery failure rate, or synthetic submission checks.
- Whether incident postmortems should later be split into a separate workflow beyond the issue template.
