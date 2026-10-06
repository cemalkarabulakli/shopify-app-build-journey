# Conventions

Only rules that are real: every rule here is either enforced by tooling (preferred) or checked in
review. Aspirations don't belong here.

## Language
<!-- Set at bootstrap (step 0) and mirrored in AGENTS.md. Changing it later is allowed — edit both
     places; existing documents are not translated retroactively. -->
- Chat language (interviews, sessions): English
- Document language (docs/, specs, plans, ADRs, review and verify reports): English
- Always English (protocol, not prose): ANEW core files, template headings and field labels,
  `Status:` values (Draft / Approved / In progress / Shipped), `Approved by / on:`, `Source:`.
- Code identifiers, branch names, commit messages: English.
- Product copy: every user-facing string exists in both `src/lib/i18n/en.ts` and `tr.ts`;
  `en` is the default locale.

## Language & framework versions
- Node 22 (`>=22.12`, `.nvmrc`, `engine-strict=true`; Nixpacks pins 22).
- SvelteKit ^2.63 · Svelte ^5.56 (runes forced on for all project files) · TypeScript ^6 `strict`
  · Vite ^8 · Tailwind ^4 · Vitest ^4 · `pg` ^8 · `@paddle/paddle-node-sdk` ^3 · `marked` ^18.

## Naming
- Class files PascalCase (`FeatureRequest.ts`); one entity / use case / adapter per file.
- Use cases are `VerbNoun` classes with `execute()` (`ToggleVote`, `SubmitFeatureRequest`).
- Ports are interfaces named for the capability (`PostRepository`, `Membership`, `EmailSender`).
- Adapters are prefixed by technology: `Pg*`, `Paddle*`, `FileSystem*`, `Resend*`, `Console*`.
- Test fakes are `InMemory*` and live in `__tests__/`; tests are `__tests__/<Unit>.test.ts`.
- Branches and commits: see `docs/git.md`.

## Error handling
- **Domain:** throws on any invariant violation — a kebab-case code (`Error('short-title')`) or a
  named `*Error` (`InvalidPostError`, `PostNotFoundError`). Entities are never half-valid.
- **Use cases:** expected refusals are named `*Refused` errors with a `.code`
  (`VoteRefused('closed')`).
- **Routes:** `*Refused` → `fail(400, { <field>Error: e.code })`; anything else is logged with a
  `[context]` prefix and becomes `fail(500, …)` / `error(500)`. The page shows an i18n message
  chosen by code.
- **Never leaks to users:** stack traces, SQL, provider error bodies, secret names' values.
- **Missing configuration:** fail lazily on the request that needs it (503 for webhooks/APIs,
  500 for pages) with a loud log line — never crash the whole site.
- **Webhooks:** non-2xx whenever we want the provider to retry (our fault → 500, bad signature → 401).

## Data rules
- Timestamps: `Date` in code, `TIMESTAMPTZ` (UTC) in Postgres. Time is injected
  (`now = new Date()` as the last parameter of a use case); the domain never reads the clock.
- Money: never computed or stored as a float. Paddle owns amounts; prices are displayed via
  `Paddle.PricePreview()`; stored totals are Paddle's string minor units (`TEXT`), kept as given.
- IDs: provider ids are stored as given (`TEXT`); our own ids are `randomUUID()`, injected through
  the use-case constructor so tests can pin them.
- Emails: trimmed and lowercased before storing or comparing.
- SQL: parameterized (`$1`) only; schema changes are idempotent statements in `scripts/*.sql`.

## Enforced by tooling
- `scripts/arch-check` — forbidden dependencies F-1…F-4 (`docs/architecture.md`).
- `svelte-check` (TypeScript `strict`) — types; en/tr dictionary parity (`tr` is typed `Messages`).
- SvelteKit — `$lib/server` cannot be imported into client code.
- Svelte compiler — runes mode for all project files (`vite.config.ts`).
- `npm` `engine-strict` — wrong Node version fails install.
- No formatter or linter (decided at bootstrap: not worth the dependency yet). Match the
  surrounding code: tabs, single quotes.
