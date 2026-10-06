# AGENTS.md — Project Rules

**Shopify App Build Journey** — build-in-public site for a Shopify app: free journal + learning docs,
paid VIP membership (Paddle), public roadmap board, founding-offer landings (`/switch`). Goal: turn
readers into paying members and merchants. SvelteKit 2 · Svelte 5 · TS strict · Postgres · Paddle ·
Coolify — **every push to `main` deploys to production.**

## Operating mode

**Mode: lite** — solo founder, low ceremony (`workflows/README.md`); every workflow honors its gates.
**Start work** with `/new-feature` in lite (it chains the segments and asks at each gate) or with
`/analyze` in strict (one segment per role). Segment commands always stop (`workflows/segments.md`).
**Language: chat=en · docs=en** — protocol fields stay English (`docs/conventions.md`).

## Invariant rules (these survive bootstrap — never delete or weaken them)

1. **No spec, no code.** Every piece of work starts as a spec in `specs/active/` (from `specs/TEMPLATE.md`).
2. **Plan before build.** A human approves the plan before any code is written.
3. **The producer never verifies its own work.** Review and QA run in a separate session or a read-only subagent, working from files (diff + spec), never from the builder's chat.
4. **Evidence over claims.** "Done" requires `scripts/check` green and every acceptance criterion mapped to proof. Never claim completion without showing evidence.
5. **Tests are protected.** Weakening asserts, deleting or skipping tests to get to green is forbidden — always.
6. **Proposal rule.** Every question, option, or finding comes with your own recommendation and rationale. The human decides; nothing is applied without approval.
7. **Shipped specs are immutable.** Files under `specs/done/` are never edited.
8. **Uncertainty is surfaced, not assumed.** On ambiguity or a docs/code conflict: stop and use the matching recovery ramp (`prompts/recovery/`).

## Where things live

| What | Where |
|---|---|
| Architecture, layers, forbidden deps F-1…F-5 | `docs/architecture.md` (F-1…F-4 enforced by `scripts/arch-check`) |
| Domain language & business rules BR-n | `docs/domain.md` |
| Coding conventions (data, errors, naming, i18n) | `docs/conventions.md` |
| Testing · Security · Git (incl. content carve-out) | `docs/testing.md` · `docs/security.md` · `docs/git.md` |
| Decisions (ADRs) · Roles | `docs/decisions/` · `docs/roles/` |
| Specs & plans | `specs/active/` · `specs/plans/` · shipped → `specs/done/` |
| Processes & gates · Prompts & recovery ramps | `workflows/` · `prompts/` |
| The single verification command | `scripts/check` (arch → typecheck → test → build) |
| Learning notes (site content, not rules) | `docs/NN-*.md` · journal entries in `content/posts/` |
