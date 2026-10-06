# Spec 0001 — Public docs serve learning notes only (mini)

- Status: Shipped
- Mode: lite
- Plan: `specs/plans/0001-plan.md`
- Source: bootstrap open decision #1 (2026-10-07)
- Supersedes: — (no shipped spec covers `/docs`; brownfield)
- Approved by / on: Cemal Karabulaklı, 2026-10-07 — standing instruction for this change: "don't ask, take your recommendations, finish the complete feature"

## Intent
The `docs/` folder now holds two kinds of files: the public learning notes readers come for, and
the project's engineering rules (architecture, conventions, domain, git, security, testing). Today
the site publishes every markdown file in that folder, so the next deploy would put internal rules
on the public site, in search results and in the AI-crawler feeds. Only reader-facing notes may be
published.

## Changed behavior
A file in the docs folder is **published** only if its name is `NN-<name>.md` (exactly two digits,
then a dash), `README.md`, or `LEARNING.md` (exact case). Every other file is unpublished.
Observed before: `scratchpad/evidence-0001/probe-before.txt`, `docs-before.png`.
- [x] CB-1 — An unpublished file is not reachable: `/docs/<slug>` and `/docs/<slug>.md` answer 404
  (checked for `architecture`, `conventions`, `domain`, `git`, `security`, `testing`; today 200).
- [x] CB-2 — An unpublished file appears nowhere: not in the `/docs` list, the home page,
  `sitemap.xml`, `llms.txt`, or `llms-full.txt` (today: 6 list links, 6 sitemap URLs, 6 `llms.txt`
  links, 6 `llms-full.txt` sections).
- [x] CB-3 — Boundaries of the rule: `00-x.md`, `13-x.md`, `README.md`, `LEARNING.md` are published;
  `architecture.md`, `notes.md`, `5-x.md`, `100-x.md`, `ab-x.md`, `readme.md`, `00-x.txt` are not.
- [x] CB-4 — The rule is part of the domain language: `docs/domain.md` states it as a business rule.

## Preserved behavior
Written from observation of the build before the change (`probe-before.txt`).
- [x] PB-1 — All 14 learning notes (`00-…` to `13-…`) are still listed on `/docs`, in the same map
  order, and each answers 200 as a page and as `.md`.
- [x] PB-2 — The README intro is still shown on `/docs` (below the list, as before; not a list item); `/docs/learning` and
  `/docs/readme` still answer 200.
- [x] PB-3 — Renamed Turkish doc slugs still redirect 301 (e.g. `/docs/01-eticaret-terimleri`).
- [x] PB-4 — Journal entries are unaffected: every published entry is still listed, reachable, and in
  the feed and sitemap — the rule applies to the docs folder only.
- [x] PB-5 — `sitemap.xml` and `llms-full.txt` still contain every learning note.

## Out of scope
- Moving or renaming any file; changing any URL.
- Content of the learning notes or the engineering docs.
- Serving files from `docs/` subfolders (never served; unchanged).
- The uncommitted roadmap board work in the main checkout.

## Self-critique (folded in)
- "Two digits" or "any digits"? → exactly two (`00`–`99`) matches the existing naming and the
  glossary (`docs/NN-*.md`); a 100th note is far away and would be a conscious change. Folded into CB-3.
- Case of `README`/`LEARNING`? → exact case, as the files exist; a lowercase `readme.md` is not
  published. Folded into CB-3.
- Is 404 right for an unpublished file, or a redirect to `/docs`? → 404: the page does not exist
  publicly; a redirect would imply it moved. Folded into CB-1.

## Definition of Done
- [x] `scripts/check` green
- [x] Independent review done; real findings fixed, noise rejected with written rationale
- [x] Criterion ↔ evidence table complete for CB-* **and** PB-* (UI: before/after screenshots)
- [x] Spec moved to `specs/done/` (immutable there)

## Ship record (2026-10-07)
- Review: clean; finding 1 (wiring unguarded) fixed in `bb5a4c7` + re-review nit in the next commit;
  finding 2 (`docs/testing.md` says BRs are tested at domain/use-case level) rejected as noise for
  this change — the plan placed BR-11 in infrastructure on purpose; follow-up docs change.
- Verify: all CB-1…CB-4 and PB-1…PB-5 PASS (independent QA, probe + screenshots before/after).
  PB-2 wording corrected from "heads /docs" to the observed position (intro sits below the list).
- Side effects observed, accepted: `11-brand-and-scale` no longer shows "Architecture →" as next
  scroll; the reading counter drops from 21 to 15 items.
