# Repo Structure

## Purpose
Stores the meaningful repository layout and where major responsibilities live.

## Last verified
2026-03-12

## Confidence
verified

## Evidence
- README.md
- .github/agents/
- .github/instructions/
- .github/prompts/
- .github/skills/
- scripts/hooks/

## Content
- `README.md`, `AGENTS.md`, `.github/copilot-instructions.md`: top-level contract and repository-wide behavior.
- `.github/agents/`: specialist roles, including coding, review, security, compliance/privacy, operations, design, research, and product-discovery support.
- `.github/instructions/`: always-on language and orchestration conventions.
- `.github/prompts/`: entry workflows for kickoff, existing-system extension, implementation, requirements discovery, and release readiness.
- `.github/skills/`: reusable workflow modules for memory sync, migrations, testing, observability, discovery, release readiness, and optional preference profiles.
- `.github/pull_request_template.md`: review template aligned with orchestrator expectations for tests, risks, memory sync, and release impact.
- `.github/CODEOWNERS`: review ownership hints for governance surfaces, docs memory, and test contracts.
- `.github/ISSUE_TEMPLATE/`: intake templates for bugs, features, and operational changes.
- `.github/dependabot.yml`: automated dependency update policy for GitHub Actions in the governance layer.
- `.github/release-checklist.md`: reusable operational release checklist.
- `.github/workflow-templates/`: optional adoption-time workflow templates for common repository stacks.
- `.github/workflows/`: CI automation for orchestrator contract validation.
- `scripts/hooks/`: deterministic governance checks for startup context, pre-tool restrictions, plan drift hints, and stop gating.
- `scripts/bootstrap/`: helper scripts for rolling the orchestrator into target repositories.
- `tests/`: Python unittest coverage for governance hooks, agent-schema checks, and prompt/skill consistency checks.
- `docs/ai/`: derived persistent memory for plans, status, decisions, baseline, architecture, and policy documents.

## Open questions
- Whether additional explicit preference profiles should be added for other common team stacks.
