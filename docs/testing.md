# Testing

## The contract
- Every acceptance criterion maps to at least one test (criterion ↔ test map lives in the plan).
- Tests assert **behavior**, not implementation details or mere status codes.
- The whole suite runs inside `scripts/check` — one command, everywhere.

`scripts/check` = `arch` (scripts/arch-check) → `typecheck` (svelte-check) → `test` (vitest) →
`build` (vite build). Build is in the contract because a push to `main` deploys.

## Frameworks & layout
- **Vitest 4**, node environment, `src/**/*.test.ts`. Tests live in a `__tests__/` folder next to
  the code: `<Unit>.test.ts`.
- Use cases are tested against `InMemory*` fakes of their ports (`application/__tests__/`) — no
  mocking library, no database, no network.
- File-system adapters are tested against a temp dir (`mkdtemp`).
- **Outside `scripts/check`** (they need a database, Chrome or sandbox secrets):
  - `Pg*` adapters — exercised manually against a Neon branch when their SQL changes.
  - Paddle checkout — `npm run e2e:checkout` against the sandbox (see README "Sandbox
    end-to-end test"); screenshots land in `.e2e/`.

## What must be tested
- Every business rule BR-n in `docs/domain.md`, at the domain or use-case level.
- Every entity invariant (`create()` rejections) and status transition (`withX()`).
- Every `*Refused` code a use case can raise.
- Any change touching billing, webhooks, access or checkout: the unit tests **plus** evidence from
  the sandbox e2e run (and a replayed signed webhook when the handler changes) — attached to VERIFY.
- No coverage percentage is enforced; the criterion ↔ test map is the gate.

## Protected-tests rule
Weakening asserts, deleting, or skipping tests to reach green is forbidden. A red test triggers
`prompts/recovery/red-test.md` (R-02) — first decide what is wrong: code, test, or spec.

## Characterization tests
Before refactoring untested code (`workflows/refactor.md`) and for brownfield change requests
(`workflows/change-request.md`, Preserved behavior), pin the current behavior first — warts
included. They are written from observation, not from what the code "should" do.

## Evidence for UI criteria
A screenshot is evidence for a UI criterion; for change requests, before/after screenshots that
also show the preserved behavior. Check both locales (`en`, `tr`) when copy changes.

## Determinism
Flaky tests are fixed, not retried or skipped — see R-03. Evidence of a fix: 5 consecutive green runs.
