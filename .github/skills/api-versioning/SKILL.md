# Skill: API Versioning

## When to use
- When designing public APIs
- Before any breaking change
- When introducing new endpoints for old clients

## What to do
1) Inventory the current API surface, consumers, and compatibility constraints first.
2) Decide versioning strategy appropriate for the actual stack.
3) For greenfield HTTP APIs, URL-path versioning like `/api/v1` is an acceptable default unless another approach fits better.
4) Document strategy, deprecation policy, and rollout rules in `docs/ai/VERSIONING.md` and `docs/ai/DECISIONS.md`.

## References (repo)
- `docs/ai/VERSIONING.md`
- `docs/ai/API_MAP.md`
