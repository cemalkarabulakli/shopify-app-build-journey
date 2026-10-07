# Spec 0005 — Mobile-first layout (mini)

- Status: In progress
- Mode: lite
- Plan: `specs/plans/0005-plan.md`
- Source: owner request 2026-10-07 — "on mobile design is not good. Our priority is mobile design
  and use Tailwind CSS. Scan the project and make the updates." (full-page phone screenshot of `/`)
- Supersedes: 0004/CB-2 and 0004/CB-3 (below 1024 px the nav moves into a menu; the header gets
  much shorter than the 260 px cap)

## Intent
Most readers arrive from a phone (social links, DMs), and today the site reads like a desktop page
squeezed into one. The home quest map is the worst: scroll and quest titles wrap one or two words
per line, and the trail line runs through the chapter banners. On every page the header takes about
200 px before any content, and controls are too small to tap.
This change makes phones (320–430 px) the primary layout using Tailwind only. The desktop look from
1024 px stays as it is. No new pages, content or features.

Scan of the live site before the change (13 pages × 320/360/390 px × en/tr; `before/scan.json`):
no page scrolls sideways, but
- on `/`, 5–19 text blocks per page are narrower than half the screen and longer than 3.5 lines;
- on `/docs` and `/docs/00-shopify-101`, 6–32 such blocks, all table cells;
- 11–28 controls per page are smaller than 40 px in one direction: nav links 28 px tall,
  checkboxes 20 px, language switch about 24 px;
- labels at 10.4–11.2 px appear on 12 of the 13 pages;
- a full-page capture shows horizontal bands in the background.

"Phone" means a viewport 320–430 px wide; "below desktop" means narrower than 1024 px.

## Changed behavior
- [ ] CB-1 — **Compact header below desktop.** Below 1024 px, the header is one row no taller than
  64 px. It holds the logo, the current language switch and a menu button, and stays pinned to the
  top of the screen while the page scrolls.
  The menu opens a panel listing all 9 destinations (Map, Journal, Library, Merchants, Traveller,
  VIP, Roadmap, Account, RSS) with their icons, and marks the current page. Each menu row is at least
  44 px tall. The panel closes when a destination is chosen.
- [ ] CB-2 — **No squeezed text.** At 320, 360 and 390 px, in en and tr, on all 13 pages, no text
  block outside a table is narrower than half the screen while running longer than 3.5 lines. The
  scan's `squeezed` count without table cells is 0; today it is 5–19 on `/`.
- [ ] CB-3 — **Tables stay readable.** On a phone, no table cell in a scroll, entry or the library
  intro is narrower than 140 px. A table wider than its column scrolls sideways inside its own box;
  the page itself never scrolls sideways.
- [ ] CB-4 — **Thumb-sized controls.** At phone widths, every control outside running text has a
  touch area of at least 44 × 44 px. That covers the menu button, menu rows, language switch, scroll,
  task and quest rows with their checkboxes, the "read" arrow, buttons, toggles and form fields.
  Links inside a sentence or paragraph are exempt. The scan's small-tap count, with inline links
  excluded, is 0.
- [ ] CB-5 — **No tiny text.** No text on any page is smaller than 12 px at any width; today the
  smallest is 10.4 px. The scan's `tiny` count is 0.
- [ ] CB-6 — **The home trail fits a phone.** At phone widths:
  - the trail line and its waypoints take no more than 48 px at the left edge;
  - the line never crosses text in a chapter banner;
  - the "you are here" dragon stays visible next to the current phase;
  - in the build log, a phase label stays on one line ("Phase 0", not "Phase" over "0").
- [ ] CB-7 — **Continuous background.** A full-page capture at 390 px shows no horizontal band or
  seam in the page background.

## Preserved behavior
- [ ] PB-1 — From 1024 px wide (1024 and 1280 tested), every page keeps today's header and layout:
  same nav row, same trail, same cards. Before/after screenshots match apart from text that was
  below 12 px (CB-5).
- [ ] PB-2 — No page scrolls sideways at 320, 360, 390, 768, 1024 or 1280 px (0004/CB-1); `/switch`
  and `/switch/thanks` still show no site header or footer (0004/PB-4).
- [ ] PB-3 — Every destination and the language switch work at every width. Switching language
  keeps the reader on the same page.
- [ ] PB-4 — Without JavaScript, the menu still opens and every destination is reachable (0004/PB-5).
- [ ] PB-5 — Reader progress works as today: ticking a scroll, task or quest, XP, seals, badges and
  the outreach count. The reader's existing ticks survive the update.
- [ ] PB-6 — Content, copy and the order of everything on every page are unchanged. Spacing, size and
  position change; words do not. No new dependency: Tailwind classes plus the existing `app.css`.

## Out of scope
- New pages, sections, copy or features. Dark-mode colours stay as they are.
- A bottom tab bar, PWA or app-like gestures.
- Desktop (≥ 1024 px) redesign.
- Changing the markdown content itself; tables are fixed by styling, not rewritten.
- Images and fonts (Cinzel and Nunito stay).

## Definition of Done
- [ ] `scripts/check` green
- [ ] Independent review done; real findings fixed, noise rejected with written rationale
- [ ] Criterion ↔ evidence table complete for CB-* **and** PB-* (UI: before/after screenshots)
- [ ] Spec moved to `specs/done/` (immutable there)

## Self-critique (folded in above, with the decision each one needs)
1. *"Pinned header" could hide content behind it.* Folded in: it is one ≤ 64 px row, and in-page
   jumps such as `/#faz-5` and `#chapter-4` must land below it. VERIFY checks one anchor jump.
2. *Which screen widths get the menu, phones only or tablets too?* Decided: everything below
   1024 px. That is the same breakpoint 0004 moved to after review, so a tablet never gets a
   two-row nav.
3. *Is the 140 px table-cell floor tested on every table?* Yes, every table on `/docs`,
   `/docs/00-shopify-101` and one long scroll (`/docs/13-app-origin-stories`) at 320 and 390 px.
4. *Could the 44 px rows make the home map much longer?* The rows get taller but much wider, so
   titles wrap less. The page is expected to get shorter overall; VERIFY records the height before
   and after at 390 px (today 7655 px). Not a pass/fail criterion.
5. *Is the 12 px floor (CB-5) a desktop change?* It only touches the small uppercase labels and
   chips (from 11.2 or 10.4 px up to 12 px). PB-1 allows exactly that difference.
