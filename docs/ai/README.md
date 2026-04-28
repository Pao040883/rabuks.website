# Project Memory (`docs/ai/*`)

This directory is the persistent project memory for the agent system.
It may start mostly empty.
Agents are expected to build and maintain it from repository evidence and confirmed decisions.

## Rules
- Code and configuration remain the operational source of truth.
- These files store derived memory.
- If memory conflicts with code, agents must update the memory.
- Major claims should be treated as `verified`, `inferred`, `assumed`, or `deprecated`.

## Minimum expectation
For existing systems, agents should first make these files minimally trustworthy:
- `BASELINE.md`
- `ARCHITECTURE.md`
- `API_MAP.md`
- `DB_MAP.md`

Then maintain:
- `PLAN.md`
- `STATUS.md`
- `DECISIONS.md`

## Writing style
Keep entries short, evidence-backed, and explicit about uncertainty.
