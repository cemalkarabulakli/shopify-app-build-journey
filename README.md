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
| `SITE_URL` | `http://localhost:3000` | Public URL for canonical links and RSS |
| `SITE_NAME` | `Shopify App Build Journey` | Site title |
| `SITE_DESCRIPTION` | … | Index intro + feed description |
| `AUTHOR` | `Cemal` | Footer / about |
| `CONTENT_DIR` | `content/posts` | Where entries live |
| `PATH_DIR` | `content` | Holds `path.<locale>.json`, the ordered learning path shown on the home page |
| `DOCS_DIR` | `docs` | Learning notes served at `/docs` (reading order = filename) |
| `CACHE_TTL_MS` | `60000` prod / `0` dev | Post cache TTL |
| `PUBLIC_PADDLE_CLIENT_TOKEN` | — | Paddle.js client token (VIP checkout); page shows "opens soon" without it |
| `PADDLE_ENV` | `sandbox` | `sandbox` or `production` |
| `PADDLE_API_KEY` | — | Only for `npm run paddle:catalog`, which creates the 3 tiers × 2 prices and writes ids to `content/vip-catalog.json` |
| `PADDLE_WEBHOOK_SECRET` | — | Verifies `POST /api/paddle/webhook`; endpoint returns 503 without it |
| `VIP_DATA_DIR` | `data` | Holds `vip-members.json` — mount a persistent volume |

---

Built by [Cemal](https://shopifyjourney.cemalbuilds.com/about) · [shopifyjourney.cemalbuilds.com](https://shopifyjourney.cemalbuilds.com/)
