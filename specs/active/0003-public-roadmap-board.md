# Spec 0003 — Public roadmap board (adoption)

- Status: Approved
- Mode: lite
- Plan: `specs/plans/0003-plan.md`

## Intent
Readers and paying members should see what is being built next, and steer it. `/roadmap` is a
public board of feature requests:
- anyone can read it;
- anyone signed in can vote, with a member's vote weighing more, since that is part of what the
  VIP tier sells;
- only paying members can post;
- only the builder can move requests, and a public note explains each move.

The code already exists, uncommitted, written before the spec-first workflow. This spec adopts it as
it behaves today, so it can be reviewed, verified and shipped instead of being hand-merged on every
release. Success means the board is live with the behavior below, and nothing in it is new scope.

**Business gate.** No buyer was named for the board itself. The owner chose to adopt it because it is
already built; its value is as a VIP perk.

## Requirements
**Decisions folded in.** Each is the Analyst's recommendation; the owner can change any of them at
approval.
- **D1 — Adoption, not redesign.** Requirements describe the observed behavior of the existing
  code. Any change found during review is triaged, not added silently.
- **D2 — The unused `domain/project` code is left out.** It sits in the same uncommitted batch, but
  nothing references it. It stays out of this feature; the owner keeps it locally or drops it.
- **D3 — Turkish readers see the board in English, with a notice saying so.** This is how the code
  works today. Translating the board would be a separate change.

**Requirements**
- **R1 Reading.** `/roadmap` shows every feature request to everyone, signed in or not, in five
  columns in this order: building, planned, considering, shipped, declined. Within building,
  planned and considering, requests are ranked by score (sum of vote weights), with ties broken by
  the newest first. Shipped reads as a changelog, newest shipped first. Declined requests stay
  visible with their note.
- **R2 Voting.**
  - Anyone signed in can vote on an open request (considering, planned or building); clicking again
    takes the vote back.
  - A person has at most one vote per request.
  - A vote weighs 3 if the voter is a paying member at that moment, and 1 otherwise, and keeps that
    weight.
  - Shipped and declined requests do not accept votes.
  - Each request shows its score, its number of voters and how many of those are members, so the
    weighting is visible.
- **R3 Posting.**
  - Only a paying member can post a request.
  - A request needs a title of 4–120 characters and a body (the problem, in their own words) of
    10–2000 characters.
  - A member can have at most 5 open requests at a time.
  - A new request starts as "considering", already carries its author's member vote, and records
    the author's tier at the time of posting.
- **R4 Moving requests.**
  - Only an admin (an email listed in `ADMIN_EMAILS`) can change a request's status and write its
    public note (at most 500 characters).
  - Moving a request to shipped records the date; moving it out of shipped clears it.
  - An empty `ADMIN_EMAILS` means no admins at all.
- **R5 Signed-out actions.** A signed-out visitor who tries to vote or post is sent to sign in and
  then back to `/roadmap`.
- **R6 Safety.** Request bodies and notes are always shown as plain text, never as HTML.
- **R7 Degraded mode.**
  - If the board's storage is unavailable, `/roadmap` still renders, with a clear "board
    unavailable" message instead of an error page.
  - If the membership lookup fails, the visitor is treated as a non-member for that request.
- **R8 Navigation.** The main navigation links to the board in both languages (D3).

## Constraints & out of scope
- **Constraints**
  - No new runtime dependency.
  - The board's tables (`scripts/roadmap-schema.sql`, idempotent) must exist in the production
    database **before** the code is deployed. That is a production change, approved at ship.
  - `ADMIN_EMAILS` must be set in production for anyone to moderate.
- **Out of scope**
  - `domain/project` (D2).
  - Translating the board (D3).
  - Notifying voters by email.
  - Comments.
  - Merging duplicate requests.
  - Rate limiting beyond sign-in plus the 5-open cap.
  - Showing who voted.

## Acceptance criteria
- [ ] AC-1 — A signed-out visitor sees `/roadmap` with all five columns in R1 order, and every
  request's title, body, score, voter count and member-voter count, without signing in.
- [ ] AC-2 — Within building, planned and considering, a higher score ranks first, and equal
  scores rank the newer request first. Shipped lists the most recently shipped first.
- [ ] AC-3 — A signed-in non-member votes on an open request: the score rises by 1 and the voter
  count by 1. Clicking again removes the vote, and both numbers go back.
- [ ] AC-4 — A signed-in member's vote raises the score by 3 and the member-voter count by 1.
- [ ] AC-5 — Voting on a shipped or declined request is refused ("closed"), and so is voting on a
  request that doesn't exist ("not-found"). Nothing changes.
- [ ] AC-6 — A signed-out visitor who submits a vote or a request is redirected to sign in, with a
  return to `/roadmap`.
- [ ] AC-7 — A member posts a valid request: it appears under considering with score 3, 1 voter,
  1 member voter, and the author's tier recorded.
- [ ] AC-8 — Posting is refused for a non-member ("not-member"); for title lengths 3 and 121; for
  body lengths 9 and 2001; and for a member who already has 5 open requests ("too-many-open"). A
  refused form keeps what the person typed. Title lengths 4 and 120 and body lengths 10 and 2000
  are accepted.
- [ ] AC-9 — An admin moves a request to shipped with a note: it appears at the top of shipped
  with the note and its ship date. Moving it back to planned clears the date. A note of 501
  characters is refused ("long-note").
- [ ] AC-10 — A non-admin's status change is refused ("not-admin"), even when crafted by hand. With
  `ADMIN_EMAILS` empty, everyone is refused.
- [ ] AC-11 — A body or note containing `<script>` or other HTML is displayed as literal text.
- [ ] AC-12 — With the database unreachable, `/roadmap` answers 200 with the "board unavailable"
  message, and the rest of the site is unaffected.
- [ ] AC-13 — The navigation shows "Roadmap" / "Yol haritası" in both languages. The Turkish page
  shows the English-only notice.

## Self-critique (gaps found, with recommendations — approve or change at the gate)
- **Is a member vote weighted at the moment of voting or live?** The code fixes the weight at
  voting time, so a lapsed member's old votes keep weight 3. Recommendation: keep it (BR-7 already
  says "fixed at the moment of voting").
- **Is there abuse beyond sign-in?** Sign-in requires a working email, plus the 5-open cap.
  Recommendation: enough for the current traffic; revisit only if spam appears.
- **Can it be tested against a real database?** `PgFeatureBoard` is not covered by
  `scripts/check`. Recommendation: in VERIFY, run the board against a disposable Neon branch with
  the schema applied, not production.

## Definition of Done
- [ ] Every acceptance criterion mapped to proof (test or reproducible observation)
- [ ] `scripts/check` green
- [ ] Independent review done; real findings fixed, noise rejected with written rationale
- [ ] Docs / ADRs updated if behavior or architecture changed
- [ ] Spec moved to `specs/done/` (it becomes immutable there)

## Scorecard (fill at ship — honest numbers make the process improvable)
| Metric | Value |
|---|---|
| Spec revisions | |
| Fix rounds | |
| Review findings: real / noise | |
| Regressions introduced | |
| Bugs escaped to production | |
