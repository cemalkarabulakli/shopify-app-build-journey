---
title: "Phase 0 done — what exists, and what the research changed my mind about"
date: 2026-08-26
summary: "This site, ten research docs, and three beliefs that didn't survive the numbers."
tags: [faz-0, research]
---

## What exists so far

**This site.** SvelteKit with clean architecture — domain entities and ports with no framework
imports, use cases that depend on interfaces, filesystem adapters wired in one composition root.
Markdown in, RSS out, deployed on Coolify with Nixpacks. The first thing it taught me had nothing
to do with Shopify: a loose `engines` field plus `engine-strict=true` makes `npm ci` fail silently,
and Traefik's "no available server" means read the deploy log, not the build settings.

**A research library.** Ten reference documents, written in Turkish, sourced and dated, covering:

- **Shopify 101** — the ecosystem, what an app actually is, how the money moves
- **Ecommerce glossary** — AOV, CAC, LTV, ROAS, churn, with formulas and worked examples
- **Platform anatomy** — the Rails modular monolith, pod-sharded MySQL, the four merchant
  surfaces, API versioning and rate limits, what a request's life looks like
- **Ecosystem economics** — revenue distribution, price bands, churn rates, category saturation
- **Information sources** — where new and beta features surface, and how to see it coming when
  Shopify is about to absorb your category
- **People and vision** — who runs Shopify, what they've said, what it means for app builders
- **Merchant psychology** — who pays what at which stage, why they install, why they uninstall
- **Events** — Shopify's own, and the wider ecommerce circuit, with the price traps marked
- **Podcasts** — verified active, dead ones flagged

They live in [`/docs`](https://github.com/cemalkarabulakli/shopify-app-build-journey/tree/main/docs)
in this repo.

## Three things the research changed my mind about

**The market is ~65,000 stores, not 3 million.** Only 1.8% of Shopify stores spend more than
$100/month on apps. The median store spends nothing. Any plan built on "millions of merchants"
is built on a store that doesn't exist.

**Billing anger beats onboarding friction four to one.** Surprise charges account for 19.2% of
one- and two-star app reviews; setup difficulty accounts for 4.4%. Merchants forgive a clumsy
install. They don't forgive an unexpected invoice.

**Merchants are replacing SaaS with AI-built internal tools, and saying so publicly.** The same
behaviour showed up independently across five operator podcasts in 2026 — one of them a COO who
cancelled seven subscriptions and rebuilt them in a week. Any app whose value is a form and a
database is being commoditised right now. That shapes what to build, not just how to sell it.

## What's next

Phase 1. Partner account, a development store, the CLI, and `shopify app dev` until something
opens inside a real admin. Then I'll write up what broke.
