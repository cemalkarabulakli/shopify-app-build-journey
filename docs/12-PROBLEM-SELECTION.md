# Choosing the Problem — The Painkiller Workshop

> [03-Ecosystem Data](03-ECOSYSTEM-DATA.md) says where the money is. [06-Merchant Psychology](06-MERCHANT-PSYCHOLOGY.md)
> says who pays and how much. This file is the **method that turns those two into one sentence**: the
> single merchant pain this app kills, named so precisely that a stranger recognises it in five seconds.
>
> It is a workshop, not an essay. Every section ends with something you produce. Run it on real data —
> the script in `scripts/pain-mine.mjs` works on the reviews already saved in `outreach/`.
> Written: September 2026.

---

## 0. The only distinction that matters: painkiller vs vitamin

A **vitamin** is nice to have. The merchant nods, says "cool", installs it, forgets it, uninstalls in
week three. A **painkiller** stops something that is actively costing them money, hours or sleep. They
do not need a trial to understand it; they need to know when it starts.

Four tests. A painkiller passes all four.

| Test | Vitamin | Painkiller |
|---|---|---|
| **Is it bleeding?** | "Would be nice to see better analytics" | "I am billed $499/mo and it still doesn't work" |
| **Do they already pay to avoid it?** | Nothing, they live with it | An agency, a VA, a spreadsheet, a worse app |
| **Can they name the number?** | "It's annoying" | "Over 10% of our recurring revenue" |
| **Would they notice it gone tomorrow?** | No | Immediately |

The reason most solo apps die is not bad code. It is shipping a vitamin with a painkiller's build cost.

**Produce:** write your candidate problem as one sentence. If it contains "better", "easier" or
"more efficient", it is a vitamin. Rewrite until it contains a number and a consequence.

---

## 1. Picking the niche: the starving-crowd test

Before the problem comes the crowd. Hormozi's four criteria, translated to Shopify:

1. **Pain** — are they complaining in public, unprompted, right now? App Store 1-star reviews, the
   Shopify Community forum, r/shopify, the Facebook groups in [06](06-MERCHANT-PSYCHOLOGY.md#9-where-do-merchants-ask-for-recommendations).
2. **Purchasing power** — does this segment already pay for apps? [06](06-MERCHANT-PSYCHOLOGY.md) has the
   price ladder by merchant stage. A store doing €2k/month does not have a €300/month budget, no matter
   how much it hurts.
3. **Easy to target** — can you build a list of them by name this week? If you cannot produce 200 named
   stores in two days, the niche is not addressable for a solo founder with no ad budget.
4. **Growing** — is the segment expanding? Subscriptions, B2B, cross-border EU compliance and agentic
   commerce are growing; generic "product reviews" is not.

A niche that fails #3 is the most common trap: real pain, real money, no way to reach them alone.

**Produce:** name the segment in one line — *category + stage + platform signal*. Example:
"Shopify subscription brands past ~300 active subscribers, currently on a percentage-fee billing app."
That is a list you can build. "DTC founders" is not.

---

## 2. Where pains come from, ranked by cost to you

| Source | Cost | Signal quality | What it gives |
|---|---|---|---|
| **1–2★ reviews of competitors** | Free, one evening | Very high — written while angry, with numbers | The exact words, the store name, the tenure |
| **Support/community threads** | Free, hours | High | Recurring, unsolved problems and workarounds |
| **Your own operating experience** | Already paid | Highest | The pain you have personally felt (see [11](11-BRAND-AND-SCALE.md)) |
| **Merchant interviews** | 10 × 30 min | High, but biased by your questions | Why they pay, what they tried, what it costs |
| **Surveys / reports** | Free to read | Medium — aggregate, lagging | Whether the pain is big and growing |
| **Keyword tools** | Cheap | Low on its own | Demand volume, not pain intensity |

The order matters. Reviews first, because they are free, dated, attributed, and written by someone who
is angry enough to be specific. Interviews second, because they are expensive and you should arrive
with a hypothesis, not a blank page.

---

## 3. The workshop, step by step

### Step 1 — Harvest

Pick the 3–5 biggest apps in your candidate category. Open the App Store listing, filter reviews to
1 and 2 stars, save each page, then:

```bash
node outreach/parse-reviews.mjs <app-label> outreach/<app>-p*.html >> outreach/prospects.csv
```

You want 150+ reviews before the numbers mean anything. Fewer than 50 and you are reading noise.

### Step 2 — Mine

```bash
node scripts/pain-mine.mjs outreach/prospects.csv
```

It prints three things: pains ranked by **recent** volume, the pairs that appear together, and every
review that quotes a number. The categories live at the top of the script — edit them for your category
rather than trusting mine.

### Step 3 — Read it correctly

Three rules, each of which reverses a mistake most people make:

- **Recent beats lifetime.** A pain that dominated 2021 and faded has been fixed, or the angry cohort
  has left. Rank by the last two years only.
- **Pairs beat singles.** A single pain is a feature request. Two pains that always appear together are
  a story — and the story is what the landing page says.
- **Numbers beat adjectives.** "Expensive" is a sentiment. "Over 10% of our recurring revenue" is a
  value pool, a price ceiling and an opening line for a DM, all at once.

### Step 4 — Interview the ten loudest

The reviews quoting a number are your first calls. They have already written the problem down in
public, so the interview is short. Keep it in the past tense and never pitch — that is the whole of
the Mom Test:

1. Walk me through the last time this happened.
2. What did you do about it? What else did you try?
3. How much time or money did that cost you that month?
4. Who else in the company felt it?
5. What would have had to be true for you to switch sooner?
6. What stopped you from leaving?

Ban: "would you use", "do you like", "how much would you pay". Answers to those predict nothing.

**Produce:** ten filled-in answer sheets and a one-page list of the exact phrases they used. Their
words become your headline; your words become nobody's headline.

### Step 5 — Write the problem statement

One sentence, five slots:

> **[segment]** loses **[number]** to **[event]** because **[cause]**, and today they cope by **[workaround]**.

If any slot is empty, you are not ready to build. The workaround slot is the most important one: it
proves the pain is already worth money to them.

### Step 6 — Price it off the value pool

Value pool = what the pain costs them per year. Charge 1–10% of it. A merchant paying "over 10% of
recurring revenue" in fees on, say, $40k/month of subscription revenue is losing ~$48k/year; a flat
$299/month ($3,588/year) is 7% of that pool and reads as obviously cheap. This is Hormozi's value
equation with the numerator borrowed from the merchant's own invoice.

---

## 4. The five-question painkiller test

Before writing a line of product code, answer these in writing:

1. **Who exactly?** A list of 200 named stores exists, or it does not.
2. **What does it cost them?** A number they said out loud, not one you modelled.
3. **What do they do today?** A named competitor, agency, VA or spreadsheet.
4. **Why hasn't the incumbent fixed it?** If there is no structural reason (their pricing model, their
   scale, their roadmap), they will fix it and you are dead.
5. **What is the cheapest proof?** A landing page, a deposit, ten DMs — something that takes days, not
   weeks. Deliver the first one by hand.

Question 4 is the one people skip. "Recharge charges a percentage" is structural: their revenue model
*is* the pain, so they cannot remove it without breaking their business. That is a defensible wedge.
"Their UI is dated" is not — a redesign kills you in a quarter.

---

## 5. Applied: what this repo's own data says

Run against `outreach/prospects.csv` — 189 one- and two-star reviews of Recharge, Seal and Skio,
2019–2026, 59 of them from 2024 onwards.

| Pain | Recent (2024+) | Lifetime | Share of recent |
|---|---|---|---|
| Fees / price rises | 26 | 55 | 44% |
| Support unresponsive | 22 | 75 | 37% |
| Bugs / downtime | 8 | 37 | 14% |
| Lock-in / migration | 7 | 22 | 12% |
| Cancel / pause fails | 7 | 10 | 12% |
| Setup complexity | 4 | 25 | 7% |
| Portal / checkout | 3 | 19 | 5% |

Pairs that travel together: bugs + support (17), fees + support (14), fees + setup (9), fees + lock-in (7).

**Five findings, in order of consequence:**

1. **Lifetime data would have picked the wrong headline.** Support is the loudest pain across all seven
   years (75 vs 55), but in the last two years fees overtake it. The `/switch` page leads with fees.
   The recent data backs that; the lifetime data would not have.
2. **The second line should be a human answering.** Support appears in 37% of recent reviews and pairs
   with everything. "Flat price" wins the click; "a human answers, and it's the person who built it"
   wins the call. Both belong on the page, in that order.
3. **The angry are not new users.** 100 of 189 had been paying for over a year, 51 for months, only 38
   for under a month. This is not an onboarding complaint — it is people who invested, got locked in,
   then got repriced. That is exactly the migration offer's audience.
4. **21 reviews quote a number.** Those are the first twenty-one calls, not a segment to nurture. The
   strongest is a US store stating fees "over 10% of our recurring revenue"; others name $99, $499 and
   a jump from ~$2/month to over $100/month.
5. **The list is 87% English-speaking** (US 109, UK 17, CA 15, AU 11, NZ 8). No translation work is on
   the critical path.

**The problem statement this produces:**

> Shopify subscription brands past their first year on a percentage-fee billing app lose 1–10% of
> their recurring revenue to billing fees that rise without warning, because the incumbent's revenue
> model is a cut of theirs, and today they cope by absorbing it — because moving subscribers feels
> impossible.

Every clause is sourced to a quoted review. The offer on `/switch` answers it clause by clause: flat
price locked for life (the fee), white-glove migration in 14 days (the "impossible"), native Shopify
contracts (the lock-in), refund-plus-12-months if a subscriber is lost (the risk).

**The honest status line:** 189 prospects, 0 DMs sent, 0 replies, 0 calls, 0 deposits. The analysis is
done. The constraint is not more analysis.

---

## 6. The ecosystem-wide pain map (September 2026)

Your own category's reviews tell you what to build. This table tells you whether the pain is big,
growing, and worth a year of your life. Every number is sourced; anything marked *unverified* was only
found second-hand and should not be repeated as fact.

### 6a. The finding that should change how you choose

Three independent review-mining studies, run across the whole App Store, all land in the same place:
**merchants leave over trust, not over missing features.**

| Study | Sample | Billing complaints | Support complaints | Broken | Missing feature |
|---|---|---|---|---|---|
| Shopify Community, 4 Sep 2026 | 5,851 one/two-star reviews, 209 apps | 23% | 17% | 12% | **3%** |
| Shopify Community, 29 Aug 2026 | 2,797 negative reviews | 18.7% | — | — | setup 3.6% |
| Shopify Community, 17 Aug 2026 | 483 negative reviews, 126 apps | 84 of 483 | **152 of 483** | 72 | **12** |

Two consequences for a solo builder:

1. **Feature parity is not the battle.** Only about 3% of one-star reviews are "it doesn't do X". Nearly
   half are "you charged me wrong" and "nobody answered". A smaller app with honest billing and a human
   on support beats a bigger app on the axis merchants actually churn over.
2. **The angry are tenured.** The 29 August study found the median one-star reviewer had already paid
   for **90 days**, against 30 days for five-star reviewers. Read the reviews of people who paid the
   longest: they describe a real switching trigger, not a bad first day. (This repo's own data says the
   same: 100 of 189 reviewers had been paying for over a year.)

### 6b. The pains, ranked for a solo builder

| Pain | Who feels it | Evidence | Source, date |
|---|---|---|---|
| **App billing you can't trust** — price changes on locked-in users, charges after uninstall, refunds that never come | All merchants, SMB loudest | 23% of 5,851 negative reviews | [Shopify Community](https://community.shopify.com/t/i-read-5-851-one-and-two-star-app-reviews-the-1-complaint-isnt-what-i-expected/676424), 4 Sep 2026 |
| **Vendor support silence** | All | 152 of 483 negative reviews | [Shopify Community](https://community.shopify.com/t/i-read-483-one-star-and-two-star-reviews-across-126-apps-support-is-the-complaint-not-features/667666), 17 Aug 2026 |
| **App-stack cost, the "Shopify tax"** | $1M+ brands | $1,000–3,500/mo at $1–5M revenue; $5–15K/mo at $5–20M; only 1.82% of 3.59M stores spend over $100/mo (estimates ±25%) | [Eightx](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026), 1 Jun 2026 |
| **Plus fee rises** | Shopify Plus | Base $2,000 → $2,500/mo (+25%, 2024); 2026 tiers 0.25–0.40% of GMV at high volume | [Zenventory](https://www.zenventory.com/blog/shopify-plus-platform-fee-increase), 17 Mar 2026 |
| **Forced checkout migration / lock-in** | Plus in 2025, everyone in 2026 | `checkout.liquid` and script tags sunset 28 Aug 2025 (Plus) and 26 Aug 2026 (non-Plus) | [shopify.dev](https://shopify.dev/docs/storefronts/themes/architecture/layouts/checkout-liquid) |
| **Inventory and data sync** | SMB makers holding stock | 83% of 100 SMB merchants can't keep inventory, manufacturing and accounting in sync; 98% struggle to align inventory with demand; 66% say stock is their biggest expense | [Katana/WBR](https://katanamrp.com/shopify-report/), 2024 |
| **Support ticket load** | Brands past ~1K orders/mo | 20–50 tickets per 100 orders; 40–60 tickets/day/agent | [Gorgias](https://www.gorgias.com/blog/forecast-customer-service), upd. 23 Sep 2025 |
| **Returns** | Apparel hardest | 19.3% of online sales returned; $849.9B across retail; 9% of returns fraudulent | [NRF/Happy Returns](https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025), 15 Oct 2025 |
| **Subscription lifecycle** | Replenishment brands | 53% of subscribers changed an order in the past year; 4.4 orders/subscriber/yr (20K brands, 100M subscribers) | [Recharge](https://www.prnewswire.com/news-releases/recharge-subscriber-trends-insights-report-highlights-the-growing-value-of-subscribers-to-ecommerce-brands-302250623.html), 17 Sep 2024 |
| **Rising CAC** | DTC on paid social | 64% of DTC marketers struggle to pick effective channels (up from 53%); 54% lack budget to test. "CAC $68–84, +40–60%" is *unverified* | [Digiday/Klaviyo](https://digiday.com/sponsored/the-state-of-dtc-marketing-2025/), 2025 |
| **Agentic-commerce readiness** | Mid-market and up | 57% cite data requirements and ROI measurement, 43% lack machine-readable product content (n=80); 89% "preparing", 72% expect consumers to move faster than they can; ~3% of transactions involve agents today | [Swap/Glossy](https://www.swap-commerce.com/blog/agentic-commerce-statistics-2026), 2026; [Checkout.com](https://www.checkout.com/newsroom/consumer-demand-for-ai-shopping-is-forming-fast-but-trust-for-agentic-commerce-is-still-catching-up), 9 Jun 2026 |
| **B2B buying experience** | Wholesale merchants | 74% of B2B buyers (91% in the US) would switch suppliers for a better online experience | [Shopify Enterprise](https://www.shopify.com/enterprise/blog/b2b-ecommerce-challenges), 6 Oct 2025 |
| **Shipping cost** | Under 1,000 orders/mo | 41% of 1,191 merchants called it their biggest challenge — but this is 2022 data and no newer merchant survey was found | [Shippo](https://goshippo.com/blog/shippo-2023-state-of-shipping-report), 9 Feb 2023 |
| **EU compliance (GPSR, labelling)** | UK and non-EU SMEs shipping into the EU | Over a third of UK SMEs ready to cut or stop EU trade; 63% report significant barriers; 17% cite labelling rules. **No GPSR-specific percentage exists** | [FSB via Startups.co.uk](https://startups.co.uk/news/small-businesss-eu-trading/), May 2026 |

### 6c. Where nobody has the number yet

Two rows above have **no quantified survey at all**: GPSR/IOSS compliance specifically, and Shopify B2B
specifically. For a founder, an unmeasured pain is an opportunity twice over — you can run the first
survey, and the survey itself is the outreach.

---

## 7. Five apps that started from one named pain

| App | The pain, as the founder described it | Where it got to |
|---|---|---|
| **Judge.me** (2015, bootstrapped) | Review apps were "generally overpriced" at $199/mo although reviews clearly moved sales. Launched at $15/mo | $4M revenue in 2021 (founder interview); $11.2M in 2024 (*estimate*) |
| **Gorgias** (2015) | Built a templated-reply extension; 70% of users turned out to be ecommerce support agents, so it became a helpdesk with order data inside the ticket | ARR $25M (2022) → $51M (2023) → $69M (2024); $530M valuation, May 2024 |
| **Loop Returns** (2017) | Chubbies and Allbirds "were spending way too much time and money manually processing returns" | $22M revenue 2022; $53.3M 2024 (*estimate*); 5,000+ brands |
| **Skio** (2020) | Existing subscription apps relied on "hacky workarounds" on Shopify | $10M ARR and profitable in 3 years; sold to Recharge for **$105M cash** at $32M ARR, having raised $8M |
| **Klaviyo** (2012) | A friend's store: email tools could not use browse and purchase data in real time | FY2025 revenue **$1.2B** (+32%), 193K customers |

The pattern is the same in all five, and it is the whole lesson of this file: **the pain was already
being paid for** — a $199 app, an agent's salary, manual returns labour, a hacky stack. None of them
invented a new want. Each undercut the cost of an existing workaround.

Skio is the one to study here: same category as this repo's own offer, started from one sentence about
the incumbent's architecture, and the exit was cash from the very incumbent this app is targeting.

---

## 8. Done when

- One segment named so precisely that you can list 200 stores by name — and the list exists.
- One problem statement with every slot filled, each clause traceable to a quote from a real merchant.
- Ten interviews done in the past tense, with the phrases they used written down verbatim.
- A value pool in euros or dollars, and a price that is 1–10% of it.
- A structural reason the incumbent cannot fix it.
- The cheapest proof already running — not designed, running — with the first delivery done by hand.

The last line is the only one that counts. Every item above is analysis, and analysis is the part that
feels like progress while nothing is at stake.
