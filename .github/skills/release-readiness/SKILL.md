# Skill: Release Readiness

## When to use
- Before merging or releasing meaningful changes
- When rollout, rollback, or operational impact matters
- When a change affects contracts, data, security, or observability

## What to do
1) Verify acceptance criteria, tests, and reviewer sign-off are explicit.
2) Check deployment path, rollback posture, migrations, feature flags, and monitoring.
3) Confirm security and compliance impacts are documented when relevant.
4) Record release notes, residual risks, and follow-up actions in `docs/ai/STATUS.md` and `docs/ai/DECISIONS.md`.

## References (repo)
- `docs/ai/STATUS.md`
- `docs/ai/DECISIONS.md`
- `docs/ai/OBSERVABILITY.md`
- `docs/ai/MIGRATION_POLICY.md`
- `docs/ai/COMPLIANCE_CHECKLIST.md`