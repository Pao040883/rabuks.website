# Skill: Frontend Testing

## When to use
- When setting up tests in a frontend project
- When migrating or modernizing a frontend test stack
- When adding E2E coverage

## What to do
1) Inventory the current unit, integration, component, and E2E tooling first.
2) Prefer stable coverage for critical user journeys and high-risk contracts.
3) For greenfield or explicitly selected Angular setups, Vitest plus Playwright is a strong default.
4) Document the chosen test strategy in `docs/ai/DECISIONS.md` and `docs/ai/FRONTEND_TESTING.md`.

## References (repo)
- `docs/ai/FRONTEND_TESTING.md`
