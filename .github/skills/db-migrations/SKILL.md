# Skill: DB Migrations (Zero/near-zero downtime)

## When to use
- When changing DB schema or data migrations
- When planning a deploy with rolling updates
- When adding constraints/indexes/backfills

## What to do
1) Follow `docs/ai/MIGRATION_POLICY.md` (expand → backfill → contract).
2) For risky ops: split into phases and document in `docs/ai/PLAN.md`.
3) Ensure rollback plan + monitoring.
4) Keep migrations small; backfills via background jobs where possible.

## References (repo)
- `docs/ai/MIGRATION_POLICY.md`
- `docs/ai/DB_MAP.md`
