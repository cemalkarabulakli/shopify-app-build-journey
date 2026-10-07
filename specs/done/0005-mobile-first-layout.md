# Spec 0005 — Mobile-first layout (mini)

- Status: Shipped
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
- [x] CB-1 — **Compact header below desktop.** Below 1024 px, the header is one row no taller than
  64 px. It holds the logo, the current language switch and a menu button, and stays pinned to the
  top of the screen while the page scrolls.
  The menu opens a panel listing all 9 destinations (Map, Journal, Library, Merchants, Traveller,
  VIP, Roadmap, Account, RSS) with their icons, and marks the current page. Each menu row is at least
  44 px tall. The panel closes when a destination is chosen.
- [ ] CB-2 *(NOT MET at ship, see Ship record)* — **No squeezed text.** At 320, 360 and 390 px, in en and tr, on all 13 pages, no text
  block outside a table is narrower than half the screen while running longer than 3.5 lines. The
  scan's `squeezed` count without table cells is 0; today it is 5–19 on `/`.
- [x] CB-3 — **Tables stay readable.** On a phone, no table cell in a scroll, entry or the library
  intro is narrower than 140 px. A table wider than its column scrolls sideways inside its own box;
  the page itself never scrolls sideways.
- [x] CB-4 — **Thumb-sized controls.** At phone widths, every control outside running text has a
  touch area of at least 44 × 44 px. That covers the menu button, menu rows, language switch, scroll,
  task and quest rows with their checkboxes, the "read" arrow, buttons, toggles and form fields.
  Links inside a sentence or paragraph are exempt. The scan's small-tap count, with inline links
  excluded, is 0.
- [x] CB-5 — **No tiny text.** No text on any page is smaller than 12 px at any width; today the
  smallest is 10.4 px. The scan's `tiny` count is 0.
- [x] CB-6 — **The home trail fits a phone.** At phone widths:
  - the trail line and its waypoints take no more than 48 px at the left edge;
  - the line never crosses text in a chapter banner;
  - the "you are here" dragon stays visible next to the current phase;
  - in the build log, a phase label stays on one line ("Phase 0", not "Phase" over "0").
- [ ] CB-7 *(NOT MET at ship, see Ship record)* — **Continuous background.** A full-page capture at 390 px shows no horizontal band or
  seam in the page background.

## Preserved behavior
- [x] PB-1 — From 1024 px wide (1024 and 1280 tested), every page keeps today's header and layout:
  same nav row, same trail, same cards. Before/after screenshots match apart from text that was
  below 12 px (CB-5).
- [ ] PB-2 *(NOT MET on 12 doc-page rows at ship, see Ship record)* — No page scrolls sideways at 320, 360, 390, 768, 1024 or 1280 px (0004/CB-1); `/switch`
  and `/switch/thanks` still show no site header or footer (0004/PB-4).
- [x] PB-3 — Every destination and the language switch work at every width. Switching language
  keeps the reader on the same page.
- [x] PB-4 — Without JavaScript, the menu still opens and every destination is reachable (0004/PB-5).
- [x] PB-5 — Reader progress works as today: ticking a scroll, task or quest, XP, seals, badges and
  the outreach count. The reader's existing ticks survive the update.
- [x] PB-6 — Content, copy and the order of everything on every page are unchanged. Spacing, size and
  position change; words do not. No new dependency: Tailwind classes plus the existing `app.css`.

## Out of scope
- New pages, sections, copy or features. Dark-mode colours stay as they are.
- A bottom tab bar, PWA or app-like gestures.
- Desktop (≥ 1024 px) redesign.
- Changing the markdown content itself; tables are fixed by styling, not rewritten.
- Images and fonts (Cinzel and Nunito stay).

## Definition of Done
- [x] `scripts/check` green
- [x] Independent review done; real findings fixed, noise rejected with written rationale
- [x] Criterion ↔ evidence table complete for CB-* **and** PB-* (UI: before/after screenshots);
  3 criteria FAIL and are recorded below, and shipping with them was the owner's decision
- [x] Spec moved to `specs/done/` (immutable there)

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

## Ship record (2026-10-07)
**Shipped by owner decision with 3 criteria not met.** The fixes are a follow-up change, not this
spec. Evidence: independent QA, `scratchpad/0005/verify/`. BEFORE is `main` at 4a78450 and AFTER
is 8ba0e73, both local, sharing one throwaway Neon branch seeded with 3 roadmap requests.

**Review:**
- First review: 12 findings. Fixed: #1 (declined summary triangle), #2 (sealed-row alignment),
  #3 (Escape focus), #9 (task row `tap`), #11 (`tap` comment).
- Written down: #10 (build differences, in the plan) and #7 (one line in `docs/testing.md`).
- Moved into VERIFY: #4, #5, #6. Rejected as noise: #8 (it is the CB-2 trade-off) and #12 (PB-6
  compares rendered text).
- Re-review: 2 findings, both fixed (svelte-check back to 0 warnings; plan rows for the fixes).

**Verify — PASS:**
- **CB-1:** header 57 px on every page at 320–1023 px, en+tr, pinned after scrolling 2000 px.
  The menu has 9 rows of 44 px, one marked current, and closes after navigating. Before: 216–276 px.
- **CB-3:** narrowest table cell 144 px (before 59–105).
- **CB-4:** small controls 0 at every phone width (before 11–42 per page).
- **CB-5:** no text below 12 px at any width (before as small as 9.6 px).
- **CB-6:** rail 36 px, no banner text over the line, phase labels on one line.
- **PB-1:** 0 x/width differences at 1024/1280 px; only heights moved, from the 12 px floor.
- **PB-3, PB-4, PB-5, PB-6:** pass. XP, seals and the outreach count are identical before and
  after; ticking a quest gives +150.
- **Anchors:** `/#faz-5` lands below the bar.
- **Boundary:** 1023 px gets the menu, 1024 px gets the desktop nav.
- **Review fixes #1 and #3:** pass.
- **Home page:** 19% shorter on phones (7655 → 6180 px at 390 px).

**Verify — NOT MET (follow-up change):**
1. **CB-2.** The previous/next links under a scroll are capped at 40% of the row, so long titles
   wrap to 6 lines at about 100 px wide. This affects 12 of 15 doc pages and existed before.
   The builder's scan missed it because those pages are sealed for a fresh reader.
2. **CB-7.** Full-page captures still show the band at y = 800, the same as before. The fixed
   `body::before` layer is still one viewport tall.
3. **PB-2.** Unbreakable strings in the markdown (URLs, `code`, slash-joined words) make 12
   doc-page rows scroll sideways, up to 687 px at 320 px on `/docs/11`. It was worse before
   (up to 699) and lies outside the spec's 14-URL sample, but the rule says "no page".

**Accepted gaps:**
- Safari/WebKit is not tested (the install was not approved).
- Signed-in, VIP and admin controls are checked from the diff only.
- The RSS menu row has no icon, as on desktop.
