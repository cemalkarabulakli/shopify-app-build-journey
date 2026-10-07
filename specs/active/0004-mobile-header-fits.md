# Spec 0004 — The header fits a phone (mini)

- Status: Approved
- Mode: lite
- Plan: `specs/plans/0004-plan.md`
- Source: VERIFY 0003 re-verify 2 (2026-10-07) — `scratchpad/evidence-0003/recheck2-overflow*.txt`
- Supersedes: — (no shipped spec covers the header)

## Intent
On a phone, every page of the site scrolls sideways. The header's navigation is one row of 9 links,
and it is 675 px wide (687 px in Turkish) on a 390 px screen. Readers on a phone can't see VIP,
Roadmap, Account or RSS without dragging the page. The header must fit the screen and keep every
destination visible.

## Changed behavior
Observed before: `scratchpad/evidence-0004/before.txt` and `screens/before-*.png`.
At 320 and 390 px, 5–6 nav links are off-screen and the page is 675/687 px wide.
- [ ] CB-1 — At viewport widths 320, 390 and 768 px, in English and Turkish, the page is never wider
  than the viewport on `/`, `/docs`, `/merchants` and `/roadmap`.
- [ ] CB-2 — At those widths, all 9 navigation destinations (Map, Journal, Library, Merchants,
  Traveller, VIP, Roadmap, Account, RSS) are fully visible on screen without scrolling sideways,
  and each can be tapped. None is hidden behind a menu.
- [ ] CB-3 — On a phone the navigation may take more than one row, and the header grows no
  more than it needs to: at 390 px it is at most 260 px tall in both languages (172 px before).

## Preserved behavior
Written from the before-capture.
- [ ] PB-1 — At 1280 px the header looks as it does today: logo, one row of 9 nav links, and the
  language switch. Before/after screenshots compared.
- [ ] PB-2 — The nav order, icons, labels and active-page highlight are unchanged in both languages.
- [ ] PB-3 — The language switch (EN / TR) is visible and works at every width.
- [ ] PB-4 — `/switch` still shows no site header (bare layout) at every width.
- [ ] PB-5 — No navigation needs JavaScript: the header works with scripts disabled.

## Out of scope
- A hamburger or drawer menu (it would hide destinations; CB-2).
- Reordering, renaming or removing nav links.
- Wide content inside pages other than the header (e.g. tables in scrolls).
- The footer.

## Self-critique (folded in)
- **Wrap the links, or scroll the nav strip sideways inside the header?** → Wrap. A scrolling strip
  keeps the page width right, but still hides links off-screen, which CB-2 forbids.
- **Why 260 px for the header height?** Two rows of nav at 390 px is roughly 172 + ~70 px. 260 leaves
  room for Turkish's longer labels, without allowing a header that pushes the page below the fold.
- **Why test 768?** It fits today, and it guards against a fix that only works at phone widths.

## Definition of Done
- [ ] `scripts/check` green
- [ ] Independent review done; real findings fixed, noise rejected with written rationale
- [ ] Criterion ↔ evidence table complete for CB-* **and** PB-* (UI: before/after screenshots)
- [ ] Spec moved to `specs/done/` (immutable there)
