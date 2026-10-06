# Security

Baseline rules agents must honor in every plan and review. The repo is **public** on GitHub.

## Secrets
- Secrets never enter the repo, specs, prompts, or chat. `.env` is gitignored; provide `.env.example`.
- Agents never print secret values, even when debugging.
- Env is read only in `src/lib/server/config/siteConfig.ts` (F-4). Server-only keys
  (`PADDLE_API_KEY`, `PADDLE_WEBHOOK_SECRET`, `SESSION_SECRET`, `DATABASE_URL`, `RESEND_API_KEY`)
  never reach client code; only `PUBLIC_*` values may.
- Prospect / outreach data never enters the repo (`outreach/` is gitignored).

## Input & output
- Validation at two layers: routes parse and type-check form/JSON input; domain `create()`
  enforces the invariants. A request that fails either never reaches the database.
- User-supplied text (feature requests, notes, emails) is rendered as plain text — never through
  `{@html}`. `{@html}` is reserved for our own markdown (entries, docs) and JSON-LD, which must
  escape `<` (as `Seo.svelte` does).
- SQL is parameterized only; no string-built queries.
- Error responses carry a code or a generic message — never stack traces, SQL, or provider bodies.

## AuthN / AuthZ
- AuthN: magic link only. Tokens are random 32 bytes, stored as a hash, single-use, expiring
  (BR-5). The session is an HMAC-signed cookie (`SESSION_SECRET`, ≥ 32 chars) holding only the
  email: `httpOnly`, `sameSite=lax`, `secure` on https.
- CSRF: SvelteKit origin check; `ORIGIN` must equal `SITE_URL` in production.
- AuthZ is default-deny and server-side:
  - Membership is resolved from the billing mirror by the session email — never from client input.
  - Admin = email in `ADMIN_EMAILS`; an empty list means nobody is admin.
  - Every form action re-checks authorization; hiding a button is not authorization.
- Payments: webhooks are verified on the raw body before parsing; `PUBLIC_PADDLE_ENV` has no
  default, so sandbox and production can't be mixed silently.

## Dependencies
- A new runtime dependency must be named and justified in the plan (why not stdlib or an existing
  dependency, license, maintenance / last release). The human approves it at the plan gate.
- `npm audit --omit=dev` is run manually before any billing/auth change ships; it is not part of
  `scripts/check` (needs network).

## Review lens
Security is a mandatory dimension of every independent review (see `prompts/review.md`), not a
separate afterthought phase.
