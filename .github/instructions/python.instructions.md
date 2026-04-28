---
applyTo: "**/*.py"
---

## Python / Django Standards
- Ziel: sauberer, wartbarer Python-Code mit repo-passenden Tools.
- Vorhandene Repo-Regeln zu Formatierung, Tests und Struktur haben Vorrang.
- Öffentliche APIs sollen dokumentiert sein, sofern das Host-Repo nicht bewusst anders arbeitet.
- Komplexe Logik in Services/Selectors/Utils auslagern.

## Bestehende Systeme zuerst
- Vor Änderungen den tatsächlichen Python-Stack, die Testwerkzeuge und Framework-Konventionen im Repo prüfen.
- Keine Django-, DRF-, JWT- oder PostgreSQL-Annahmen treffen, wenn das Repo etwas anderes nutzt.

## Bevorzugtes Profil, falls explizit gewählt
- Strenge Guardrails wie kurze Funktionen und kleine Dateien sind valide Team-Defaults, aber keine globale Pflicht dieses Templates.
- Django/DRF: klar getrennte Layer (serializers, services, selectors, permissions, views/viewsets).
- Auth für Web-Apps: serverseitig abgesicherte Cookie- und CSRF-Strategie statt impliziter Token-Defaults.
- Datenbank für neue Standard-Webprojekte: PostgreSQL, wenn keine anderen Constraints vorliegen.
