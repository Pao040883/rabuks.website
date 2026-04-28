# Skill: Django + Angular Preference Profile

## When to use
- When the team explicitly selects Django plus Angular for a new project
- When a repository already clearly follows Django plus Angular conventions
- When comparing a neutral baseline against the team's preferred full-stack profile

## What this is
- This is an optional preference profile, not a global default.
- It must not override repository evidence in an existing system.
- If selected for a project, record the decision and consequences in `docs/ai/DECISIONS.md`.

## What to do
1) Verify whether the repo already uses Django and Angular or whether the profile is only a proposal.
2) For backend defaults, prefer Django plus DRF with clear layering around serializers, services, selectors, permissions, and views.
3) For frontend defaults, prefer Angular standalone APIs, a documented UI strategy, and explicit testing decisions.
4) For auth and web security, prefer a documented cookie and CSRF strategy over ad-hoc token handling.
5) For operations, prefer explicit migration, observability, and release-readiness decisions instead of relying on implied conventions.
6) Update `docs/ai/DECISIONS.md`, `docs/ai/ARCHITECTURE.md`, `docs/ai/API_MAP.md`, `docs/ai/FRONTEND_TESTING.md`, and `docs/ai/SECURITY_BASELINE.md` as relevant.

## References (repo)
- `docs/ai/DECISIONS.md`
- `docs/ai/ARCHITECTURE.md`
- `docs/ai/API_MAP.md`
- `docs/ai/FRONTEND_TESTING.md`
- `docs/ai/SECURITY_BASELINE.md`