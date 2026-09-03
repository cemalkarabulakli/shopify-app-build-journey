# Learning Log — Shopify App from Zero

> **Starting point:** Nothing installed on the computer. No Partner account. No knowledge
> about Shopify. All we have: the ability to write code and a bit of marketing instinct.
> This file is the record of the road from that point to an app that makes money on the App Store.
>
> Read first: [Shopify 101](00-SHOPIFY-101.md) · Terms: [E-commerce Glossary](01-ECOMMERCE-GLOSSARY.md)
> Depth: [Shopify Anatomy](02-SHOPIFY-ANATOMY.md) · Market data: [Ecosystem Data](03-ECOSYSTEM-DATA.md)
> Published at: https://shopifyjourney.cemalbuilds.com

---

## Rules

1. **Run it first, understand it later.** No reading the docs cover to cover; look things up when stuck.
2. **Session = 60–90 min, one goal.** The goal must be "something that works", not "learning X".
3. **A session that isn't written down didn't happen.** Five lines into this file at the end of every session.
4. **Every phase has a concrete output.** No output, the phase isn't done.
5. **Technical phase short, merchant phase long.** Learning the platform and then shipping something
   nobody wants is the number one cause of death in this business.

## Roadmap

| Phase | Duration | What I'm learning | Counts as done when |
|---|---|---|---|
| **0** Concepts | 2 days | The Shopify ecosystem, what an app is, how the money flows, the architecture behind it | [101](00-SHOPIFY-101.md) + [Anatomy](02-SHOPIFY-ANATOMY.md) read; I can explain the 5 sentences in §8 and "why a webhook arrives twice" in my own words | ⬜ |
| **1** First working app | 1 day | Partner account, dev store, CLI, `app dev` | The app opens in the dev store admin | ⬜ |
| **2** Anatomy | 2 days | OAuth, session token, embedded, App Bridge | I've added my own page to the template and can draw the path of a request | ⬜ |
| **3** Data | 3 days | Admin GraphQL API, scopes | A page that lists products + updates one of them | ⬜ |
| **4** Events | 2 days | Webhooks, app uninstall cleanup | `orders/create` is caught and written to the DB | ⬜ |
| **5** **Problem** | 2 weeks | Merchant interviews, demand test ([data](03-ECOSYSTEM-DATA.md)) | 10 merchant conversations + a one-sentence problem + 1 number | ⬜ |
| **6** MVP | 3 weeks | My own app | 3 merchants installed by hand, using it | ⬜ |
| **7** Money | 3 days | Billing API, trial, plans | The first payment came in | ⬜ |
| **8** Launch | 1 week | App Store listing, review | Submitted for review | ⬜ |

Phases 0–4 are for learning the platform, **throwaway code**. The real product starts in Phase 5.
Don't build anything permanent before you reach Phase 5.

---

## Sessions

### Session 0 — 2026-08-25 · Infrastructure: the journal site is live

**Goal:** Have the place where I'll publish what I learn ready.
**Did:** SvelteKit + adapter-node, markdown-based journal, deployed with Coolify/Nixpacks.
**Learned:**
- Nixpacks + `.npmrc engine-strict=true` + a loose `engines` = silent `npm ci` failure.
  Pin Node in three places: `engines`, `.nvmrc`, `NIXPACKS_NODE_VERSION`.
- The Coolify health check looks for curl/wget *inside* the container; the Nixpacks Node image doesn't have them.
- Traefik "no available server" = no healthy container behind it. Don't look at the build settings,
  look at the **deploy log**.
**Stuck on:** While diagnosing the 503 I focused on the Coolify UI settings and read the log too late.
**Next step:** Phase 0 — understand what Shopify is.

### Session 1 — ____ · Phase 0: The picture in my head

**Goal:** Be able to explain what I'm going to build without writing a single line of code.

**To do (about 45 min):**
1. Read [00-SHOPIFY-101.md](00-SHOPIFY-101.md), then [02-SHOPIFY-ANATOMY.md](02-SHOPIFY-ANATOMY.md).
2. Go to https://apps.shopify.com. Pick a category (e.g. "Store design" or "Marketing").
   Examine **5 apps** and note the following: what does it do, what's the price, how many reviews has it got, what's the top complaint?
   → Complaints (1–2 star reviews) are worth gold; that's where the gap is.
3. Do the same once more for **free apps**: why are they free, how do they make money?
4. Memorize the "3 formulas" section in [01-ECOMMERCE-GLOSSARY.md](01-ECOMMERCE-GLOSSARY.md).
5. Look at the tables in [03-ECOSYSTEM-DATA.md](03-ECOSYSTEM-DATA.md) §4 (merchant app budget) and §5 (churn).
   Re-evaluate the 5 apps you examined against these numbers:
   what's the price, which revenue band of merchant is it selling to, how many reviews does it have?

**Check question (if you can't answer it, the phase isn't done):**
> "What is a Shopify app, how many directions of traffic are there between my server and Shopify, who does the money flow from and to?"
> "Why is the rate limit measured in points rather than request count? Why can a webhook arrive twice?"

**Did:**
**Learned:**
**Stuck on:**
**Next step:**

### Session 2 — ____ · Phase 1: The first app opens in the dev store

**Goal:** Get `shopify app dev` running, with the app showing up embedded in the admin panel.
No understanding the code — just **seeing something that works**.

**Steps, in order:**

1. **Partner account** (free): https://partners.shopify.com → Sign up.
   It asks for country/business details; you can open one as an individual too.
2. Create a **Development store**: Partners dashboard → *Stores* → *Add store* →
   **Development store** → choose "Start with test data" (so you get fake products/orders).
   Note the address: `xxx.myshopify.com`.
3. **Install the CLI** (macOS):
   ```bash
   brew tap shopify/shopify && brew install shopify-cli
   shopify version
   ```
   (Alternative: `npm install -g @shopify/cli`)
4. **Create the app** — Shopify's official starter template:
   ```bash
   cd ~/development/Projects
   shopify app init --name journey-app --template reactRouter --flavor typescript
   cd journey-app
   ```
   On the first run it will ask you to log in to your Partner account in the browser.
5. **Run it:**
   ```bash
   shopify app dev
   ```
   Let it pick the dev store. Click the **Preview URL** printed in the terminal → *Install app* →
   the app should open inside the admin. **That moment is the end of Phase 1.**
6. Wander around the file structure for 10 min — **don't try to understand it**, just see what lives where:
   `shopify.app.toml` (app config, scopes) · `app/routes/` (pages) ·
   `app/shopify.server.ts` (authentication) · `prisma/` (session storage).

**Likely snags:**
- Tunnel/HTTPS warning → the CLI opens its own tunnel, leave it as is.
- "App already installed" → `shopify app dev --reset`
- Node version error → make sure Node 20+ is installed (`node -v`).

**Did:**
**Learned:**
**Stuck on:**
**Next step:**

### Session 3 — ____ · Phase 2: Where does the request come from?

**Goal:** Be able to draw how a request gets from the admin to my code.
**To do:** Follow the `authenticate.admin(request)` call inside `app/shopify.server.ts`.
Add a line to `app/routes/app._index.tsx` that prints the store name. Refresh the page, see the change.
**Check question:** "Why a session token instead of a cookie?"

**Did:**
**Learned:**
**Stuck on:**
**Next step:**

---

## Concept glossary (in my own words)

If you can't write a concept down **in your own words**, you haven't learned it.
The official definitions are in [101](00-SHOPIFY-101.md); your version goes here.

| Concept | My sentence |
|---|---|
| Embedded app | |
| Session token | |
| Scopes | |
| Webhook | |

## Open questions (date them when you find the answer)

- [ ] Why is the template React Router? Can you build a Shopify app with SvelteKit, and is it worth the trouble?
- [ ] The template has Prisma + SQLite; where should sessions be stored in prod?
- [ ] What's the minimum set of scopes you can get by with? How much do excess permissions lower the install rate?
- [ ] How long does the App Store review process take, and what are the most common rejection reasons?
- [ ] What's the average uninstall (churn) rate? Which category is stickier?
