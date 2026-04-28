# Skill: Code Quality Guardrails

## When to use
- When a repository needs explicit quality guardrails or consistency checks
- When introducing or reviewing lint, test, and review standards
- When comparing existing project practices against fallback team defaults

## Goals
- Wartbarer Code (kleine Funktionen/Dateien)
- Konsistente Standards über Projekte hinweg
- CI/Gates, die wirklich helfen (nicht nur “Noise”)

## Repository first
- Erst die vorhandenen Linter, Formatter, Test-Runner und CI-Regeln prüfen.
- Bevorzugte Team-Defaults nur anwenden, wenn das Projekt sie bereits nutzt oder bewusst auswählt.

## Fallback guardrails
- Wenn das Host-Repo keine klaren Standards hat, sind kleine Funktionen, überschaubare Dateien, separate Helpers und dokumentierte öffentliche APIs sinnvolle Defaults.
- Wenn das Host-Repo bereits andere Qualitätsgrenzen oder Review-Praktiken etabliert hat, gelten diese zuerst.

## Generic expectations
- Kleine, gut testbare Einheiten bevorzugen.
- Öffentliche Schnittstellen dokumentieren.
- Qualitätsgates am bestehenden Stack ausrichten.

## Preferred profile: Backend (Django/DRF)
- `flake8` + `pytest` (+ `pytest-django`)
- Layering: serializers / views(viewsets) / permissions / services / selectors
- Auth: JWT Cookie + CSRF korrekt

## Preferred profile: Frontend (Angular)
- ESLint mit `max-lines` + `max-lines-per-function`
- Vitest als Default für neue Angular Projekte (Karma nur legacy)
- E2E: Playwright empfohlen

## Output
- kurze Liste: gefundenes Problem → Fix → Command zum Verifizieren

## References (repo)
- `docs/ai/DECISIONS.md`
- `docs/ai/STATUS.md`
