# Rabuks Website - Deployment Checkliste

## ✅ Rechtliche Absicherung

### DSGVO-Konformität
- ✅ **Impressum** vorhanden mit vollständigen Angaben (Patrick Offermanns, Norderstedt)
- ✅ **Datenschutzerklärung** vollständig mit allen Punkten:
  - Datenerfassung und Verarbeitung
  - Google Analytics Hinweis
  - Cookie-Hinweise
  - Betroffenenrechte (Auskunft, Löschung, etc.)
  - Widerrufsrecht
- ✅ **Cookie-Banner** mit:
  - DSGVO-konformer Einwilligung
  - "Ablehnen" und "Akzeptieren" Buttons
  - Link zur Datenschutzerklärung
  - Google Analytics wird erst nach Zustimmung aktiviert (Consent Mode)
- ✅ **Footer-Links** zu Impressum und Datenschutz auf jeder Seite

### Google Analytics
- ✅ Google Analytics 4 implementiert (G-EMVJ6PZZBX)
- ✅ Consent Mode aktiviert (Analytics deaktiviert bis Nutzer zustimmt)
- ✅ In Datenschutzerklärung dokumentiert

## ✅ Technische Vollständigkeit

### Angular 21 Best Practices
- ✅ Alle Komponenten nutzen neue Control Flow Syntax:
  - `@for` statt `*ngFor`
  - `@if` statt `*ngIf`
  - `@switch/@case` statt `*ngSwitch`
- ✅ Standalone Components (keine NgModules)
- ✅ Signals verwendet
- ✅ `inject()` statt constructor DI
- ✅ TypeScript strict mode

### SEO & Performance
- ✅ **robots.txt** vorhanden
- ✅ **sitemap.xml** erstellt mit allen Hauptseiten
- ✅ **Meta-Tags** in index.html:
  - Title: "Rabuks - Raumbuch & Kalkulation für die Gebäudereinigung"
  - Description und Keywords gesetzt
- ✅ **.htaccess** mit:
  - SPA Routing (alle Requests → index.html)
  - HTTPS Redirect
  - Browser-Caching optimiert
  - Gzip-Kompression
  - Security Headers

### Funktionalität
- ✅ Dark/Light Mode mit Theme Service
- ✅ Cookie-Banner auf Home-Page integriert
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Kontaktformular bereit
- ✅ Preisrechner funktionsfähig
- ✅ Smooth Scrolling zu Sektionen

## 📝 Vor dem Hochladen

### 1. Build erstellen
```bash
cd website
ng build --configuration production
```

### 2. Build-Output prüfen
Der fertige Build liegt in: `dist/website/browser/`

### 3. Auf Server hochladen
Folgende Dateien/Ordner hochladen:
```
dist/website/browser/
├── index.html
├── favicon.ico
├── Logo_blau.png
├── Logo_weiß.png
├── .htaccess
├── robots.txt
├── sitemap.xml
├── contact.php (optional, falls Backend-Kontaktformular gewünscht)
└── [alle anderen generierten Dateien]
```

### 4. Server-Anforderungen
- Apache Webserver mit mod_rewrite aktiviert
- PHP (falls contact.php genutzt wird)
- SSL-Zertifikat (HTTPS) - .htaccess leitet automatisch um

## ⚠️ Wichtige Hinweise

### Google Analytics
- Google Analytics ID ist gesetzt: **G-EMVJ6PZZBX**
- Analytics wird erst nach Cookie-Zustimmung aktiv
- In Google Analytics Console: Website als Property hinzufügen

### Kontaktformular
Zwei Optionen:
1. **Backend (contact.php)**: Server muss PHP unterstützen und mail() Funktion aktiviert haben
2. **Web3Forms** (Alternative): Service wie in Datenschutzerklärung erwähnt
   - Kostenloses Kontaktformular-Backend
   - Keine PHP-Installation nötig
   - Formulardaten werden per E-Mail zugestellt

### Nach dem Upload testen
- [ ] Website aufrufen: https://rabuks.online
- [ ] Dark/Light Mode wechseln
- [ ] Cookie-Banner erscheint und funktioniert
- [ ] Impressum und Datenschutz aufrufbar
- [ ] Kontaktformular testen
- [ ] Preisrechner durchklicken
- [ ] Auf Mobile-Ansicht prüfen
- [ ] Google Analytics Test (in Google Analytics Console prüfen ob Daten ankommen)

## 🔒 Rechtssicherheit

### Was ist abgedeckt:
✅ Impressumspflicht (§ 5 TMG)
✅ Datenschutz (DSGVO Art. 13)
✅ Cookie-Einwilligung (ePrivacy-Richtlinie)
✅ Widerrufsrecht dokumentiert
✅ Verantwortliche Stelle benannt
✅ EU-Streitschlichtung erwähnt

### Optional zu beachten:
- Falls Newsletter: Dokumentation des Double-Opt-In
- Falls Zahlungen: Widerrufsbelehrung für Verbraucher
- Falls B2C-Verkauf: AGB notwendig

**Aktuell verkaufst du aber nichts direkt auf der Website** (nur Angebotserstellung), daher sind AGB nicht zwingend erforderlich.

## 🚀 Status

**Die Website ist BEREIT zum Hochladen!**

Alle rechtlichen und technischen Anforderungen sind erfüllt.
Letzte Prüfung: 1. Februar 2026
