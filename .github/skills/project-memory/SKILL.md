# Skill: Project Memory (docs/ai/*)

## When to use
Use this skill whenever:
- a plan/architecture/requirement changes,
- you discover a new constraint,
- you start working on an existing codebase with missing/old documentation,
- you finish an implementation step that affects the plan/policies.

## What to do (always)
1) Update `docs/ai/PLAN.md` (current truth, not aspirational).
2) Log decisions in `docs/ai/DECISIONS.md` (ADR style).
3) Keep `docs/ai/STATUS.md` current (what's done / next / risks).
4) If system exists: keep `BASELINE.md`, `ARCHITECTURE.md`, `API_MAP.md`, `DB_MAP.md` aligned.
5) If a decision touches policies: update the relevant docs:
   - `MIGRATION_POLICY.md`, `LOGGING_POLICY.md`, `SECURITY_BASELINE.md`, `VERSIONING.md`, `BACKGROUND_JOBS.md`, `FRONTEND_TESTING.md`, `COMPLIANCE_CHECKLIST.md`.
6) If repository layout or ownership boundaries change: update `docs/ai/REPO_STRUCTURE.md`.

## Output format in chat (short)
- Updated files list
- 3–7 bullets: what changed and why

## References (repo)
- `docs/ai/PLAN.md`
- `docs/ai/STATUS.md`
- `docs/ai/DECISIONS.md`
- `docs/ai/BASELINE.md`
- `docs/ai/ARCHITECTURE.md`
- `docs/ai/API_MAP.md`
- `docs/ai/DB_MAP.md`
