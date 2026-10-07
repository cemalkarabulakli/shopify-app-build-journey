# ADR 0004 — CI runs the check contract on every PR

- Status: Accepted
- Date: 2026-10-07

## Context
At bootstrap (2026-10-07), CI was left out on purpose: `scripts/check` ran locally before merge,
and `docs/architecture.md` listed CI as out of scope. Since then:
- two features (specs 0001, 0002) and a bug fix (BUG-001) have shipped through PRs that are merged
  by the owner, a solo founder, on the strength of local evidence;
- every push to `main` deploys to production (Coolify), and a red `main` takes the site down;
- local-only generated state (a stray `src/.svelte-kit`) has already made the local check fail
  falsely once, during spec 0001 (fixed in PRs #6 and #7).

A second, independent run of the same contract costs nothing on a public repo. Without it, a red
PR merges as quietly as a green one.

## Decision
GitHub Actions runs `./scripts/doctor --strict` and `./scripts/check` on every pull request and on
every push to `main`, with read-only permissions. The `check` job is meant to be a required status
check on `main`, a repository setting the owner applies separately. Admins keep a bypass, because
the content carve-out (`docs/git.md`) pushes straight to `main`.

## Consequences
- **Gains:**
  - A red PR is visible as red. Once the setting is applied, it can only merge through an explicit
    admin bypass, never by accident.
  - The check runs on a clean Linux machine with a clean `npm ci`, which catches "works on my
    machine" (case sensitivity, a missing file, a lockfile drift).
  - Spec/plan gate violations fail in CI (`doctor --strict`), not only as local warnings.
- **Costs:**
  - About 1–2 minutes of waiting per PR. The first run took about 36 seconds.
  - For the solo admin, the required status adds friction, not a hard block: GitHub's admin bypass
    covers merges as well as pushes.
  - One more file to maintain, plus action versions to bump.
  - CI does not gate deploys: Coolify still deploys every push to `main`, including content
    commits, and those are checked only after they land.
  - A red `content:` push is caught after it is live, not before.

## Alternatives considered
- **Local-only, as decided at bootstrap.** It costs nothing extra and was fine while the owner was
  the only reviewer. It lost because PR review is now done by independent agents whose "green"
  should not rest on the builder's machine, and because `main` is production.
- **CI that also gates deploys** (Coolify deploys only after CI passes). It is the stronger
  guarantee, but it needs a webhook or API change in Coolify and slows content publishing.
  Revisit if a red deploy ever happens.

## Revisit triggers
- A broken deploy that CI would have caught on `main`, which would mean moving to gating deploys.
- CI time per PR above 5 minutes.
- A second contributor joins, which would remove the admin bypass.
