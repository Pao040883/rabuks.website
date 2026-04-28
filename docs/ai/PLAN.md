# Plan

## Purpose
Stores the active bounded execution plan for the current goal.

## Last verified
2026-03-13

## Confidence
verified

## Evidence
- User request to analyze the existing Angular frontend and create a trustworthy baseline
- package.json
- angular.json
- README.md
- DEPLOYMENT.md
- src/app/**/*.ts
- src/app/**/*.html
- public/contact.php
- .github/workflows/*.yml

## Content
- [verified] Goal: establish trustworthy project memory for the existing Rabuks Angular frontend and execute the first correction wave around real lead capture, consent lifecycle, accessibility, test quality, and build hygiene.
- [verified] Work package 1: harden and verify the now-implemented Angular to PHP contact submission path, including deployment compatibility, proxy behavior, and real error handling.
- [verified] Work package 2: close the remaining compliance gaps by aligning deployment-specific provider, retention, and logging disclosures with the current implementation.
- [verified] Work package 3: keep accessibility moving from code-level fixes into browser-verified keyboard behavior for menu, banner, and key home-page flows.
- [verified] Work package 4: reduce structural duplication by centralizing route-to-section scrolling and removing stale legal-page template files.
- [verified] Work package 5: restore frontend validation credibility by turning the locally passing focused specs into repeatable CI checks, then expanding coverage for navigation, pricing calculation, cookie consent, and contact behavior.
- [verified] Work package 6: add browser-level regression coverage for home, legal pages, mobile navigation, and consent flow, ideally with accessibility assertions.
- [verified] Work package 7: add frontend CI hygiene so pull requests run Angular build and frontend tests, and enforce bundle-budget regressions in shared delivery flow.
- [verified] Work package 8: tighten performance hygiene through image optimization, font-loading strategy review, and removal of unnecessary runtime or duplicate DOM work.
- [verified] Work package 9: replace the temporary mobile screenshot placeholders with real mobile assets and decide whether further gallery behavior is needed.

## Prioritization
1. [verified] Correctness and compliance first: contact flow truth plus consent-revocation/legal-copy alignment.
2. [verified] Accessibility next: interactive semantics and keyboard/screen-reader support on the main journeys.
3. [verified] Testing and CI next: stale test replacement, component/integration coverage, and PR automation.
4. [verified] SEO delivery next: keep the accepted runtime-only SPA metadata approach and validate only whether additional share-preview assets are needed.
5. [verified] Structural cleanup next: deduplicate navigation logic and remove dead legal templates.
6. [verified] Performance tuning last: optimize assets and loading after correctness, accessibility, and regression safety are in place.

## Open questions
- Whether Playwright is acceptable as the repo's first e2e and accessibility harness, or whether the team prefers a different browser-test tool.
- Whether compliance/privacy requires changes to retention wording, host identification, mail-processing disclosures, or IP-based anti-abuse disclosure beyond the code changes now in scope.
- When the mobile screenshots arrive, whether the homepage should switch to a device-aware `<picture>` strategy or keep explicit desktop/mobile showcase cards.
