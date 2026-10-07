# Architecture

## System overview
A SvelteKit 2 (Svelte 5, TypeScript) app served by adapter-node, deployed by Coolify on every push
to `main`. It is a **modular monolith in clean-architecture layers**: `domain` → `application` →
`server` (infrastructure, presentation, config, container) → `routes`, with the dependency rule
pointing inward. Code is sliced by context (`post`, `vip`, `auth`, `roadmap`, `project`). The reason
is testability at almost zero cost: use cases depend on ports, so tests run on in-memory fakes with
no mocking library and no database, and an adapter (file system → CMS, Pg → anything) is swapped
in one line of `container.ts`.

## Modules / components and ownership

| Module | Single responsibility | Owns |
|---|---|---|
| `lib/domain/post` | Entry/doc entity: slug, title, date invariants, ordering | The meaning of an entry or doc |
| `lib/domain/vip` | Customer, Subscription (the access rule, BR-2), Transaction | The billing mirror model |
| `lib/domain/auth` | `SessionUser`, login-token and email-sender ports | Who is signed in |
| `lib/domain/roadmap` | FeatureRequest status machine, votes, limits (BR-6…BR-9) | Feature board rules |
| `lib/domain/project` | Project, Milestone, progress (BR-10) | Project progress rules |
| `lib/application` | Use cases (`VerbNoun.execute()`), ports (`MarkdownRenderer`, `Membership`), DTOs | Orchestration |
| `lib/server/infrastructure/content` | FS repositories, frontmatter, `marked` renderer, TTL cache | Reading `content/` and `docs/` |
| `lib/server/infrastructure/vip` | `PgBillingStore`, `PaddleWebhookAdapter`, `PaddlePortal` | Tables `customers`, `subscriptions`, `transactions`, `webhook_events`, `login_tokens` |
| `lib/server/infrastructure/auth` | Session cookie codec, email senders (Resend / console) | Session signing |
| `lib/server/infrastructure/roadmap` | `PgFeatureBoard` (own pool) | Tables `feature_requests`, `feature_votes` |
| `lib/server/presentation` | Output formats (RSS) | — |
| `lib/server/config/siteConfig.ts` | The only reader of env vars | Configuration |
| `lib/server/container.ts` | Composition root: the only place adapters are constructed | Wiring |
| `routes/` | Thin loaders/actions/endpoints + Svelte pages | HTTP and UI |
| `lib/client`, `lib/components`, `lib/i18n`, `lib/vip` | Browser helpers (XP, reading progress), shared UI, en/tr dictionaries, tier catalog | Presentation |

Schema lives in `README.md` ("Database") and `scripts/*.sql` (idempotent, run by hand with `psql`).

## Communication rules
- Routes call use cases obtained from `container()`; they never construct adapters.
- Use cases talk to the outside only through ports. Cross-context needs go through a port
  (e.g. the roadmap asks `Membership.isMember()`; it never reads billing tables).
- Each Pg adapter touches only the tables it owns (table above).
- Paddle → us only via the verified webhook; pages read the Postgres mirror, never Paddle, on read.
- Infrastructure that needs env (DB, Paddle, email) is built lazily: a missing setting fails the one
  request that needs it (503/500), never the whole site.

## Forbidden dependencies (make them testable)
Enforced by `scripts/arch-check` (step `arch` of `scripts/check`), except F-5.
- **F-1** `lib/domain/<ctx>` imports only from its own folder (`./`): no npm packages, no `node:`,
  no `$env`, no other context.
- **F-2** `lib/application` imports only `$lib/domain/*`, its own modules and `node:` stdlib — never
  `$lib/server`, `$env`, `@sveltejs/*`, `pg`, `@paddle/*`, `marked`.
- **F-3** `routes/` and `hooks.server.ts` never import `$lib/server/infrastructure`.
- **F-4** Only `lib/server/config/siteConfig.ts` reads `process.env` / `$env` / `import.meta.env`.
- **F-5** Only `lib/server/container.ts` constructs adapters (review rule).
- **F-6** Only `lib/server/infrastructure/pg/createPool.ts` value-imports `pg` (others use `import type`),
  so it is the only place that constructs a Postgres pool or client, and
  every pool logs lost idle connections instead of crashing the process, and bounds connect time
  (BUG-002).

## Deliberately out of scope
- The Shopify app itself — this repo is the build-in-public site around it.
- A CMS or database for content: entries and docs are markdown files in git.
- An ORM or migration tool: raw parameterized SQL, idempotent `scripts/*.sql`.
- Client-side state stores and SPA-style data fetching: server loaders + form actions.
