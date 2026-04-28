# Rabuks Website - Deployment

## Aktueller Stand

Diese Website ist keine reine Static-Site-Deployment mehr. Das Frontend sendet das Kontaktformular per POST an `/contact.php`. Ein produktiver Upload ist daher nur funktionsfähig, wenn der Host neben den Angular-Build-Dateien auch PHP ausführt und E-Mails zustellen kann.

Diese Datei beschreibt den technischen Stand im Repository. Sie ist keine Aussage, dass der Live-Betrieb rechtlich vollständig geprüft oder ohne weitere Hosting-Konfiguration sofort produktionsreif ist.

## Laufzeit-Anforderungen

- Angular-Build aus `dist/website/browser/` ausliefern.
- `/contact.php` unter derselben Domain wie die Website bereitstellen.
- PHP muss `mail()` erfolgreich zustellen können, sonst schlägt das Kontaktformular serverseitig fehl.
- Wenn Apache verwendet wird, ist die mitgebaute `.htaccess` für SPA-Routing, HTTPS-Redirect, Caching und Basis-Header vorgesehen.
- Google Analytics bleibt bis zur Einwilligung deaktiviert und wird erst nach Consent aktiviert.

## Consent-UI

- Der Cookie-Banner wird global eingeblendet, bis eine Entscheidung in `localStorage` gespeichert ist.
- Es gibt zwei Optionen: nur notwendige Cookies oder Analytics akzeptieren.
- Der Banner verlinkt auf die Datenschutzerklärung.
- Im Footer können Besucher die Cookie-Einstellungen erneut öffnen; bei erteilter Analytics-Einwilligung ist dort zusätzlich ein Widerruf verfügbar.

## Deployment-Schritte

### 1. Build erstellen

```bash
npm install
npm run build
```

### 2. Artefakte bereitstellen

Den Inhalt von `dist/website/browser/` auf den Webspace hochladen. Durch die Asset-Konfiguration werden dabei auch Dateien aus `public/` mit ausgeliefert, einschließlich `.htaccess`, `robots.txt`, `sitemap.xml` und `contact.php`.

### 3. Hosting prüfen

- PHP-Ausführung für `/contact.php`
- ausgehende Mail-Zustellung auf dem Server
- HTTPS auf der Ziel-Domain
- Apache `mod_rewrite`, falls die mitgelieferte `.htaccess` unverändert genutzt wird

## Smoke-Test nach dem Upload

- Startseite und Unterseiten laden
- Kontaktformular erfolgreich absenden
- Fehlerfall des Kontaktformulars prüfen, wenn Mailversand nicht verfügbar ist
- Cookie-Banner erscheint beim ersten Besuch
- "Nur notwendige Cookies" unterdrückt Analytics
- "Akzeptieren" aktiviert Analytics
- Footer-Aktion für Cookie-Einstellungen und Analytics-Widerruf funktioniert

## Hinweise

- `contact.php` akzeptiert nur POST-Anfragen, prüft Same-Origin, validiert Eingaben, nutzt ein Honeypot-Feld und begrenzt Anfragen pro IP.
- Wenn PHP oder Mail-Zustellung auf dem Zielsystem fehlen, ist das Kontaktformular im Live-Betrieb nicht funktionsfähig.
- Rechtliche Aussagen sollten vor dem Go-Live separat fachlich geprüft werden; das Repository allein belegt keine vollständige Compliance.
