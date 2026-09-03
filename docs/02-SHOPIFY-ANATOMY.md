# Getting to Know Shopify — How the Gears Turn

> [101](00-SHOPIFY-101.md) explains "what it is". This file is **depth**: why Shopify, where it
> stands in the world, who uses it, what state the ecosystem is in, and **what's running behind the scenes as software**.
> Most of the technical decisions you'll make as an app developer follow from the facts in here.
>
> ⚠️ **Numbers go stale.** All of them are sourced and dated; if you're about to make a critical decision, go to the source.
> Verification date: **August 2026**.

---

## 1. Why Shopify? (Through a developer's eyes)

There are three ways to build e-commerce:

| Path | Example | Pro | Con |
|---|---|---|---|
| **Build from scratch** | Your own Next.js + Stripe | Full control | Payments, tax, shipping, fraud, inventory… years |
| **Self-hosted** | WooCommerce, Magento | Cheap, open source | Maintenance, security, scale are the merchant's problem |
| **SaaS** | **Shopify**, BigCommerce | Ready-made infrastructure + distribution channel | Platform dependency, playing by its rules |

What makes Shopify special for a developer is the **App Store**: a ready-made distribution channel
that puts millions of paying businesses in front of the software you write. Selling a plugin on
WooCommerce = building your own marketing from scratch. On Shopify = showing up in search results.

And there's this: **your customer is already paying.** A business that pays Shopify monthly is used
to paying you too. None of the "free user waiting around" problem you get in B2C apps.

**The price:** Shopify's rules are your product roadmap. If the platform pulls a feature into its own
core ("Shopify does this natively now"), it can wipe out that category overnight. This is called
*platform risk*, and it's real.

## 2. Where does it stand in the world?

| Metric | Value | Source / period |
|---|---|---|
| Annual revenue (Shopify's own turnover) | **$11.56 billion** | 2025 |
| GMV (total sales flowing through the platform) | **$378 billion** (+29.3% YoY) | 2025 |
| Q4 2025 single-quarter GMV | **$123.8 billion** | first time in history a quarter crossed $100B |
| Share of global e-commerce turnover | **~6.2%** | 2025 |
| Share of US e-commerce | **14%+** | 2025 |
| Active stores | **~5.6 million** (US ~2.67M) | third-party estimates, 2025 |
| Countries | **175+** | — |

How to read this: **GMV ≠ Shopify's revenue.** GMV is the total the stores sold; Shopify takes
subscription + payment commission out of it. Your app's market, on the other hand, is about the merchant count, not GMV.

And an honest look: the large majority of those 5.6 million stores are **hobby/dead stores**. The number
of stores doing serious revenue that will give an app $30 a month is far smaller. Don't build a business
plan on the sentence "there are millions of merchants"; narrow your target down to "sells ≥$10k/month, in this category, in this country".

## 3. Who uses it, and in which industries?

Store distribution (third-party crawls, 2026):

| Industry | Share |
|---|---|
| Apparel / fashion | **~27%** — first by a wide margin |
| Home & garden | ~12% |
| Beauty & fitness | ~11% |
| Food & beverage | near the top |

On the enterprise side (**Shopify Plus**): retail 18.2%, apparel 12% → together they make up
more than 30% of Plus customers. Manufacturing, wellness and food follow.
Names like Nike, Delta and Mattel are on Plus too; but the enterprise segment is tiny in count (~1%).

**Use cases** (each one creates a different app need):
- **DTC brand** — a brand selling its own product (Gymshark, Allbirds type). The most crowded group.
- **Dropshipping / POD** — selling without stock, print-on-demand. Cheap apps, high churn.
- **Retailer + POS** — has a physical store, merges inventory with Shopify POS.
- **B2B / wholesale** — dealer price lists, payment terms. Shopify's B2B features target this.
- **Subscription boxes** — coffee, vitamins. Recurring-order logic.
- **Headless** — big brands that build their own storefront (Hydrogen or another framework) and use
  Shopify purely as the commerce engine.

👉 When hunting for an app idea, answer the **which group** question first. There's no homogeneous
audience called "Shopify merchants"; a dropshipper's problems and a Plus brand's problems are polar opposites.

## 4. Ecosystem and community

> 📊 This section is a summary. For revenue distribution, price bands, churn, discovery and gap analysis,
> see: **[03-ECOSYSTEM-DATA.md](03-ECOSYSTEM-DATA.md)**

| Metric | Value | Note |
|---|---|---|
| Number of apps in the App Store | **~13,000 – 22,000** | Sources diverge a lot; counting methods differ |
| Annual ecosystem developer revenue | **~$890 million** | Third-party estimate |
| New apps added per month | **~550** | — |
| Apps used by the average merchant | **~6** | — |
| Number of developers/vendors | **12,000+** | — |

Two truths that fall out of this table:

1. **It's crowded.** Every popular category has dozens of competitors. The "I'll build a reviews app" idea
   starts from 50th place. The gap isn't in broad categories, it's in a **narrow niche + a job done badly**.
2. **The money is there.** ~$890M/year flows to developers and the average merchant uses 6 apps.
   So merchants are used to installing apps — what needs convincing isn't "should I install an app",
   it's "**which** app".

**Where the community lives:**
- `shopify.dev` — official documentation; the single source of truth. Blog/YouTube content goes stale fast.
- **Shopify Community** forums — merchant and developer questions. Good for seeing the real pain.
- **Partner program** — free; dev stores, App Store access and revenue share all come from here.
- **Shopify Editions** — a bulk feature announcement a few times a year. This is where you read the roadmap;
  **the feature that will kill your app category gets announced here too.** Follow it.
- **Changelog + API release notes** — quarterly. This is the calendar of your maintenance load.
- The agency and freelancer ecosystem (Shopify Experts) — may be where you find your first customers.

## 5. Shopify's own architecture — the gears

This section isn't "required" for writing an app, but it explains **why some things are the way they are**
(why the rate limit is measured in points, why a webhook can arrive twice, why data sometimes arrives late).

**The core: a giant Rails modular monolith.**

| Layer | What's used |
|---|---|
| Application | **Ruby on Rails** — 2.8M+ lines, 500k+ commits. "Shopify Core". |
| Modularity | A modular monolith split into components with **Rails Engines** (not microservices) |
| Database | **MySQL**, horizontally sharded by `shop_id`; **Vitess** in some systems |
| Isolation | **Pod architecture** — stores are split into groups, each group on its own DB cluster |
| Cache | Memcached, Redis |
| Event stream | Kafka |
| Search | Elasticsearch |
| Runtime | Autoscaling with Kubernetes; the stateless layer grows with traffic |

**Why the pod architecture matters:** Not all stores live in one giant database. Every pod is
fully isolated — if there's an incident in one pod, the number of affected stores stays bounded. Only the
databases are podded, because that's the hardest layer to scale; the rest is stateless.

What this means for you:
- Stores are **multi-tenant** but isolated. Your app should think per store too:
  each store = a separate access token, separate data, separate rate-limit bucket.
- **Eventual consistency** is normal. Read data right after writing it and you may get the old version.
- Load spikes (like BFCM) are a real event. Your code needs to know about backoff.

## 6. Anatomy on the merchant side — four surfaces

```
┌──────────────┬───────────────┬──────────────┬────────────┐
│  STOREFRONT  │     ADMIN     │   CHECKOUT   │    POS     │
│  (the shop)  │   (panel)     │  (payment)   │ (in-store) │
├──────────────┼───────────────┼──────────────┼────────────┤
│ Theme+Liquid │ Your app in   │ Shopify's own│ Physical   │
│ OS 2.0       │ an iframe,    │ flow         │ sales      │
│ sections     │ with Polaris  │ Extension    │ POS ext.   │
│ metafields   │ App Bridge    │ + Functions  │            │
│ Hydrogen*    │               │ (Plus-gated) │            │
└──────────────┴───────────────┴──────────────┴────────────┘
     *Hydrogen = headless storefront (React), hosted on Oxygen
```

- **Storefront** — the site the customer sees. A theme written in the **Liquid** templating language.
  With *Online Store 2.0*, pages were split into **sections**; apps add blocks to the storefront
  via **theme app extensions**. Extra data is carried with **metafields/metaobjects**.
- **Admin** — the merchant's panel. Your app lives here in an iframe, looks like Shopify thanks to the **Polaris** design
  system, and talks to the outer frame via **App Bridge**.
- **Checkout** — Shopify's most protected area. It used to be tinkered with via `checkout.liquid`;
  now it's **checkout extensibility**: UI extensions running in a sandbox (no real DOM access)
  + **Shopify Functions** for business logic. Key constraint: most checkout customization is tied to **Plus**.
- **POS** — the physical store; inventory and customers merge into the same data model.

**Core data model** (the objects you'll see constantly while writing an app):

```
Shop
 ├── Product ──── Variant ──── InventoryItem ── InventoryLevel ── Location
 │      └── Collection (manual / automatic rule)
 ├── Customer ─── Address
 ├── Order ────── LineItem ── Fulfillment ── Transaction ── Refund
 │      └── DraftOrder
 ├── Discount / PriceRule
 └── Metafield / Metaobject  (attach custom data to any object)
```

The most critical distinction: **Product ≠ Variant.** Stock, price and barcode live at the **variant** level.
The most common beginner mistake is looking for price/stock at the product level.

## 7. The developer surface — APIs and their rules

| API | What for | Who calls it |
|---|---|---|
| **Admin GraphQL API** | Read/write store data | Your server (with an access token) |
| **Storefront API** | Storefront data, cart | Browser / headless storefront |
| **Customer Account API** | Customer login, order history | Storefront |
| **Partner API** | Your own app's data (installs, revenue) | Your tooling |
| **Webhooks** | Event notifications | Shopify → you |
| **Functions** | Logic that runs inside Shopify | Shopify runs it (WASM) |

**Versioning:** A new version ships on the first day of every quarter — `2026-01`, `2026-04`… Each version
is supported for **at least 12 months**. So code that depends on the API **needs maintenance at least once a year**.
Put that on your calendar from day one; it's one of the reasons apps quietly die.

**Rate limit (Admin GraphQL):** Not by request count, but by **calculated query cost**.
*Leaky bucket*: the bucket holds ~1000 points, refills at ~50 points per second (multiples of that on Plus). A single query
can't exceed 1000 points. The **estimated cost** is deducted before the query runs; when it finishes, the difference
against the actual cost is refunded.

Practical consequence: instead of pulling every field with `first: 250`, ask for **the fields you need**.
In GraphQL, "extra fields are free" doesn't hold — here it's quite literally measured in money.
For batch work, use **Bulk Operations** (asynchronous, result comes as a JSONL file).

**Webhooks:** HTTP POST. Memorize three rules:
1. **At-least-once** delivery → the same event can arrive twice. Your handler must be **idempotent**.
2. **No ordering guarantee** → an "updated" event can arrive before "created".
3. **HMAC verification is mandatory** → don't process a body without verifying its signature.
Also, return 200 fast and push the work to a queue; Shopify disables slow endpoints.
GDPR/data-request webhooks are **mandatory** for the App Store.

## 8. The life of a request

**A) When the merchant opens your app:**

```
merchant clicks the app in admin
   │
   ▼
Shopify opens an iframe, address: your app URL + shop parameter
   │
   ▼
App Bridge generates a short-lived SESSION TOKEN (JWT)
   │
   ▼
your server verifies the JWT  ──►  if valid, that store's ACCESS TOKEN
   │
   ▼
query to the Admin GraphQL API (access token + API version)
   │
   ▼
HTML/JSON comes back, renders inside the iframe
```

Why no cookies: third-party cookies are unreliable inside an iframe. That's why a short-lived
**session token** is carried on every request.

**B) When something happens in the store:**

```
customer places an order
   │
   ▼
Shopify Core saves it → event is published (Kafka)
   │
   ▼
webhook POST ──► your endpoint
   │            (verify HMAC → return 200 → queue the work)
   ▼
worker process: process it, write to the database, pull details from the API if needed
```

**C) First install (OAuth), one-time:**
merchant clicks "Install" → permissions (scopes) screen → approval → you receive an **access token** for that store →
write the store record to your database. When the app is deleted, the `app/uninstalled` webhook arrives: **clear the token and
the data**, stop billing.

## 9. What does all this mean for an app developer?

1. **Store = tenant.** Store and isolate everything per `shop`.
2. **Don't rely on webhooks alone.** Write periodic *reconciliation* (scan via the API and
   compare) for missed events.
3. **Idempotency is mandatory.** If the same webhook arrives twice, don't create two records.
4. **Think about query cost.** Paginate with cursors, minimal fields, Bulk Operations for batch work.
5. **Ask for the least permissions.** Every extra scope is a reason to drop off on the install screen.
6. **Annual API maintenance** goes on the calendar (version + deprecation).
7. **Be ready for eventual consistency.** Don't assume you can read what you just wrote.
8. **Take uninstall seriously.** Cleanup + stop billing + data retention policy.
9. **Know the Plus boundaries.** The market for ideas that touch checkout isn't all merchants.
10. **Price in platform risk.** Don't build a company on top of a feature Shopify is likely to absorb
    into core; follow the Editions announcements.

## 10. Limits and weak spots (the honest section)

- **Competition is intense**, price pressure is high; in many categories $9.99 acts like a ceiling.
- **Churn is high.** The merchant tries the app and deletes it a month later. Shortening TTV (time to
  first value) is the highest-return work.
- **Payments and checkout are Shopify's fortress.** Ideas that touch them are constrained and tied to Plus.
- **Docs change fast**, blog content goes stale. Don't trust anything outside `shopify.dev`.
- **App Store review** is a real hurdle; there are quality, performance and GDPR requirements.
- **Dependency.** Shopify sets the rules, and they can change overnight.

## 11. Sources

- Shopify 2025 financials and GMV: [Chargeflow statistics](https://www.chargeflow.io/blog/shopify-statistics) · [ECDB](https://ecdb.com/blog/shopify-s-influence-on-global-e-commerce-is-growing/5181) · [SEC 10-Q filings](https://www.sec.gov/Archives/edgar/data/1594805/000159480525000073/shop-20250630.htm)
- Architecture: [Inside Shopify's Modular Monolith](https://newsletter.techworld-with-milan.com/p/inside-shopifys-modular-monolith) · [Shopify Engineering — horizontal scaling with Vitess](https://shopify.engineering/horizontally-scaling-the-rails-backend-of-shop-app-with-vitess) · [Kovyrin interview](https://kovyrin.net/2024/06/16/interview-inside-shopify-monolith/)
- Ecosystem/app counts: [Meetanshi App Store statistics](https://meetanshi.com/blog/shopify-app-store-statistics/) · [GapQuery](https://www.gapquery.com/shopify-app-store-statistics)
- Industry distribution: [Storeleads — State of Shopify](https://storeleads.app/reports/shopify) · [Storeleads Plus report](https://storeleads.app/reports/shopify/list-of-shopify-plus-stores)
- API limits and versioning: [shopify.dev/docs/api/usage/limits](https://shopify.dev/docs/api/usage/limits)
- Checkout/Functions/Hydrogen: [Hydrogen official site](https://hydrogen.shopify.dev/)

---

*Every number in this file will be wrong one day. Fix whatever you see is wrong and update the date.*
