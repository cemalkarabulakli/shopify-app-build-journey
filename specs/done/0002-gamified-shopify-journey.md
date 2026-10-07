# Spec 0002 — Gamified Shopify business journey

- Status: Shipped
- Mode: lite
- Plan: `specs/plans/0002-plan.md`

## Intent
Readers who want to build a Shopify business, by way of an app, should experience the site as a
journey they *play*, not a library they read. They learn the Shopify 101 basics, build their first
basic apps, study and contact successful merchants to learn the ecosystem, and follow our own app
being built. Today the map rewards only reading scrolls and ticking one box per phase, so a reader
has nothing to *do*. Success means:
- every phase offers concrete real-world quests that earn XP;
- a Merchants section lets readers study real, successful merchants and reach out to them;
- the four parts of the journey are visible on the map.

Business gate: red verdict (no named buyer); the owner chose to build it in full.

Deliberately not done:
- the site never sends email;
- no accounts or sync for progress;
- no leaderboards;
- the app itself is built in its own repository, not here.

## Requirements

**Decisions folded in.** Each one is the Analyst's recommendation; the owner can change it at spec
approval.
- **D1 — "Basic apps" means building them.** The reader builds their first basic Shopify apps,
  because the site's readers are app builders and phase 1 is "First running app". The alternative,
  "installing a merchant's essential apps", would be a different audience.
- **D2 — "Develop our app" means following its progress.** Inside this site it means showing where
  our app's build is and linking its journal entries. Building the app is out of scope here.
- **D3 — "Send mail" goes through the reader's own email app**, addressed to the merchant's
  *published* business contact. The site sends nothing and stores nothing on a server, so there is
  no spam liability, no sender-domain risk, and no personal data to process.
- **D4 — Quests are bonus XP and never seal stages.** The unlock rule stays "read the scrolls, tick
  the phase's 'done when'", so no existing reader's progress is re-locked.

**Requirements**
- **R1 Chapters.** The map groups the 10 phases into four chapters, in this order:
  1. *Learn Shopify* (phase 0)
  2. *Build basic apps* (phases 1–4)
  3. *Merchants & ecosystem* (phase 5, plus the Merchants section)
  4. *Our app* (phases 6–9)

  Each chapter shows its title and the reader's quest progress inside it.
- **R2 Quests.** Every phase has 1–3 quests. A quest is a concrete action phrased as a task, for
  example "Create a Shopify Partner account" or "Scaffold an app with Shopify CLI and open it in a
  dev store".
  - The reader ticks a quest when it's done, and can untick it.
  - A ticked quest is worth 150 XP. Unticking removes those XP.
  - Quests never seal or unseal phases or scrolls (D4).
- **R3 XP and level.** Total XP is what readers earn today (100 per scroll read, 500 per phase
  completed) plus quest XP. Level thresholds are unchanged. The XP bar also shows quests done out
  of quests total.
- **R4 Merchants section.** A page lists curated successful Shopify merchants. Each card shows:
  - name and what they sell;
  - one notable fact with a figure, and a link to that figure's public source;
  - a link to their store;
  - when one exists, a link to the scroll that tells their story;
  - a reach-out action (R5).

  Merchants appear in the curated order. The page is reachable from the main navigation and from
  chapter 3 on the map.
- **R5 Reach out.**
  - If the merchant has a published business email, "Reach out" opens the reader's own email app,
    addressed to it, with an editable English template: who I am, what I learned from your story,
    one specific question.
  - If not, "Reach out" opens the merchant's public contact page in a new tab.
  - Either way, the reader can mark "I reached out", and undo it.
- **R6 Outreach quest.** Chapter 3 has the quest "Reach out to 3 merchants". It completes on its
  own when the reader has marked 3 different merchants, and reopens if they unmark below 3.
- **R7 Our app.** Chapter 4 says plainly which phase our app's build is in now (the phase marked
  "next") and lists the journal entries attached to each phase, as the map already does per phase.
- **R8 Progress.** Progress is kept per browser, as today: scrolls read, phases done, quests,
  merchants reached out to. Existing readers keep their scrolls read and phases done, and land on
  the same unlocked state.
- **R9 Languages.** Every new label, quest and merchant blurb exists in English and Turkish. The
  email template is English, since merchants are addressed in English.

## Constraints & out of scope
- **Constraints**
  - No new runtime dependency.
  - No server-side storage of reader progress or outreach.
  - The site sends no email.
  - A merchant's email is listed only if the merchant publishes it for business inquiries; otherwise
    only a public contact page is listed.
  - Every merchant figure has a public source link. Seed merchants come from stories already sourced
    in the scrolls (`10-case-studies`, `11-brand-and-scale`, `13-app-origin-stories`), with at least
    8 merchants.
- **Out of scope**
  - Accounts or progress sync, leaderboards, badges, and analytics.
  - Building the actual Shopify app (D2).
  - Automated discovery or scraping of merchants.
  - Writing new scrolls.
  - Changing the unlock rule.

## Acceptance criteria
- [x] AC-1 — The map shows four chapters, in R1 order, each with its title, its phases, and
  "quests done / quests total" for that chapter.
- [x] AC-2 — Every one of the 10 phases shows 1–3 quests, in the reader's language.
- [x] AC-3 — Ticking a quest adds exactly 150 XP and shows the XP toast. Unticking removes exactly
  150 XP. A quest cannot count twice.
- [x] AC-4 — Quests never change sealing. With every quest ticked and nothing read, only phase 0
  and its first scroll are open. With no quest ticked, a phase still opens when the previous phase
  is complete.
- [x] AC-5 — Total XP = 100 × scrolls read + 500 × phases done + 150 × quests done. The level and
  "to next level" figures follow the existing thresholds. The XP bar shows quests done / total.
- [x] AC-6 — The Merchants page lists at least 8 merchants in curated order. Each card has a name,
  what they sell, a notable fact with a figure, a working source link, and a store link. A
  "story" link appears only when the merchant appears in a scroll.
- [x] AC-7 — The Merchants page is linked from the main navigation and from chapter 3. It works in
  English and Turkish.
- [x] AC-8 — For a merchant with a published business email, "Reach out" opens the reader's email
  app addressed to that email, with a prefilled subject and the template body. For a merchant
  without one, it opens their contact page in a new tab. The site makes no network request when
  this happens.
- [x] AC-9 — "I reached out" can be marked and unmarked per merchant, and survives a page reload in
  the same browser.
- [x] AC-10 — "Reach out to 3 merchants" is complete exactly when 3 or more different merchants are
  marked: it completes on the 3rd mark and reopens on unmarking to 2. Its XP follows AC-3.
- [x] AC-11 — Chapter 4 names the phase our app is in now and lists each phase's journal entries.
  When a phase has no entries, it shows no empty list.
- [x] AC-12 — An existing reader (scrolls read and phases done stored before this change) sees the
  same scrolls read, the same phases done, the same open phases, and XP at least as high as before.
- [x] AC-13 — With browser storage unavailable (private mode), every page still renders and works
  for the session, and nothing crashes.
- [x] AC-14 — Merchant data is rejected at build or test time when a merchant lacks a source link,
  has an email and a contact page that are both missing, or has duplicate ids.

## Self-critique (gaps found, with recommendations — approve or change at the gate)
- **Quest wording and the exact list per phase.** Recommendation: the plan proposes the concrete
  quests per phase in English and Turkish, and they are reviewed in the plan gate. This is content,
  not behavior.
- **Which merchants, and where the emails come from.** Recommendation: the plan lists the 8+ seed
  merchants with sources. An email is included only when it is visible on the merchant's own
  site's contact or press page, with that page URL recorded. Otherwise the card shows the contact
  page only.
- **Is 150 XP per quest balanced?** 10 phases × about 2 quests ≈ 3,000 XP, against 1,500 from
  scrolls and 5,000 from phases. That lets quests move a reader roughly one or two levels.
  Recommendation: 150.
- **Should the outreach quest require proof (a reply)?** Recommendation: no. It is self-reported
  like every other tick; the game rewards the action, not the merchant's answer.

## Definition of Done
- [x] Every acceptance criterion mapped to proof (test or reproducible observation)
- [x] `scripts/check` green
- [x] Independent review done; real findings fixed, noise rejected with written rationale
- [x] Docs / ADRs updated if behavior or architecture changed
- [x] Spec moved to `specs/done/` (it becomes immutable there)

## Scorecard (fill at ship — honest numbers make the process improvable)
| Metric | Value |
|---|---|
| Spec revisions | 0 (approved as first drafted; wording only reflowed) |
| Fix rounds | 1 (4 fixes, then a clean re-review) |
| Review findings: real / noise | 4 real (outreach count, toast XP, email header injection, quest-id test) / 3 noise (BrainGain scroll wording → separate content fix, domain error style, map degradation nit); 1 investigated and confirmed (MR MARVIS email) |
| Regressions introduced | 0 (existing reader keeps 800 XP and the same open phases) |
| Bugs escaped to production | 0 at ship |

## Ship record (2026-10-07)
- Review: 7 findings. Real and fixed: outreach counted against the current catalog on every page;
  the toast shows +150 XP; the email rule now blocks mailto header injection; quest ids are
  well-formed. The re-review was clean.
- Verify: AC-1…AC-14 all PASS (independent QA, Playwright, en + tr, browser storage blocked).
  The MR MARVIS email was confirmed in a real browser.
- Content calls at ship (owner): keep hello@mrmarvis.com (general contact) and press@gruns.co (the
  footer "Press Inquiries" link).
- Follow-ups:
  - Scroll `10-case-studies` describes BrainGain as "sports supplements", but the case study says
    home fitness equipment. This is a content fix.
  - The XP counter animation takes about 1.5 s instead of 0.6 s. Pre-existing and cosmetic.
