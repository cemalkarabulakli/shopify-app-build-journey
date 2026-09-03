# Ecosystem Data — The Economics of the App Store

> [02-Anatomy](02-SHOPIFY-ANATOMY.md) explains *how the platform works*. This file is
> **the economics of the market**: how many apps there are, how much they make, how much merchants pay,
> why people uninstall apps, where the gaps are.
>
> Goal: when picking an idea, decide by **the numbers**, not by gut feel.
> Verified: **August 2026**. Sources at the end.

> ### ⚠️ Correction note (after the August 2026 deep research)
> When this file was first written it relied on shallower sources. The later deep research
> corrected several numbers — if you spot a contradiction, **the corrections below take precedence**:
> - **App count:** not "13,800–22,200" → **~17,900–25,500 live listings**, *"published"*
>   (cumulative) **28,162**. Shopify's own wording is "16,000+".
> - **Apps per store:** "average of 6" ≠ reality. **Median is 2**, and **76% of stores use 0–2 apps**.
>   **Do not use** the "average $120/mo spend" figure — it's the mean of a skewed distribution.
> - **Revenue share:** on top of the 0%/15% there is a **2.9% transaction fee**; developers earning $20M+/yr
>   pay **15% on all revenue**.
> - **"60% of installs come from search":** sources say 60% and 70%, **neither is first-party**.
> - **"The average developer earns $93,000":** ❌ wrong — the trail leads to **ZipRecruiter's employee salary**
>   page, nothing to do with app revenue.
> - Detailed merchant/payment data: [06-MERCHANT-PSYCHOLOGY.md](06-MERCHANT-PSYCHOLOGY.md)

## 0. How to read these numbers

Shopify doesn't open up the App Store's internals; most of the data here comes from **third-party crawlers**
(Storeleads, GapQuery, StoreCensus, appstoreresearch, etc.). Their counting methods differ,
so the same metric changes from source to source — for the app count you'll see 13,786 as well as
22,186. **The order of magnitude is right, the decimal places are not.** Use it that way.

---

## 1. Market size

| Metric | Value | Source/period |
|---|---|---|
| Apps in the App Store | **~13,800 – 22,200** | GapQuery 13,786 · normalized crawl 22,186 (Aug 2026) |
| Number of categories | **1,789** | Aug 2026 |
| New apps added per month | **~550** | 2026 |
| Two-year growth | **+71%** (early 2024 → Q1 2026) | ~7,000 new apps |
| Apps used by the average store | **~5.9 – 6** | StoreCensus |
| Total detected installs | **13.4M+** | StoreCensus (crawl of 2.28M stores) |
| Ecosystem developer revenue | **~$890M/yr** | third-party estimate |

**Reading:** The market is growing, but supply is growing fast too. 550 new apps a month = 550 new competitors every month.
The "found an idea, let me build it right away" reflex dies here; what sets you apart isn't the idea, it's **positioning**.

## 2. Revenue distribution — a brutal power law

| Slice | Annual/monthly revenue |
|---|---|
| Top **1%** | **$1M+ ARR** |
| Top **10%** | **$100K+ ARR** |
| Ranks 20–50 by review count | ~$50K – $500K **MRR** |
| Ranks 100–500 | ~$5K – $50K MRR |
| **Median app** | **< $1,000/mo** — and a non-trivial share earns **zero** |
| Realistic solo success | **$3,000 – $15,000/mo** after 12–18 months of work (top quartile) |
| Solo developer median | **< $1,000/mo** |

Reference peak: Judge.me ~36,000 reviews, entry plan $15 → estimated **$1–3M MRR**.
Loox 100,000+ active stores. These are 8–10-year-old businesses with teams; not a benchmark, a north star.

**Takeaway:** Your goal shouldn't be "dominate the App Store" but **entering the $3–15K/mo band
through a narrow niche**. That band is real, reachable, and supports a one-person business.

## 3. Pricing realities

| Metric | Value |
|---|---|
| **Median entry price** | **$9.99/mo** — more than 1,400 apps start at exactly this figure |
| Average entry price (mature categories) | ~$86 |
| Average app price (all plans) | ~$92 |
| Apps with a permanent free tier | **~45%** |
| Apps that ask for money before install | **~5%** |

**Average entry price by category:**

| Expensive categories | $/mo | Cheap categories | $/mo |
|---|---|---|---|
| Inventory & supply chain | **193** | Order management | 70 |
| Analytics & reporting | 147 | Shipping & logistics | 73 |
| Communication & collaboration | 109 | General e-commerce | 76 |
| Predictive analytics | 100 | | |
| IT & security | 95 | | |

**Takeaway:** $9.99 is a *default*, not a *ceiling*. "Money and operations" categories like
inventory/analytics can be priced 10–20× higher because the merchant knows what a mistake there
costs. **Pick the place where the pain has money behind it.** Same effort, 10× the price.

## 4. The merchant's app budget — the most critical table

| Merchant revenue band | Monthly app spend |
|---|---|
| < $1M/yr | ~$175/mo |
| > $20M/yr | $50,000/mo+ |

But look at the distribution (Storeleads, 3.59M active stores, May 2026):

| Monthly spend on apps | Number of stores | Share |
|---|---|---|
| > $100 | 65,441 | **1.82%** |
| > $500 | 7,966 | **0.22%** |
| > $1,000 | 1,602 | **0.04%** |

**This table is the entire business plan.** There is no "5.6 million merchants" market; there are
**~65K stores** that pay serious money for apps. Your target of $30/mo × 50 merchants is **0.08%** of that 65K pool.
Reachable — but only if you target that pool. Not if you chase the dropshipper on the free plan.

## 5. Churn — the most painful number in this business

| Metric | Value |
|---|---|
| Customers lost in the first **30 days** | **~40%** |
| Merchants who uninstall within the first **24 hours** | **14%** |
| Monthly churn, apps < $25/mo | **6.1%** |
| Monthly churn, apps > $1,000/mo | **1.8%** |
| Average monthly churn in subscription e-commerce | ~5% |
| Churn preventable if resolved at the first support contact | **67%** |

Trial length: in most categories a **7-day trial outperforms a 14-day one** —
it pushes the decisive merchant into a quick commitment and shrinks the "zombie trialist" pool.

**Let's do the math.** 6.1% monthly churn → average lifetime `1 ÷ 0.061 ≈ 16 months`.
For a $9.99 app, LTV ≈ **$164**. 1.8% monthly churn (expensive app) → lifetime ~55 months;
for a $99 app, LTV ≈ **$5,500**. Same effort, **33×** the value.

These two lines alone debunk the "cheap apps sell more" intuition.

## 6. How do merchants find apps?

- **~60% of installs start with search**: the merchant types the problem, scans the first screen,
  and most make their decision **on the first screen**.
- Ranking splits into two groups:
  - **Relevance signals** (are you visible): app name, subtitle, words in the description
  - **Quality signals** (how high up you are): **conversion rate** (share of listing viewers who install),
    **review count/rating/recency**, **retention** (fast uninstalls drag everything down)
- **Built for Shopify** badge: awarded to apps that pass the performance, security, data handling
  and theme integration requirements. Payoff: top search placement, eligibility for App Store homepage/category
  collections, appearing in the "Picked for you" recommendations inside the admin.
- Every recommendation surface, including Shopify's AI assistant (Sidekick), is fed by **your listing copy**.
  So your App Store listing isn't a marketing page, it's **the input to the search index**.

**Takeaway:** Listing copy isn't an "I'll write it later" job; it's the distribution itself. And since retention
directly affects ranking, **churn = invisibility**. They're the same problem.

## 7. Competitive density and gaps

**The saturated side:**
- The SEO category has **2,830 apps**, yet **89.8% of reviews go to just 83 apps**.
  So the category isn't "crowded", it's **locked**. Entering here means being invisible.

**Ecosystem averages (the baseline):**
- Average rating **4.49** — categories below this mean "dissatisfied" → opportunity
- Average of **92 reviews** per app

**Where demand outstrips supply:**
| Area | Data |
|---|---|
| Print on demand | Only **24 apps**, **581 reviews** per app (**6.3×** the average) |
| Six categories | **250+ reviews** per app (average 92) → merchants are searching and not finding |
| Accounting integrations | Only **58 apps** for QuickBooks, most mediocre-rated and expensive |
| Airtable / Monday / ClickUp / HubSpot | Very few or zero integrations on the Shopify side |

**Usage gaps (percentage of stores that DON'T have that type of app):**

| Category | Stores without the app |
|---|---|
| Support | **98.5%** |
| Subscriptions | 98.3% |
| Custom analytics | 98.2% |
| Reviews/ratings | 95.3% |
| Email | 70.7% |

Careful — these gaps can be one of two things: **there's a need but no product** *or*
**those stores don't need that thing** (small/dead stores). You only learn which by talking to them.
This table *generates* ideas, it doesn't *validate* them.

## 7b. Where does the money go, where is the gap? (August 2026 research)

**Breakdown of the merchant budget** — Eightx is the only source that breaks down spend (not installs):

| Merchant band | App spend/mo | What eats the budget |
|---|---|---|
| < $1M | $50–300 | Email (free tier), support, reviews — 3–5 apps |
| $1–5M | $1,000–3,500 | **Email + SMS ≈ 40% of the bill** (Klaviyo + Postscript/Attentive); subscriptions ~$300, reviews $150–300 |
| $5–20M | $5–15K | Support (priced by ticket volume) and SMS are the fastest-growing line items; search, loyalty, BI get added |
| $20M+ | $20–80K+ | "Other" (search, loyalty, fraud, BI, custom integration) overtakes the DTC core |

**Where $1M+ ARR apps live:** shipping/fulfillment, subscriptions (Recharge), returns (Loop),
reviews (Yotpo, Judge.me), bundles/upsell. $100K+ ARR apps sit in narrow slices of the same areas:
vertical subscriptions, carrier-specific shipping rules, B2B wholesale, returns automation, AI recommendations.

**Install volume (money ≠ volume):** cart customization 1.12M · reviews 1.12M · email 735K.
The top 100 apps are only 34% of installs — the long tail is real.

**Two different kinds of "gap" — don't confuse them:**
1. *Usage gap* (the table in §7: support 98.6%, subscriptions 98.3%…) → this is the **ceiling**, not demand;
   most of those stores are small/dead.
2. *Where demand outstrips supply* (reviews per app ≫ 92): print on demand (581/app), accounting
   integrations (QuickBooks 58 apps, mediocre), Airtable/Monday/ClickUp/HubSpot ↔ Shopify ≈ zero.
3. *What multiple sources call "underbuilt":* B2B wholesale, multi-currency / international tax,
   headless tooling, commerce-focused AI support that works **inside the existing helpdesk** (not another
   chat widget), Shopify-specific analytics, Plus operations tooling, vertical subscription management
   (failed payments, self-service).

**Locked (don't enter):** SEO, upsell/cross-sell (1M reviews, 1,003 apps), page builders, image
optimization, back-in-stock, abandoned cart.

**Decision:** The intersection of high budget share + high price tolerance + thin supply is
**the operations of $1–20M merchants**: subscription edge cases, returns, accounting/ops integration,
analytics. The most money goes to email/SMS, but that's Klaviyo's — you don't compete there, you integrate.

**Cheap proof:** A one-sentence problem DM to 20 merchants in the $1–5M band from Storeleads.
If 5 confirm the pain, that's the app.

*Sources:* [Eightx](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026) ·
[Week One Labs](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026/) ·
[StoreInspect](https://storeinspect.com/report/state-of-shopify) · [StoreCensus](https://www.storecensus.com/stats) ·
[Craftberry](https://craftberry.co/articles/shopify-app-store-statistics) · [AppOpportunity](https://appopportunity.com/blog/underserved-app-niches-2026)

## 8. The rules of money (between you and Shopify)

| Topic | Rule |
|---|---|
| Registration fee | **$19** one-time (per Partner account) |
| Revenue share | **0% on the first $1M in lifetime earnings**, **15%** above that |
| Important change | Since Jan 1, 2025 the threshold is **lifetime**, not **reset annually**; pre-2025 earnings don't count |
| Large developer exception | $20M+/yr in App Store revenue or $100M+ company revenue → 15% on all revenue |
| Payments | **Billing API** is mandatory — Stripe/PayPal/external forms are **prohibited** |

In practice: up to the first million dollars you pay Shopify **zero** commission. For a solo developer,
that's a genuinely generous range.

## 9. Review — why apps get rejected

| Rejection reason | Note |
|---|---|
| **GDPR webhooks missing/wrong** | **More than 60%** of rejections are at least partly due to this |
| No security headers (clickjacking protection) | Mandatory for embedded apps |
| Using third-party cookies for sessions | Session tokens must be used |
| Not cleaning up on uninstall | Code injected into the theme must not be left behind |
| Broken functionality, 404/500 pages | Simple but frequent |
| Requesting excessive permissions (scopes) | Every unjustified scope is a risk |
| Misleading listing | Screenshot/promise mismatch |
| Taking payment outside the Billing API | Straight rejection |

**Takeaway:** Most rejection reasons are **compliance, not product quality**.
Which means a checklist can prevent them. Write the GDPR webhooks on day one — not at the end.

---

## 10. The 8 decisions that follow from all this data

1. **Category choice = merchant revenue choice.** There are ~65K stores paying >$100 for apps; they're the target.
2. **Escape the $9.99 trap.** Inventory/analytics/operations categories are priced in the $100–190 band.
3. **Price ↑ → churn ↓.** 6.1% vs 1.8% monthly churn means a ~33× difference in LTV.
4. **The first 24 hours decide your fate** (14% uninstall the same day). Shortening TTV is job number one.
5. **Support isn't a cost, it's a retention channel.** 67% of churn is preventable if resolved at first contact.
6. **Listing copy = distribution.** 60% of installs come from search; ranking looks at conversion + reviews + retention.
7. **Don't enter locked categories.** In SEO, 89.8% of the reviews across 2,830 apps sit with 83 apps. Pick a narrow niche.
8. **Write compliance on day one.** GDPR webhooks, security headers, uninstall cleanup.

### Target math (with this data)

```
Target: $3,000/mo MRR
Price $49/mo (below the average, far above the $9.99 trap)
→ 61 paying merchants needed
Assuming 5% monthly churn → ~3 lost every month, need to be replaced
Assuming 20% install→paid conversion → ~15 installs a month is enough
```
15 installs a month is a reachable number in a target pool of ~65K stores.
**Key assumptions** (5% churn, 20% conversion) are estimates until validated — measure in Phases 5–7.

---

## 11. Sources

- Revenue distribution and solo benchmarks: [Week One Labs](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026/) · [GapQuery — How much do Shopify apps make](https://www.gapquery.com/blog/how-much-do-shopify-apps-make)
- Pricing: [Taylor Sicard — App Pricing Benchmarks 2026](https://taylorsicard.com/blog/shopify-app-pricing-benchmarks-2026) · [ShopifyPricing](https://shopifypricing.com/app-costs)
- Merchant app spend: [Eightx — App spend by revenue band](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026) · [Storeleads](https://storeleads.app/reports/shopify)
- Churn: [appstoreresearch — Subscription churn](https://appstoreresearch.com/blog/shopify-subscription-churn) · [Oxify — Retention playbook](https://oxify.app/blog/shopify-app-retention-playbook)
- Discovery and ranking: [Prys — App Store ranking factors](https://prys.io/learn/shopify-app-store-ranking-factors) · [Built for Shopify (official)](https://shopify.dev/docs/apps/launch/built-for-shopify)
- Gap analysis: [GapQuery — High demand low supply](https://www.gapquery.com/blog/shopify-high-demand-low-supply) · [GapQuery — 13,786-app analysis](https://www.gapquery.com/guides/shopify-app-ideas) · [StoreInspect](https://storeinspect.com/report/state-of-shopify)
- Revenue share (official): [shopify.dev — Revenue share](https://shopify.dev/docs/apps/launch/distribution/revenue-share)
- Review process: [shopify.dev — App Store review](https://shopify.dev/docs/apps/launch/app-store-review/index) · [Gadget — Pass the review first time](https://gadget.dev/blog/how-to-pass-the-shopify-app-store-review-the-first-time-part-1-the-technical-bit)

*Most third-party data is an estimate. Go to the source before deciding; update the date.*
