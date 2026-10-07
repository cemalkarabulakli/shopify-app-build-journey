# Git

Solo project; `main` is production (Coolify deploys every push). Remote: GitHub (public).

## Branching
- `feature/<spec-no>-<short-name>` — **no branch without a spec.**
- Fixes: `fix/<report-id>-<short-name>` (bug fixes carry a report, not a spec number);
  incidents: `incident/<date>-<short-name>`; trivial changes: `trivial/<short-name>` (see below).

## Commits
- Conventional Commits, with a plan reference: `feat(roadmap): weighted votes [plan 0001/3]`.
- Agent commits follow the same standard: the agent writes the message, the human approves.
- Content publishes use the `content:` type (see Trivial changes).

## Forbidden
- Direct commits to the default branch — except the content carve-out below.
- Force push, history rewriting on shared branches. Undo = `git revert` (see recovery R-11).

## Trivial changes
<!-- Set at bootstrap. Applies only to requests the change-request triage rubric
     (workflows/change-request.md) classifies as TRIVIAL: no acceptance criterion changes, no shared code. -->
- Policy: **(1) PR + one reviewer, no spec.** Branch `trivial/<short-name>`, PR on GitHub, reviewed
  by the independent reviewer subagent (solo project — it is the "one reviewer"), self-merge.
- Always: one narrow commit, `scripts/check` green. A second file or a new test means re-triage.
- **Content carve-out:** journal entries `content/posts/*.md` and learning notes `docs/NN-*.md`
  are publishing, not code: they may be committed straight to `main` as `content: <title>`,
  `scripts/check` green first. Not content (spec'd as usual): `content/*-catalog.json` (Paddle price
  ids), `content/path.*.json` (drives the Stage map), and the ANEW docs in `docs/`.

## Pull requests
- `scripts/check` green locally **and** the `check` job green in CI (ADR 0004), REVIEW and
  VERIFY reports linked in the PR, then squash-merge. Self-merge is allowed once all are green.
- Content commits pushed straight to `main` are checked by CI after they land, so run
  `scripts/check` locally first.
- PR body ends with the spec number and the criterion ↔ evidence table from VERIFY.
