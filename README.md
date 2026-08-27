# Shopify App Build Journey

**👉 Follow along at [shopifyjourney.cemalbuilds.com](https://shopifyjourney.cemalbuilds.com/)**

I'm building a Shopify app from zero, in public. Every entry covers what I shipped, what broke, what merchants said, and the real numbers — installs, paying merchants, MRR, hours spent. No fluff, no "we're crushing it".

This repo is the site itself. The journal lives on the website; the code is here for anyone who wants to see how it's built or run their own.

## Support the journey

- **Read and subscribe** — [shopifyjourney.cemalbuilds.com](https://shopifyjourney.cemalbuilds.com/) or the [RSS feed](https://shopifyjourney.cemalbuilds.com/feed.xml).
- **Shopify merchant?** I'm looking for early testers. Say hi via the [About page](https://shopifyjourney.cemalbuilds.com/about).
- **Fellow builder?** Star ⭐ this repo, share an entry, or open an issue with feedback.

---

## Running the site yourself

SvelteKit (Svelte 5, TypeScript) + adapter-node. One markdown file per entry, no CMS, no database.

```bash
npm install
npm run dev                  # http://localhost:5173
npm test                     # unit tests (vitest)
npm run check                # svelte-check / TypeScript
npm run build && npm start   # production server on :3000
```

### Writing an entry

Create `content/posts/<slug>.md` — the filename becomes the URL `/posts/<slug>`:

```md
---
title: "Week 3 — first paying merchant"
date: 2026-09-14
summary: "One-line teaser shown on the index and in RSS."
tags: [launch, pricing]
draft: false
---

Markdown body…
```

`draft: true` hides an entry everywhere (index, page, feed). Push to `main` → Coolify rebuilds → live.

### Architecture

Clean architecture with the dependency rule pointing inward — outer layers depend on inner ones, never the reverse.

```
src/lib/domain/post/            Entities & ports — pure TS, no external imports
  Post.ts                         entity + invariants (slug format, title, date)
  PostRepository.ts               port: how the app asks for posts
src/lib/application/            Use cases — orchestrate the domain via ports
  use-cases/ListPublishedPosts    hides drafts, sorts newest first
  use-cases/GetPublishedPost      loads one entry, renders markdown via port
  use-cases/BuildFeed             format-agnostic feed data
  ports/MarkdownRenderer.ts       port: markdown → HTML
src/lib/server/                 Infrastructure — server-only, never bundled to the client
  infrastructure/content/         FileSystemPostRepository, CachedPostRepository (decorator),
                                  FrontmatterParser, MarkedMarkdownRenderer
  presentation/RssFeedSerializer  FeedData → RSS 2.0
  config/siteConfig.ts            the only file that reads env vars
  container.ts                    composition root — the only place that wires adapters
src/routes/                     Presentation — thin loaders + Svelte components
```

Use cases depend on interfaces; concrete classes are chosen once in `container.ts`. Tests swap in an in-memory repository and a fake renderer — no mocking library needed. Swapping the content source (Git-backed CMS, Notion, a database) is one new `PostRepository` and one line in the container.

### Deployment (Coolify + Nixpacks)

Base directory `/`, no install/build/start overrides, port `3000`. `nixpacks.toml` pins Node 22 and adds `curl`/`wget` so Coolify's health check (`GET /healthz`) works.

| Env var | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Listen port |
| `SITE_URL` | `http://localhost:3000` | Public URL for canonical links, RSS, sign-in links and Paddle success redirects |
| `ORIGIN` | — | **Required in production** (adapter-node): same value as `SITE_URL`; without it every form POST (sign-in, portal) is rejected as cross-site |
| `SITE_NAME` | `Shopify App Build Journey` | Site title |
| `SITE_DESCRIPTION` | … | Index intro + feed description |
| `AUTHOR` | `Cemal` | Footer / about |
| `CONTENT_DIR` | `content/posts` | Where entries live |
| `PATH_DIR` | `content` | Holds `path.<locale>.json`, the ordered learning path shown on the home page |
| `DOCS_DIR` | `docs` | Learning notes served at `/docs` (reading order = filename) |
| `CACHE_TTL_MS` | `60000` prod / `0` dev | Post cache TTL |
| `PUBLIC_PADDLE_CLIENT_TOKEN` | — | Paddle.js client token (`test_…` on sandbox); `/vip` shows "opens soon" without it. Prices come from `Paddle.PricePreview()`, localized by `x-vercel-ip-country` / `cf-ipcountry` or Paddle's own IP lookup |
| `PUBLIC_PADDLE_ENV` | **required** | `sandbox` or `production`; `/vip` returns 500 and the webhook 503 when unset, so you never hit the wrong account |
| `PADDLE_API_KEY` | — | Server only: `npm run paddle:catalog` and customer-portal sessions |
| `PADDLE_WEBHOOK_SECRET` | — | Verifies `POST /api/paddle/webhook`; endpoint returns 503 without it |
| `DATABASE_URL` | — | Postgres for the billing mirror and sign-in tokens (schema below). Webhook/account routes answer 503 without it |
| `SESSION_SECRET` | — | ≥32 chars; signs the `session` cookie for `/account` |
| `RESEND_API_KEY`, `EMAIL_FROM` | — | Sign-in emails via Resend; unset → links are printed to the server log |

### Sandbox end-to-end test

```
PORT=80 ORIGIN=http://localhost SITE_URL=http://localhost node build   # Paddle's approved sandbox domain is http://localhost (no port)
BASE=http://localhost npm run e2e:checkout                               # 4242 card → completes trial checkout → /welcome
CARD=4000000000000002 BASE=http://localhost npm run e2e:checkout         # declined card → stays on checkout, exits 0
```

Requires the sandbox `.env` and Google Chrome (Playwright uses `channel: 'chrome'`). Screenshots land in `.e2e/`.
Webhooks are delivered to the public URL in the notification destination, so to exercise the handler locally
replay a notification's raw payload signed with `PADDLE_WEBHOOK_SECRET` (see `scripts/` history / git log for the snippet).

`content/vip-catalog.json` also carries `advanced.monthly.upgradePriceId`: a no-trial Advanced price used when an
existing subscriber upgrades (Paddle rejects some item changes onto trial prices).

### Database (billing mirror)

Paddle is the source of truth; these tables mirror it from verified webhooks so pages never call Paddle on read.
`customers` / `subscriptions` / `transactions` are upserted by Paddle id and ordered by event time; `webhook_events`
makes at-least-once delivery idempotent; `login_tokens` holds hashed one-time sign-in links. Access rule
(`Subscription.grantsAccess`): `active`, `trialing`, `past_due` → yes; `paused`, `canceled` → no; a *scheduled*
cancel never revokes early.

```sql
CREATE TABLE customers (customer_id TEXT PRIMARY KEY, email TEXT NOT NULL, name TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
CREATE TABLE subscriptions (subscription_id TEXT PRIMARY KEY, customer_id TEXT NOT NULL REFERENCES customers(customer_id), status TEXT NOT NULL, price_id TEXT NOT NULL, product_id TEXT NOT NULL, scheduled_change_action TEXT, scheduled_change_at TIMESTAMPTZ, current_period_end TIMESTAMPTZ, event_occurred_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
CREATE INDEX subscriptions_customer_idx ON subscriptions(customer_id);
CREATE TABLE transactions (transaction_id TEXT PRIMARY KEY, customer_id TEXT, subscription_id TEXT, status TEXT NOT NULL, total TEXT, currency_code TEXT, billed_at TIMESTAMPTZ, event_occurred_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
CREATE TABLE webhook_events (event_id TEXT PRIMARY KEY, event_type TEXT NOT NULL, occurred_at TIMESTAMPTZ NOT NULL, received_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
CREATE TABLE login_tokens (token_hash TEXT PRIMARY KEY, email TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL, used_at TIMESTAMPTZ);
```

---

Built by [Cemal](https://shopifyjourney.cemalbuilds.com/about) · [shopifyjourney.cemalbuilds.com](https://shopifyjourney.cemalbuilds.com/)
