# Skill: Logging & Observability

## When to use
- When setting up production logging
- When adding correlation IDs, tracing, error monitoring
- When troubleshooting production incidents

## What to do
1) Inventory the current logging, metrics, tracing, and alerting setup first.
2) Prefer structured logs and correlation identifiers where the platform supports it.
3) Add security-relevant audit or abuse-detection signals that fit the actual stack.
4) For selected Django/DRF stacks, include request correlation and throttling/security logs.
5) Document decisions in `docs/ai/DECISIONS.md`, `docs/ai/LOGGING_POLICY.md`, and `docs/ai/OBSERVABILITY.md`.

## References (repo)
- `docs/ai/LOGGING_POLICY.md`
- `docs/ai/SECURITY_BASELINE.md`
