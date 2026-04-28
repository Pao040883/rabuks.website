# Bootstrap Guide

## Goal
Apply this orchestrator template to a new or existing repository in a controlled way.

## Standard operating modes
- `existing`: default mode for repositories that already contain product code, workflows, or a README.
- `greenfield`: intended for brand-new repositories where the orchestrator can seed the initial README and working structure.

## Recommended path
1. Ensure the target repository is under Git.
2. Copy the orchestrator template into the target repository.
3. Review governance files before first use:
   - `.github/CODEOWNERS`
   - `.github/workflows/*`
   - `.github/ISSUE_TEMPLATE/*`
   - `docs/ai/*`
4. Choose whether a preference profile such as Django + Angular is active.
5. Start with `/kickoff` or `/extend-existing-system`.

## Scripted bootstrap
Existing repository:

```bash
scripts/bootstrap/install_orchestrator.sh --mode existing /path/to/target-repo
```

Greenfield repository:

```bash
scripts/bootstrap/install_orchestrator.sh --mode greenfield --with-optional-workflows /path/to/target-repo
```

Force an orchestrator-managed file refresh:

```bash
scripts/bootstrap/install_orchestrator.sh --mode existing --force /path/to/target-repo
```

## After copying
- Adjust CODEOWNERS to real teams or users.
- Review `.github/orchestrator-template.json` to confirm installed template version and rollout mode.
- Remove workflows or templates not relevant to the target repository.
- Run `python -m unittest discover -s tests` in the copied template if Python is available.
- Record the chosen operating model and profiles in `docs/ai/DECISIONS.md`.

## Standard rollout process
### Existing repositories
1. Run the installer in `existing` mode.
2. Keep the target repository README unless there is a deliberate reason to replace it.
3. Start with `/extend-existing-system` so the Tech Lead builds a verified baseline before implementation work.
4. Verify `docs/ai/PLAN.md`, `docs/ai/STATUS.md`, and `docs/ai/DECISIONS.md` after the first orchestration pass.

### Greenfield repositories
1. Run the installer in `greenfield` mode.
2. Decide whether the template README should remain as the initial repository README.
3. Start with `/kickoff` so scope, constraints, and initial decisions are captured.
4. Record stack choices and any active preference profile in `docs/ai/DECISIONS.md`.

## Upgrade discipline
- The template version is tracked in `ORCHESTRATOR_VERSION` and copied into the target repository.
- The installer writes `.github/orchestrator-template.json` so target repositories can track which template version and mode were last applied.
- Use `--force` only when you intentionally want to refresh orchestrator-managed files in an already bootstrapped repository.
- Target repositories do not need to adopt the template repository's changelog or release process.