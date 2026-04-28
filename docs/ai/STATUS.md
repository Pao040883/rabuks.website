# Status

## Purpose
Stores current progress, blockers, open decisions, and drift warnings.

## Last verified
2026-03-13

## Confidence
verified

## Evidence
- docs/ai/BASELINE.md
- docs/ai/ARCHITECTURE.md
- docs/ai/API_MAP.md
- docs/ai/DB_MAP.md
- src/app/app.spec.ts
- src/app/components/contact/contact.component.ts
- src/app/components/header/header.component.html
- src/app/components/footer/footer.component.html
- src/app/components/cookie-banner/cookie-banner.component.html
- src/app/services/cookie-consent.service.ts
- src/app/services/analytics.service.ts
- public/contact.php
- .github/workflows/orchestrator-contracts.yml
- .github/workflows/security-hygiene.yml

## Content
- [verified] Completed: re-baselined core project memory from stale orchestrator-template content to the actual Rabuks Angular frontend.
- [verified] Completed: documented the real route surface, component composition, runtime integrations, and deployment signals.
- [verified] Completed: documented the absence of a repository-backed application database and the limited browser persistence boundary.
- [verified] Completed in worktree: the contact form now performs a real POST to `public/contact.php` instead of simulating success.
- [verified] Completed in worktree: a post-hoc analytics withdrawal path now exists through `CookieConsentService` and footer actions.
- [verified] Completed in worktree: focused specs were added for contact submission and cookie-consent behavior, and the stale root spec was updated.
- [verified] Completed in worktree: the cookie banner was moved into the app shell, so cookie settings can now be reopened from legal routes as advertised.
- [verified] Completed in worktree: the active privacy page and deployment note were updated to reflect the real contact flow more accurately, and obsolete standalone legal HTML templates were removed.
- [verified] Completed in worktree: shared header and footer semantics were improved, including a semantic home link, ARIA-labeled mobile navigation state, and removal of earlier fake clickable elements.
- [verified] Completed in worktree: route-level SEO metadata was added through router data plus `SeoService`, and the static shell head now includes baseline robots/Open Graph/Twitter signals.
- [verified] Completed in worktree: the consent-gated Google Analytics measurement ID was updated to `G-YPZPH8NSB8`.
- [verified] Completed in worktree: mobile-menu focus handling now moves focus on open, closes on Escape, and returns focus to the trigger; cookie-banner reopening now focuses a primary action.
- [verified] Completed in worktree: homepage product imagery now lives in a dedicated screenshot showcase built from first-party assets in `public/Screenshots`, with placeholders reserved for future mobile screenshots.
- [verified] Completed in worktree: clicking a showcase screenshot opens an accessible gallery over all currently available screenshots, with close, previous/next, Escape handling, and focus return.
- [verified] Completed in worktree: the screenshot gallery now uses more of the available viewport width and height, so product screens are materially larger on desktop without breaking smaller layouts.
- [verified] Completed in worktree: the former mobile placeholders were replaced with real assets from `public/Mobile-Screenshots`, and the gallery now spans the combined desktop and mobile screenshot set.
- [verified] Completed in worktree: the product preview was refactored from multiple cards into a single slider card with text on the left, desktop preview beside it, and a portrait mobile preview as a separate height-led column.
- [verified] Completed in worktree: header navigation, mobile menu, and footer now include a direct `Produktvorschau` entry that scrolls to the screenshot section on the home page.
- [verified] Completed in worktree: the screenshot section wording was tightened from `Produktvorschau` to `Einblicke` across the badge, header navigation, mobile menu, and footer.
- [verified] Completed in worktree: the single showcase card now auto-advances, keeps clickable dot navigation at the bottom, and aligns desktop and mobile previews to the same visible height without widening the portrait mobile image unnaturally.
- [verified] Completed in worktree: gallery previous/next behavior was hardened with wrapped index handling and safer direct-open clamping across the full mixed desktop/mobile image set.
- [verified] Completed in worktree: the dynamic gallery image now uses native `src` bindings instead of `NgOptimizedImage`, removing the Angular runtime error caused by changing intrinsic image dimensions while navigating between desktop and mobile assets.
- [verified] Completed in worktree: the slider preview images now use intrinsic dimensions plus native `img` bindings, so the full preview image remains visible with `object-contain`, the visible mobile label text is removed, and the earlier `NgOptimizedImage` console warnings for the rotating previews are avoided.
- [verified] Completed in worktree: the gallery modal now uses a fixed responsive image area height, so portrait and landscape screenshots are both fully contained without changing the gallery height between images.
- [verified] Completed in validation: `npm run build` passed after the contact-form compile fix.
- [verified] Completed in validation: focused test runs passed for the contact component and cookie-consent service after dependency install and a localStorage shim for the consent spec.
- [verified] Completed in validation: the latest frontend specialist reported `npm run test -- --watch=false` passing with 4 test files and 10 tests, including route SEO metadata coverage.
- [verified] Completed in validation: a later frontend specialist reported `npm run test -- --watch=false` passing with 6 test files and 13 tests after the screenshot and focus-management changes.
- [verified] Completed in validation: the screenshot-showcase specialist reported focused slider and gallery tests passing with 5 tests after the single-card refactor.
- [verified] Completed in validation: a later screenshot-showcase pass reported focused tests passing with 8 tests after autoplay, equal-height previews, and gallery navigation hardening.
- [verified] Completed in validation: a fresh production build was also executed successfully under Node 24.14.0 using the repository's pinned LTS runtime baseline.
- [verified] Open high risk: production host, mail-processing chain, and retention/logging facts for the PHP contact path are still not evidenced in the repository and remain release-relevant.
- [verified] Open medium risk: the current PHP origin check is improved but still dependent on real host/proxy metadata and must be verified in the target deployment environment.
- [verified] Open medium risk: frontend validation is improved but not complete; no CI workflow, browser-level regression suite, or PHP-capable end-to-end verification exists yet.
- [verified] Open medium risk: `public/contact.php` remains an unauthenticated public mail trigger with best-effort abuse controls only and no repo-evidenced operational monitoring.
- [verified] Open medium risk: performance hygiene is only partially enforced; bundle budgets exist, but there is no CI enforcement, no image optimization strategy, and no automated accessibility/performance regression baseline.
- [verified] Open medium risk: the new SEO metadata strategy is runtime-only inside a client SPA, so legal-route initial HTML and non-JS crawler/share-card behavior remain limited until prerendering or equivalent delivery is introduced.
- [verified] Open low risk: the screenshot gallery now restores focus and supports Escape plus next/previous controls more robustly, but it still does not implement a strict focus trap.
- [verified] Next step: verify one real proxied/staging contact submission path on the intended host, then replace the mobile showcase placeholders with real assets as they become available and choose the minimum browser and CI quality gate for accessibility and runtime SEO behavior.

## Open questions
- Is `contact.php` part of the live deployment, and if yes, who owns its operational and compliance posture?
- Which production host and mail-processing chain must be named in the privacy text.
