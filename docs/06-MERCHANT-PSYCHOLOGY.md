# Merchant Psychology — Who Pays, When, and How Much?

> You can't set a price or pick a feature without knowing the person you're selling the app to.
> This file: merchant segments, what they pay for at each level, why they install and why they
> uninstall, and **which tools they actually use**.
>
> Verified: **August 2026**. Labels: 🟢 primary/measured · 🟡 third-party crawl ·
> 🟠 analyst blog · 🔴 vendor marketing (caution)

---

## 0. Before anything else, this one fact

The Shopify merchant base **is not a market of businesses.** It's a long tail of half-dead stores
with a thin layer of real companies on top.

| Metric | Finding |
|---|---|
| Stores spending **$100+/month** on apps | **1.82%** (65,441 / 3.59M) 🟡 |
| $500–999/month | 0.18% (6,364) 🟡 |
| **$1,000+/month** | **0.04%** (1,602) 🟡 |
| Stores with no detectable app at all | 14–18% 🟡 |
| Stores running **0–2 apps** | **76.4%** 🟡 |
| Median app count | **2** (P90 = 6, P99 = 14) 🟡 |

> ### 🚨 **The market that pays for apps ≈ 65,000 stores. Not 3 million.**
> That sentence reframes any app business plan.

❌ **"The average merchant spends $120/month and uses 6 apps"** — that's the **mean** of a wildly
skewed distribution. The median store spends practically **$0**. A pricing model built on that
average is built on a store that doesn't exist.

---

## 1. Shopify's own plans (2026)

| Plan | Monthly | Annual (monthly equivalent) |
|---|---|---|
| Starter | $5 (payment links only) | — |
| **Agentic** *(new, Apr 2, 2026)* | **$0** + 2.9% + $0.30/sale | — |
| Basic | **$27–39** ⚠️ | $19–29 |
| Grow *(formerly "Shopify")* | **$72–105** ⚠️ | $54–79 |
| Advanced | $399 | $299 |
| **Plus** | **$2,300** (3-year) / **$2,500** (1-year) | — |

⚠️ Sources conflict on Basic and Grow: the live `shopify.com/pricing` page shows $27/$72,
March 2026 sources say $39/$105. Advanced and Plus are **identical across every source**. There may
have been a price cut between March and May 2026, but no announcement could be found.

**The gates that matter:**

| Feature | Basic | Grow | Advanced | Plus |
|---|---|---|---|---|
| Additional staff accounts | **0** | 5 | 15 | Unlimited |
| Headless storefronts | 1 | 1 | 1 | **25** |
| B2B catalogs | Up to 3 | Up to 3 | Up to 3 | **Unlimited** |
| Checkout customization | Limited | Limited | Limited | **Full** |
| **API rate limit** (GraphQL) | **100 points/sec** | 100 | **200** | **1,000** |

⚠️ Many 2026 blogs still write 50/100/500 points/sec — **stale by a factor of two**. The official page
says the above. Plus's advantage is **10x**.

**No longer Plus-only:** B2B (up to 3 catalogs on all plans), Shopify Functions, basic checkout
extensibility. **Still Plus-only:** full checkout extensibility + Checkout Branding API, Launchpad,
Audiences, unlimited staff, per-market checkout blocks.

---

## 2. The five segments

| | **Hobbyist** | **Dropshipper** | **Growing DTC** | **Established brand** | **Plus / enterprise** |
|---|---|---|---|---|---|
| **Monthly revenue** | $0–2K (mostly 0) | $0–20K, very volatile | $80–400K | $400K–1.7M | $1.7M+ |
| **Plan** | Basic (usually trial/$1 promo) | Basic | Basic → Grow | Grow / Advanced | Plus |
| **App count** | 0–2 | 3–6, mostly free | 6–9 | 10–12 | 12–25+ |
| **Monthly app budget** | **$0–15** | $0–60 | **$1,000–3,500** 🟠 | $5,000–15,000 | $20,000–80,000 |
| **Who decides** | Owner, alone, on impulse | Owner + YouTube/TikTok guru + Facebook group | Founder, sometimes the first marketer | E-commerce manager recommends, founder approves | E-commerce director + **agency recommendation**; procurement/security review above |
| **What they care about** | Make it free. "Doesn't Shopify already do this?" | Speed to first sale, conversion hacks, ROAS | **Provable revenue lift**, setup time, don't break the theme | Reliability, support speed, reporting, don't break checkout | Integrations (ERP/PIM/OMS/3PL), permissions, contract, roadmap |
| **Buying trigger** | Never — until something breaks | A guru said so | **A bottleneck expressed as a number** | A team member's time is being wasted | An agency or a known operator named the brand |

**Context** 🟢: Shopify's own Gallup study (46,993 US adults, May 2024) found that **35% of
entrepreneurs run their business alongside a 9-to-5**, and **18% started it as a side hustle**.

**App count scales with traffic, not ambition** 🟡:

| Monthly traffic | Avg. apps | Median |
|---|---|---|
| Under 50K | 1.8 | 1 |
| 50–200K | 5.5 | 4 |
| 200K–1M | 7.1 | 6 |
| 1M+ | 7.4 | 7 |

⚠️ It plateaus around ~7 at the top because crawlers **can't see admin-only apps** — which are
exactly what the big brands actually use.

---

## 3. The price ladder — what gets approved, what gets stuck

| Price | Merchant's reaction |
|---|---|
| **$0** | The default expectation. **45–46%** of apps offer a free plan/trial; merchants have been trained to assume "there's a free one" |
| **$5–15** | **Approved without thinking.** In the merchant's own words: *"$5–10 a month is defensible for a feature Shopify should already offer."* |
| **$19–30** | The volume sweet spot. **Median entry price is $9.99** |
| **$50–99** | Requires a stated ROI justification. Trial length and case studies start to matter here |
| **$100–300** | Requires **a named line item** in the budget. Only 1.8% of stores are here in total app spend |
| **$300+** | Triggers **open anger** unless it replaces a hire or a contract |
| **Revenue share (%)** | **The most hated model of any price.** *"Some guy wrote an app, what does it have to do with my sales? Is he my partner?"* |

**What justifies $100+** (operator consensus):
1. It replaces or prevents a hire (helpdesk, subscription ops, returns)
2. It sits **on the money path** and the lift is attributable (email/SMS, subscriptions, upsell)
3. It carries a workflow the business can't run without → **these are also the lowest-churn apps**
4. Operator rules of thumb in circulation: **at least 3x ROI** and **the total app stack shouldn't exceed 1–3% of revenue**

## 4. Funnel and conversion 🟠

Shopify **publishes no official benchmarks.** The best analyst figures:

| Stage | Value |
|---|---|
| Listing view → install | **3–8%** when well positioned · **1–2%** (<25 reviews) · **5–8%** (200+ reviews) |
| Install → **paying** | **8–18%** with strong onboarding; **2–5%** with weak UX. Range across all apps: 3–55% |
| Listing view → paying (end to end) | Median app **under 1%**; the best **5%+** |
| Monthly churn | **5–12%** typical. Low end: subscriptions/fulfillment. High end: popups, image optimizers, generic SEO |

⚠️ The widely circulated **"48.8% opt-out vs 18.2% opt-in trial conversion"** figure is not Shopify
data; it's a **general SaaS/mobile** statistic.

## 5. Why do they install? — discovery and trust

**Discovery:** **60–70% of installs** start with an App Store search (⚠️ neither figure is
first-party and they contradict each other). The merchant types the problem, scans the first
results and mostly decides **on the first screen**. The first screenshot, the subtitle and the first
sentence do all the work.

**Trust signals, ranked by strength of evidence:**

1. **The Built for Shopify badge** — the strongest documented lever: apps that earn the badge see
   **an average 49% lift in new installs within 14 days** 🟢. Also priority in search, homepage
   placement and priority in "Picked for you". The condition is explicit: **no more than a 10-point
   drop** in store speed.
2. **Review count and freshness.** Shopify's rating is a **weighted average**: helpfulness votes,
   review detail, **recency** and length of use all factor in 🟢. In practice, the listing
   view-to-install rate goes up **~4x** when moving from <25 reviews to 200+.
   > 🚨 **July 2026 — Shopify cracked down on the review economy.** From the Jul 6, 2026 changelog:
   > *"When we detect that an app has been incentivizing reviews, **we will remove a significant
   > portion of its reviews.** We have already identified apps engaging in this practice."* Fake
   > review detection is also being run **retroactively** — *"a meaningful portion"* of existing
   > reviews will be taken down. The policy didn't come from Shopify's own detection but from
   > **community pressure** (a developer documented removing their incentive banner, watching
   > review growth stop, then putting it back while hiding the banner from dev stores).
   > **For us:** shortcuts like "free for life in exchange for a review" now cost retroactive review
   > loss. Earn reviews **with product quality**. Shopify's next announced target is **app naming
   > and copycat apps**.

3. **Rating floor.** The ecosystem average is **4.49**. 17% of apps sit below 4.0 — and below 4.0
   is practically **a dead listing**.
4. **"What merchants think" AI summaries** now appear on listings 🟢 → the **themes in the reviews**
   matter more than the star average.
5. **Peer and agency recommendation** — **on the rise** compared to browsing the App Store 🟠.
   Above ~$5M, **the agency is usually the real decision-maker**.

## 6. Why do they uninstall? — the most actionable finding

**Shopify's official uninstall reason options** (Partner Dashboard, Apr 29, 2026 update) 🟢:
I'm trying multiple apps · store is closing/pausing · not using it right now ·
not satisfied with the features · not satisfied with **support** · **too expensive** ·
doesn't work properly with my store · other.

Note: **two of the eight options aren't even product failures** (trying apps, store closure) —
perfectly consistent with the dead-store base rate.

**The real reasons extracted from the content of 1–2 star reviews** 🟢:

| Complaint | Share of 1–2 star reviews |
|---|---|
| **Billing issue** (charged after uninstall, surprise charge) | **19.2%** |
| Bugs / quality not meeting expectations | 13.9% |
| Onboarding difficulty | 4.4% |

> ### 🚨 Billing anger is **4x** onboarding friction.
> Merchants forgive a clumsy setup; **they don't forgive a surprise charge.**
> Transparent, flat, surprise-free billing + clean uninstall behavior is **a bigger competitive
> moat than any feature**.

The structural trap: Shopify's own help page warns merchants — **even if you pause the store, app
charges continue unless you uninstall the app** 🟢. A good chunk of that 19.2% comes from here.

**Churn timing** (from 03): **40%** lost in the first 30 days, **14% uninstall within the first
24 hours**, and **67% of churn is preventable if resolved at the first support contact**.

## 7. The "apps slow down my store" fear

A real objection, but **the data says the opposite of folk wisdom**:
- Its institutionalized form: the BFS badge requires a **≤10 point** speed impact 🟢.
- ⚠️ Counter-evidence 🟡: app count correlates **positively** with StoreInspect's quality score
  (0 apps → 43; 11–15 apps → 100) and **94%** of "bloated" stores are **Shopify Plus**.
  **Apps don't grow the store; big stores buy apps.**
- So anyone selling "app bloat is killing you" is selling a **confounding variable**.

**What it means for the developer:** performance fear isn't a ceiling on install intent, it's **an
objection to pre-empt on the listing** (BFS badge, "0 scripts on the storefront", theme app block
architecture).

## 8. What do merchants actually use?

⚠️ All penetration figures are **floor values**: crawlers only see an app through its storefront
signature; admin-only tools (Flow, ERP, 3PL, accounting, most checkout apps) are **invisible**.
The ShipStation example: 724 detected vs a claimed 1.3M customers — a **~1,000x** gap.

### Most-installed apps (Storeleads, 3,027,755 stores, Aug 21, 2026) 🟡

| App | Stores | Share |
|---|---|---|
| Judge.me (reviews) | 619,657 | **20.5%** |
| Klaviyo (email/SMS) | 422,827 | **14.0%** |
| Shopify Inbox | 359,554 | 11.9% |
| Klarna On-Site Messaging | 347,293 | 11.5% |
| Instafeed | 241,724 | 8.0% |
| Shopify Forms | 207,211 | 6.8% |
| PageFly | 193,079 | 6.4% |
| Mailchimp | 144,312 | 4.8% |
| Printful | 140,388 | 4.6% |

### On Plus stores (n≈74,777) 🟡
Shop Pay 62.7% · PayPal 60.2% · **Klaviyo 50.3%** · Klarna 19.0% · **Gorgias 13.4%** ·
**Triple Whale 11.4%** · Yotpo 9.3% · Okendo 6.1% · Attentive 5.8% · Loop Returns 3.7%

> ### 🔑 The cleanest maturity indicator: **Klaviyo, 14% across all of Shopify — 50.3% on Plus.**
> Past checkout and Klaviyo, **everything falls off a cliff**: even on Plus, the 3rd tool is at
> 50%, the 6th at 13%. The "standard DTC stack" is largely a myth.

### Category penetration 🟡

| Category | Percentage of stores |
|---|---|
| Email marketing | **35–38%** |
| Product reviews | **23–25%** |
| Support / live chat | 10.6% |
| Loyalty | 6.8% |
| Page builder | 5.8% |
| Upsell / cross-sell | 5.6% |
| SEO | 3.8% |
| Subscriptions | 2.6% |
| Custom analytics | 1.9% |

**Only two categories have mass adoption: email and reviews.** The rest is niche — and a new app
entering that niche **isn't being added, it has to replace something.**

**Penetration climbs steeply with store size** (by monthly traffic):
email 24.8% (<50K) → **74.7%** (200K–1M) · support 4.6% → **44.0%** ·
analytics 1.0% → **24.6%**. Plus/standard multipliers: upsell **29x**, analytics **15.9x**,
support **8.8x**, loyalty **6.9x**.

### Typical stack and spend by stage 🟠

| Revenue | Monthly app spend | Stack |
|---|---|---|
| **<$1M** | $50–300 | Klaviyo free · Shopify Inbox · Judge.me free · PageFly |
| **$1–5M** | $1,000–3,500 | Klaviyo paid · Gorgias Basic · Recharge · Postscript · Yotpo/Okendo · **no attribution** |
| **$5–20M** | $5,000–15,000 | Klaviyo advanced · Gorgias Pro · Smile · search · Triple Whale/Polar · Loop |
| **$20–100M** | $20,000–80,000 | Enterprise tiers · **Attentive replaces Postscript** · NetSuite · CDP · Signifyd |

**Non-Shopify tools (at every stage):** Meta Ads, Google Ads, TikTok, GA4, Microsoft Clarity,
Slack, Notion/Airtable, a 3PL portal.

### Pricing model examples — the real lesson
- **Klaviyo:** $20 at 500 profiles → $150 at 10K → $720 at 50K → ~$2,300 at 250K.
  It bills **by stored profiles, not messages sent** — that's the bill-shock mechanism.
- **Recharge:** $99/month + 1.49% + $0.19/transaction. At $5M subscription GMV, **$78,063 a year =
  1.56% of GMV.** Skio/Loop/Smartrr exist precisely because of this — and none of them has
  toppled it. **The moat isn't the product, it's the cost of migrating live subscriptions.**
- **Okendo:** $19 on the listing, real cost at volume **$349–1,200**. The 5–20x gap between the
  listed entry price and the real mid-market cost is the category's business model itself.
- **AI support** has standardized at ~**$0.90–1.00 per resolved conversation** (Gorgias, Intercom Fin).

### Trends — the most relevant signal for "where to build" 🟡
- **Shrinking:** AfterShip tracking **−6.7%** · Route **−6.0%** · ShipBob **−10.8%** ·
  Easyship **−30.9%** (year over year)
- **Growing:** Loop Returns **+16.5%** · AfterShip Returns **+9.6%** · Narvar **+11.6%** ·
  Rebuy **+28.3%** · Richpanel **+23.6%** · Klaviyo **+18.7%** (outpacing the platform's +11%)
- **Ad channels:** Google 35.8% · Meta 23.2% (saturated) · **TikTok +37.2%** ·
  **Pinterest +47.5%** (the growth is in the challengers)

**While post-purchase tools shrink, only returns are growing.** If you're picking a category, this
divergence is the most decision-relevant number in the data.

### ⚠️ Agentic commerce reality check
OpenAI's **Instant Checkout** was announced in September 2025 with the promise of *"more than 1
million Shopify merchants coming soon"*; **fewer than 30 merchants went live** and it was **shut
down in March 2026** (*⚠️ sourced from CNBC, needs primary verification*). Meanwhile **89% of
merchants are "preparing for agentic commerce"** but only **3%** of transactions involve an AI agent.

**Lesson:** build for AI **discovery** (Shopify's model — checkout stays with the merchant),
not for AI **checkout**.

## 9. Where do merchants ask for recommendations?

| Place | Who's there |
|---|---|
| **community.shopify.com** | Mostly beginners. ⚠️ **The Plus board is tiny (3,118 topics)** — serious operators aren't here. But the app-pricing rage threads are here, and they're valuable as a demand signal |
| **eCommerceFuel** | **Paid and vetted**: the 7-figure tier is **$1M+ revenue / $199/month**, the 8-figure tier **$10M+ / $299/month**. Members' combined GMV is claimed at ~$13B. **If you want to reach real operators, this is the only place where the entry requirement is audited** |
| r/shopify, r/ecommerce, r/dropship | ⚠️ Member counts couldn't be verified. Mostly beginners and dropshipping. **Valuable as a source of objections, not as buying power** |
| Agency channels | Above ~$5M the agency is usually the real decision-maker |
| **Shopify Sidekick** | 🟢 Now **an official discovery surface** — the merchant describes a need and gets app recommendations |

### Facebook groups — where it looks big and is small

⚠️ Facebook member counts couldn't be verified directly (login wall); the figures below are
secondary-source estimates, with **up to 3x** variance between sources.

| Group | Members (est.) | Who's there |
|---|---|---|
| Dropify, Shopify Newbies, Ecom Empires, eCommerce Elites | 90K – 152K | **Beginner/dropshipper dominated.** Huge audience, near-zero ability to pay |
| Shopify Entrepreneurs | ~110K | Moderated, posts go through approval; app/theme developers explicitly welcome. Mixed but useful |
| **Shopify Plus Community** | **~9.3K** | **Run by Shopify itself, Plus merchants only.** 236 posts a month — the highest activity per member |
| **Million Dollar Sellers** | **752** | 7–9 figure founders with verified revenue, ~$7,500/month dues. Has its own Shopify sub-group |
| Unofficial Shopify Podcast Insiders | ~4K | Must own a store |

**Three structural facts:**
1. **Real operators total under 15K** — about ~1% of the raw member counts in these reports,
   but they account for the bulk of the spend.
2. **Rule #1 of every serious group bans exactly what a vendor wants to do.**
   The only documented legitimate channel: posting in the Shopify Plus Community on Thursdays under
   the **`#partnerthursdays`** tag, and answering "what should I use for X" questions **as a
   participant**. Cold DMs count as a **scam signal** in the communities' own guides.
3. **The incumbents in this space didn't market to the groups — they founded the groups.**
   Trackify (50K), Helium 10 (48K), EcomHunt (84K), Spocket, Viral Launch are all vendor-owned.

Shopify's own official advice points the same way: *"Be careful when promoting your app, it can be
considered spam… if merchants are happy with your app, they'll recommend it to others anyway."*

---

## 10. Five conclusions for an app builder

1. **The buyer is not the merchant base** — **~1.8%** pay $100+/month (65,441 stores) and ~7% pay
   anything at all. The rest is free-tier tourism.
   **Price and position for 65K stores, not 3 million.**
2. **Billing anger is 4x onboarding friction** (19.2% vs 4.4%). Transparent pricing + clean
   uninstall is a bigger moat than any feature. **Stay away from the revenue-share model** — it's
   hated regardless of the math.
3. **Reviews compound**: 1–2% install rate at <25 reviews, 5–8% at 200+. 35% of apps have no
   reviews at all. **The BFS badge + the first 200 reviews** is the entirety of early growth —
   but ⚠️ since July 2026, **incentivized reviews are grounds for retroactive review removal**.
4. **Only email (35–38%) and reviews (23–25%) are mass-market.** Everywhere else you're not adding,
   **you're replacing** — and those two categories are already locked up (Klaviyo, Judge.me).
5. **The $5–15 band is where the merchant stops thinking**, but that's also where the churn is.
   The $99 band requires a budget line item but **lifetime triples**.
   This is where the LTV math in the [ecosystem data](03-ECOSYSTEM-DATA.md) comes in.

---

*Sources: [Eightx — app spend by revenue band](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026) · [Eightx — app bloat report](https://eightx.co/blog/shopify-app-bloat-report-2026) · [StoreInspect — app bloat](https://storeinspect.com/blog/shopify-app-bloat) · [StoreInspect — market share](https://storeinspect.com/blog/shopify-app-market-share) · [Storeleads — State of Shopify](https://storeleads.app/reports/shopify) · [Taylor Sicard — pricing benchmarks](https://taylorsicard.com/blog/shopify-app-pricing-benchmarks-2026) · [Week One Labs — revenue benchmarks](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026/) · [Convert2x — funnel benchmarks](https://convert2x.com/learn/fix-shopify-app-conversion-funnel) · [Shopify — Built for Shopify updates](https://www.shopify.com/partners/blog/built-for-shopify-updates) · [shopify.dev — uninstall reasons](https://shopify.dev/changelog/update-to-app-uninstall-reasons) · [shopify.dev — managing reviews](https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews) · [shopify.com/pricing](https://www.shopify.com/pricing) · [shopify.dev — API limits](https://shopify.dev/docs/api/usage/limits) · [Klaviyo Q2 FY2026 transcript](https://www.fool.com/earnings/call-transcripts/2026/08/12/klaviyo-kvyo-q2-2026-earnings-call-transcript/) · [Shopify Community — app pricing discussion](https://community.shopify.com/t/the-price-of-apps-is-completely-out-of-control/419098) · [eCommerceFuel](https://www.ecommercefuel.com/)*
