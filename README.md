# Shopify App Build Journey

Build-in-public journal for my Shopify app. SvelteKit + adapter-node, one markdown file per entry, no CMS, no database.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit tests (vitest)
npm run check    # svelte-check / TypeScript
npm run build && npm start   # production server on :3000 — what Coolify runs
```

## Write an entry

Create `content/posts/<slug>.md` (the filename is the URL: `/posts/<slug>`):

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

## Architecture

Clean architecture with the dependency rule pointing inward. Outer layers depend on inner ones, never the reverse.

```
src/lib/domain/post/            Entities & ports — pure TS, no imports from anything
  Post.ts                         entity + invariants (slug format, title, date)
  PostRepository.ts               port: how the app asks for posts
  errors.ts                       PostNotFoundError
src/lib/application/            Use cases — orchestrate domain via ports
  use-cases/ListPublishedPosts    hides drafts, sorts newest first
  use-cases/GetPublishedPost      loads one entry, renders markdown via port
  use-cases/BuildFeed             format-agnostic feed data
  ports/MarkdownRenderer.ts       port: markdown → HTML
  dto.ts                          plain objects that cross into the UI
src/lib/server/                 Infrastructure — server-only ($lib/server is never bundled to the client)
  infrastructure/content/
    FileSystemPostRepository      adapter: content/posts/*.md → Post
    CachedPostRepository          decorator: TTL cache over any PostRepository
    FrontmatterParser             tiny frontmatter parser
    MarkedMarkdownRenderer        adapter over `marked`
  presentation/RssFeedSerializer  FeedData → RSS 2.0
  config/siteConfig.ts            the only file that reads env vars
  container.ts                    composition root — the only place that `new`s adapters
src/routes/                     Presentation — thin loaders + Svelte components
```

How SOLID shows up:

- **S** — each class has one reason to change: parsing frontmatter, reading files, caching, rendering markdown, serialising RSS are all separate.
- **O** — `CachedPostRepository` adds caching without touching `FileSystemPostRepository`; an `AtomFeedSerializer` could sit next to the RSS one.
- **L** — any `PostRepository` (filesystem, cached, in-memory test double) is interchangeable; the use cases can't tell.
- **I** — ports are minimal: `PostRepository` has two methods, `MarkdownRenderer` has one.
- **D** — use cases depend on interfaces; concrete classes are chosen once in `container.ts`. Tests swap in `InMemoryPostRepository` and a fake renderer with zero mocking libraries.

Swapping the content source (e.g. a Git-backed CMS, Notion, a database) means writing one new `PostRepository` and changing one line in the container.

## Deploy (Coolify)

Matches the Nixpacks config: base directory `/`, no install/build/start overrides, port `3000`.
Nixpacks detects `package.json` → `npm ci` → `npm run build` → `npm start` (`node build`).

Environment variables (all optional — see `.env.example`):

| Var | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Listen port (adapter-node) |
| `SITE_URL` | `http://localhost:3000` | Public URL for canonical links and RSS — **set this** |
| `SITE_NAME` | `Shopify App Build Journey` | Site title |
| `SITE_DESCRIPTION` | … | Index intro + feed description |
| `AUTHOR` | `Cemal` | Footer / about |
| `CONTENT_DIR` | `content/posts` | Where entries live |
| `CACHE_TTL_MS` | `60000` in prod, `0` in dev | Post cache TTL |

Health check: `GET /healthz` → `ok`. Feed: `/feed.xml`.
