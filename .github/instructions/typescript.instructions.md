---
applyTo: "**/*.{ts,tsx,js,jsx}"
---

## TypeScript / Angular Standards
- Vorhandene Repo-Regeln zu Struktur, Testing und Dokumentation haben Vorrang.
- Exported APIs sollen dokumentiert sein, sofern das Host-Repo das nicht bewusst anders handhabt.

## Bestehende Systeme zuerst
- Vor Änderungen den tatsächlichen Frontend-Stack, Router, State-Strategie, Build-Tool und Test-Stack im Repo prüfen.
- Keine Angular-, Material-, Tailwind- oder Vitest-Annahmen treffen, wenn das Repo etwas anderes nutzt.

## Bevorzugtes Profil, falls explizit gewählt
- Strenge Guardrails wie kurze Funktionen oder kleine Dateien sind valide Team-Defaults, aber keine globale Pflicht dieses Templates.
- Angular: aktuelles stabiles Release, Standalone, Signals und moderne APIs bevorzugen.
- UI/Design: Material Design 3 ist eine valide Standardoption, aber nicht automatisch gesetzt.
- Beim Projektstart Framework- und UI-Optionen neutral vergleichen und die Auswahl in `docs/ai/DECISIONS.md` festhalten.
