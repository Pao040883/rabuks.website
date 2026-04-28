# Orchestration Reference (V2)

## Specialist Handover Template
Every specialist agent should return work in this structure.

### Objective
What was requested.

### Files changed or reviewed
- path/to/file
- path/to/file

### Summary
What was implemented, analyzed, or recommended.

### Repository evidence consulted
- path/to/file
- path/to/file

### Risks
- risk
- risk

### Assumptions / uncertainties
- uncertainty
- uncertainty

### Tests
- run: command
- result: passed / failed / not run
- gaps: if any

### Security relevance
none / low / medium / high + short reason

### Docs to update
- `docs/ai/...`
- `docs/ai/...`

### Recommended next step
review, security, qa, dba, devops, research, or tech lead sync

## Definition of done by role
### Tech Lead
Complete only when scope, delegation, risks, decisions, and relevant `docs/ai/*` files are updated.

### Frontend Coder
Complete only when implementation respects existing frontend patterns, test impact is clear, and required docs updates are named.

### Backend Coder
Complete only when endpoint/domain/auth implications are considered, tests are updated or explicitly missing, and required docs updates are named.

### DBA
Complete only when migration risk, lock/downtime risk, and rollback or contract plan are stated.

### DevOps
Complete only when deployment effect, rollback effect, observability effect, and secret handling impact are stated.

### QA
Complete only when critical paths, test gaps, and regression risk are visible.

### Security
Complete only when auth/authz/secret/cookie/CORS/CSRF risk is classified and actionable findings are stated.

### Reviewer
Complete only when code risk, test risk, docs drift, and complexity issues are called out.
