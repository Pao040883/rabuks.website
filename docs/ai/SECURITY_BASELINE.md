# Security Baseline

## Purpose
Stores the current security posture, known controls, gaps, and review notes.

## Last verified
2026-03-12

## Confidence
verified

## Evidence
- AGENTS.md
- .github/copilot-instructions.md
- .github/agents/security.agent.md
- .github/agents/compliance-privacy.agent.md
- .github/workflows/security-hygiene.yml
- .github/dependabot.yml
- .github/pull_request_template.md

## Content
- [verified] Security-sensitive work is expected to route through explicit security review when auth, authz, secrets, cookies, CSRF, CORS, tenancy, or data exposure are involved.
- [verified] Compliance and privacy review is separately routable for retention, deletion, consent, and auditability concerns.
- [verified] The pull-request template requires security, compliance/privacy, migration, and rollback impact to be stated.
- [verified] Security hygiene in CI now includes secret scanning with Gitleaks and CodeQL analysis for Python.
- [verified] Dependabot is configured for GitHub Actions dependencies in the governance layer.
- [verified] The current worktree now exposes a real unauthenticated PHP contact endpoint with validation, same-origin filtering, honeypot handling, and IP-based cooldown logic.
- [inferred] Remaining security risk centers on best-effort host/origin filtering, unverified mail-delivery runtime behavior, incomplete analytics-cookie cleanup guarantees across deployment shapes, and lack of evidence for operational logging around abuse or mail failure.

## Suggested sections for adopting repositories
- Authentication and authorization model
- Secret handling and key management
- Cookie, CSRF, and CORS posture
- Tenant isolation or data-boundary assumptions
- Audit logging and security monitoring
- Open findings and accepted risk decisions

## Open questions
- Whether additional package-ecosystem scanning defaults should be shipped beyond GitHub Actions dependency updates.
