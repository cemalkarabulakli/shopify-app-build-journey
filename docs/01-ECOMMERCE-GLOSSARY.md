# E-commerce Glossary

> These words come up when talking to merchants, writing your App Store description, and explaining
> which metric your app improves. For the developer: these are the merchant's **KPIs**. If you can't
> tie your app to a metric, it's hard to sell.
>
> Rule: every term = **what it means + formula + example number**. A term without a formula is rote memorisation.

---

## 1. Money and sales metrics

| Abbreviation | Stands for | What it means | Formula |
|---|---|---|---|
| **GMV** | Gross Merchandise Value | Total sales volume (revenue before refunds are deducted) | Σ order value |
| **AOV** | Average Order Value | Average cart value | Revenue ÷ Number of orders |
| **LTV / CLV** | (Customer) Lifetime Value | Total profit a customer leaves over their lifetime | AOV × Orders per year × Customer lifetime (years) × Gross margin |
| **COGS** | Cost of Goods Sold | Cost of the goods sold | Product + packaging + shipping |
| **Gross Margin** | Gross margin | What's left of the sale after subtracting product cost | (Revenue − COGS) ÷ Revenue |
| **MRR** | Monthly Recurring Revenue | Monthly recurring revenue (in subscription businesses) | Σ active subscription fees |
| **ARR** | Annual Recurring Revenue | Annual recurring revenue | MRR × 12 |
| **ARPU** | Average Revenue Per User | Average revenue per user | Revenue ÷ Number of users |

**Example:** Cart is €60, the customer buys 3 times a year, stays 2 years, gross margin 40%.
`LTV = 60 × 3 × 2 × 0.40 = €144`. You must spend less than €144 to acquire this customer.

## 2. Advertising and customer acquisition

| Abbreviation | Stands for | What it means | Formula |
|---|---|---|---|
| **CAC** | Customer Acquisition Cost | The cost of acquiring one customer | Marketing spend ÷ Customers acquired |
| **CPA** | Cost Per Acquisition | Cost of one target action (purchase/sign-up) | Spend ÷ Conversions |
| **CPC** | Cost Per Click | Cost per click | Spend ÷ Clicks |
| **CPM** | Cost Per Mille | Cost of 1,000 impressions | (Spend ÷ Impressions) × 1000 |
| **CTR** | Click-Through Rate | Click rate | Clicks ÷ Impressions |
| **ROAS** | Return On Ad Spend | How many times its cost the ad brought back in revenue | Revenue from ads ÷ Ad spend |
| **ROI** | Return On Investment | Profit return on the investment | (Gain − Cost) ÷ Cost |
| **LTV:CAC** | — | The health indicator of the business | LTV ÷ CAC |

**Healthy thresholds (generally accepted, varies by industry):**
- `LTV:CAC ≥ 3` → healthy. `< 1` → you're losing money on every customer.
- `ROAS 4` → €4 revenue per €1 of ads. If margin is 25% you're breaking even; ROAS alone doesn't mean profit.
- **CAC payback** → how many months it takes to recover CAC. Longer than 12 months and cash gets tight.

**Example:** €1,000 of Meta ads → 25 customers. `CAC = €40`. If LTV is €144, `LTV:CAC = 3.6` → healthy.

## 3. Funnel and conversion

| Term | What it means |
|---|---|
| **Traffic / Sessions** | Number of visits (sessions). If the same person comes twice, that's 2 sessions. |
| **CR / CVR** (Conversion Rate) | The rate at which visits turn into sales = Orders ÷ Sessions. Typical in e-commerce: **1–3%**. |
| **Bounce rate** | The share of visitors who view one page and leave. |
| **Add-to-cart rate** | The share of visitors who add to cart. |
| **Checkout abandonment** | The share who enter the checkout step and don't finish. Typical **60–80%** — a massive opportunity area. |
| **Cart abandonment** | Those who add to cart and don't buy. |
| **Upsell** | Selling the more expensive/higher-tier model. |
| **Cross-sell** | Selling a complementary product alongside ("buy this too"). |
| **Bundle** | Selling products together as a discounted package. |
| **Order bump** | A small add-on product offered during checkout. |

**Why this matters to us:** apps sell precisely at these steps. The sentence "I cut checkout
abandonment by 5%" sells many times better than "I offer a nice interface".

**Example:** 10,000 sessions, CR 2% → 200 orders, AOV €60 → €12,000 revenue.
An app that lifts CR from 2% → 2.4% brings in **+€2,400** a month. A €49/mo price is easy to defend.

## 4. Retention

| Term | What it means | Formula |
|---|---|---|
| **Retention rate** | The share of customers who stay | Remaining at end of period ÷ At start of period |
| **Churn rate** | The share of customers/subscribers lost | Departed ÷ At start of period |
| **Repeat purchase rate** | The share of customers who buy again | Customers with ≥2 orders ÷ Total customers |
| **Cohort** | A group of customers acquired in the same period; used to track behaviour over time |
| **RFM** | Recency-Frequency-Monetary — the classic of customer segmentation |
| **Subscription** | Regular recurring orders (coffee, vitamins) |

**Critical for the app developer:** churn is high in Shopify apps. 5% monthly churn =
average customer lifetime of `1 ÷ 0.05 = 20 months`. 10% monthly churn = 10 months. This number directly cuts your LTV in half.

## 5. Operations and logistics

| Term | What it means |
|---|---|
| **SKU** | Stock Keeping Unit — the unique code of each product variant (Red-M is a separate SKU) |
| **Variant** | A product's combination of options like size/colour (a first-class concept in Shopify) |
| **Inventory** | Stock |
| **Fulfillment** | Picking, packing and shipping the order |
| **3PL** | Third-Party Logistics — outsourcing warehousing/shipping |
| **Dropshipping** | Shipping directly from the supplier to the customer without holding stock |
| **POD** | Print on Demand — products printed when the order comes in (t-shirts, posters) |
| **RMA / Returns** | The returns process |
| **Chargeback** | The customer recalling the payment through their bank |
| **COD** | Cash on Delivery — pay at the door (very common in Turkey) |

## 6. Channels and marketing

| Term | What it means |
|---|---|
| **SEO** | Traffic from organic search |
| **SEM / PPC** | Paid search advertising |
| **Paid social** | Meta/TikTok ads |
| **Organic** | Traffic that arrives without paying |
| **Email/SMS marketing** | The owned channel — the one with the highest ROI |
| **Abandoned cart flow** | An automatic reminder series for those who abandon the cart |
| **Affiliate** | A partner working on commission per sale |
| **Influencer / UGC** | Selling through creator content (User Generated Content) |
| **Attribution** | Attributing which channel a sale came from — where everyone lies |
| **Retargeting** | Showing ads again to those who browsed the site and didn't buy |
| **A/B test** | Comparing two variants; the result is only meaningful with a sufficient sample |
| **Social proof** | Trust elements like reviews, ratings, "12 people are viewing this" |

## 7. The SaaS side (our business)

| Term | What it means |
|---|---|
| **Trial** | Free trial period (7–14 days is standard in Shopify apps) |
| **Freemium** | Free tier + paid upper tier |
| **Activation** | The moment the user first sees value ("aha moment") |
| **TTV** (Time to Value) | Time from install to first value — the shorter it gets, the lower churn goes |
| **Onboarding** | The first experience after install |
| **Expansion revenue** | Extra revenue from existing customers (upgrading to a higher tier) |
| **NRR** | Net Revenue Retention — churn + expansion together; if >100% the business grows by itself |
| **Uninstall rate** | The share who uninstall the app — the most painful metric of Shopify apps |

---

## Keep these in your pocket: 3 formulas

```
LTV       = AOV × Orders per year × Years × Gross margin
LTV:CAC   should be ≥ 3
App value = (New CR − Old CR) × Sessions × AOV   → monthly return in €
```

The last formula is the most honest way to defend your app's price: if you can tell the merchant
what you earn them per month in €, the price discussion is over.

---

*When you hear a new term, add it here — with its formula and an example number. No additions without a formula.*
