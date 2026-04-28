# Versioning

## Purpose
Stores contract versioning, release versioning, and compatibility expectations.

## Last verified
2026-03-12

## Confidence
verified

## Evidence
- README.md
- ORCHESTRATOR_VERSION
- CHANGELOG.md
- BOOTSTRAP.md
- .github/skills/api-versioning/SKILL.md
- .github/prompts/release-readiness.prompt.md
- .github/release-checklist.md
- .github/workflows/orchestrator-contracts.yml
- scripts/bootstrap/install_orchestrator.sh

## Content
- [verified] Contract and release versioning are first-class concerns in the template.
- [verified] The orchestrator template itself is now versioned via `ORCHESTRATOR_VERSION`.
- [verified] The bootstrap installer writes `.github/orchestrator-template.json` into target repositories to record installed template version and rollout mode.
- [verified] API versioning strategy must be made explicit and recorded in `docs/ai/VERSIONING.md` and `docs/ai/DECISIONS.md` when relevant.
- [verified] Release discipline is supported by a reusable checklist that ties scope, risk, project memory, and handoff together.
- [verified] The template now uses semantic versioning for its own reusable orchestration assets.
- [verified] Lightweight template-release consistency is validated in CI by checking `ORCHESTRATOR_VERSION` against `CHANGELOG.md`.
- [verified] Target repositories are not required to adopt the template repository's changelog or release process.
- [assumed] Target repositories will choose semantic versioning, date-based versioning, or another release model based on product constraints.

## Suggested sections for adopting repositories
- Public API versioning strategy
- Backward-compatibility rules
- Deprecation and sunset policy
- Release tagging and changelog practice
- Consumer communication expectations

## Template versioning rules
- Use semantic versioning for the orchestrator template itself.
- Increment major when governance contracts or file layout change incompatibly.
- Increment minor when reusable capabilities are added in a backward-compatible way.
- Increment patch when behavior is corrected without changing the expected adoption model.

## Lightweight template release process
- Update `ORCHESTRATOR_VERSION`.
- Add or update the matching section in `CHANGELOG.md`.
- Run the contract suite locally or in CI.
- Optionally create a Git tag such as `v3.1.0`.

## Target repository impact
- No target repository is required to maintain `CHANGELOG.md` for the orchestrator template.
- The only carried metadata is the installed template version and rollout mode in `.github/orchestrator-template.json`.

## Open questions
- Whether the template should ship a dedicated release-notes artifact in addition to the PR template and release checklist.
