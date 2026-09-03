# Where the Ecosystem Gets Its Signal — Sources, Betas and the Early-Warning System

> The most insidious risk of building apps on Shopify: **one day your code stops working, and it's not your fault.**
> This file answers two questions: (1) where and when do I learn about new and beta features?
> (2) How do I know **in advance** that Shopify is about to swallow my category?
>
> Verified: **August 2026**. Sources are linked.

## 0. The one-paragraph answer

Shopify runs on **two rhythms**. The marketing side explodes **twice a year** with *Editions*. But
the developer's real signal is in three **continuously flowing** channels: the `shopify.dev/changelog` RSS,
the **quarterly API version cycle** and the **`unstable` API version** — where features land in the schema
*months before* they're announced. Betas are now largely **self-serve**: you pick a
"feature preview" when creating a dev store, or you switch your app to the `unstable`/release-candidate version.
There's no gatekeeper at the door.

⚠️ **The critical change of 2025–2026:** Shopify **shut down the Partner Slack** (December 2025) and
laid off most of the partnerships team. Meaning **there is no more human back channel**.
The public channels below are no longer "supplementary sources" — they are **the entire channel**.

---

## 1. Official channels

| Channel | URL | Frequency | Signal |
|---|---|---|---|
| **Developer changelog** ⭐ | `shopify.dev/changelog` · RSS: `/changelog/feed.xml` | Several per week | **High** |
| **Merchant changelog** ⭐ | `changelog.shopify.com` · RSS: `/feed.xml` | Almost daily | **High** |
| `unstable` GraphQL schema ⭐ | `shopify.dev/docs/api/usage/versioning` | Continuous | **High** |
| Editions (~2/year) | `shopify.com/editions` | ~2/year | **High** |
| Developer forums | `community.shopify.dev` + `/c/announcements` | Daily | **High** |
| Shopify public GitHub | `github.com/orgs/Shopify/repositories` | Daily commits | **High** |
| Engineering blog | `shopify.engineering` · RSS `/blog.atom` | 1–4 per month | **High** |
| Investor presentations | `shopify.com/investors` | Quarterly | **High** |
| Partners blog | `shopify.com/partners/blog` · `.atom` | 1–3 per month | Medium |
| Partner monthly email | From dashboard settings | Monthly | Medium (lags) |
| **DotDev** conference | `dotdev.shopify.com` | Yearly | High (recordings **free** on YouTube) |

**Changelog filters** — this is the actual trick:
```
shopify.dev/changelog?filter=feature_preview
shopify.dev/changelog?filter=developer_preview
shopify.dev/changelog?filter=early_access
```

**Why the merchant changelog matters separately:** the sentence "Shopify now supports X natively"
shows up **here first**, not in the developer changelog. This is your platform-risk radar.

**Conference history:** Unite (≤2022) → Editions.dev (2025) → **DotDev** (2026).
`editions.dev` now redirects to `dotdev.shopify.com`. DotDev 2026: Toronto, July 21–22, 2026,
$499, sold out. **Recordings are free on YouTube** — that's the real access path.

## 2. How do betas work?

Shopify uses three labels (and doesn't use them consistently):

| Label | What it means | How to get in |
|---|---|---|
| **Feature preview** | Merchant-facing feature + its APIs | Create a new dev store → "Test a feature preview" |
| **Developer preview** | Developer tool/API, usually on `unstable` | Use it directly |
| **Early access** | API in the release-candidate version | Switch the app to the RC version string |

**Feature preview rules:** **one preview** per dev store. That store gets Advanced plan
features but **can't be transferred or converted to a paid plan**. So every preview needs
its own dev store.

**Some of the betas currently open (Aug 2026):**

| Feature | Type | Note |
|---|---|---|
| New version of Hydrogen (moved off React Router, framework-agnostic) | Developer preview | Open on GitHub |
| Physical inventory (bins, counts, purchase orders) | Feature preview | ⚠️ Warning flare for inventory apps |
| Market-driven shipping | Feature preview | Old delivery profile APIs deprecated |
| Next Generation Events (field-level webhook filtering) | Developer preview | On `unstable` |
| Customer account redesign | Feature preview | Your extensions will render in a narrower area — **test now** |
| SubscriptionContractCalculation API | Early access | In the 2026-10 RC; 12+ mutations → 1 |
| WebMCP (AI agents in the browser can search the catalog and manage the cart) | **Live** | No setup needed, active on every Liquid storefront |

## 3. Early-visibility playbook for the solo developer

Ordered by signal-to-effort ratio:

1. **Add the two RSS feeds to your reader** — `shopify.dev/changelog/feed.xml` + `changelog.shopify.com/feed.xml`.
   Zero cost, 70% of the value is here.
2. **Diff the `unstable` GraphQL schema once a month.** Run introspection, save it, compare
   against last month. New types and mutations appear here **before the announcement**. This is the
   earliest signal that exists, and nobody is competing for it.
3. **Point a test app at the release-candidate version** — on the 1st of every quarter you'll see
   the next quarter's stable API. **Three months of free foresight.**
4. **Watch Shopify's GitHub org** — cli, hydrogen, ui-extensions, shopify-app-js, polaris.
   Code lands weeks before the changelog.
5. **Keep 2–3 dev stores**, each with a different feature preview enabled.
6. **Read `community.shopify.dev/c/announcements` weekly** — things that never hit the changelog
   (Partner Program changes, identity verification requirements, town halls) land here.
7. **Watch the DotDev recordings** — they telegraph the next 6–12 months.
8. **Read the engineering blog** — an infrastructure post runs ~2 quarters ahead of the product.
   *(Evidence: "Building the Universal Commerce Protocol" Jan 2026 → UCP GA Jun 2026.)*

## 4. Unofficial but high-signal sources

| Source | What | Why |
|---|---|---|
| **The Unofficial Shopify Podcast** (Kurt Elster) | Since 2014, 500+ episodes, weekly | Gets Shopify VPs on record; merchant/CRO angle |
| **Liquid Weekly** (Karl Meisterheim & Taylor Page) | Newsletter + podcast, issue 225 | **The developer side's publication**; ran the first Shopify Developer Survey |
| **The Shopify App Show** (Martin Cox) | ~25 min, with indie app founders | The closest peer network for solo app developers |
| **Taylor Sicard's blog** | Partner Program economics | The clearest independent writing that can be critical of Shopify |
| **Common Thread Collective** — "Every Shopify Update in 2026" | Weekly-updated tracking list | Merchant-operator framing |
| **Shopify Devs Discord** (~26,500 members) | Official Discord | "Is it broken for me, or for everyone" |

**Data providers:**

| Provider | What | Assessment |
|---|---|---|
| **Store Leads** | 13.7M stores, installed-app technographics, weekly | **Industry standard.** $75–950/mo |
| **AppStorePulse** | App Store intelligence, **free monthly reports** | The best research published for free |
| **App Store Research** | **Arranges 1-on-1 calls with verified merchants** | Qualitative, not quantitative — better than scraped data for demand validation |
| StoreCensus / GapQuery / StoreInspect / AppJubilee | App & store data | Usable, but **cross-checking is mandatory** (see §6) |

**⚠️ SEO-junk markers** (abundant in this niche): year + "Complete Guide" + a number in the title;
still **recommends the Partner Slack** (shut down December 2025 — a perfect staleness test);
numbers that contradict Shopify's own figures; the author has no history in the ecosystem.

## 4b. The media layer — where does the merchant hear about apps?

Outside the App Store, there's a publishing economy that shapes merchants' tooling decisions.
Ordered by reachable and **verified** audience:

| Publication | Owner | Audience | Price |
|---|---|---|---|
| **DTC Newsletter** (directtoconsumer.co) | **Eric Dyck** | **100K+ subscribers**; 80%+ founders/senior execs; **55% at brands doing $1M+ revenue**; NPS 86 | Not published (talk to sales). Current advertisers: **Meta, Klaviyo, Tapcart** |
| **Operators** (9operators.com) | Sean Frank (Ridge), Mike Beckham, Matt Bertulli, Jason Panzer | 28.8K newsletter · 175K podcast subscribers · 5.13M downloads | Not published. **Sponsor list = recommendation list** (see below) |
| **2PM** (2pml.com) | Web Smith | 28–30K senior decision-makers; 42.1% open rate | **$10,500 / 3 sends** — the only public price in this ecosystem. ~$120 CPM, ~3× general marketing newsletters |
| **Chew on This** | Ron Shah & Ash Melwani (Obvi) | 30K+ subscribers · **40+ events** a year · a separate **"FOR SAAS"** tab on the site | Not published. *"Events are always free for founders, tech partners sponsor"* |
| **eCommerce Tech / 1800DTC** | independent directories | 9K readers / 2,485 brands, 18,017 tools indexed | Small, but **the audience is already there to pick tools** — highest intent per impression |
| Marketing Brew / Retail Brew | Morning Brew | 345K / 180K industry professionals | Not published |
| **LinkedIn groups** | — | The largest is **~4,400 members** | ⚠️ **Skip.** r/shopify 370K, Shopify forum 900K. Share on individual LinkedIn feeds, not in groups |

### ⚠️ In this ecosystem, "recommendation" and "advertisement" are the same object

From Operators' sponsor page, verbatim:
> Northbeam: *"One of the group's secrets: **most operators use Northbeam**."*
> Richpanel: *"**Our pick** is Richpanel."* · Fulfil: *"**Sean and Jason both use it**."*

Postscript, AfterSell and Richpanel are **Shopify apps**. A merchant reading this page
**can't see where the peer recommendation ends and the media buy begins, because there is no line between them.**

**Conclusion:** any analysis of "which apps do the best operators recommend" is actually an analysis of
**"which app bought that slot"**. Also, Shopify app affiliate programs pay **recurring** commissions
(not one-off) — that's the economics behind "Best Shopify apps 2026" lists; many of those lists
are published by **app/theme vendors themselves** (PageFly, BSS Commerce, Ablestar…).

**Follower counts mislead twice here:** Eric Dyck, who runs the DTC Newsletter, reaches 100,000 recipients
and has **144 followers on X** (LinkedIn-native). The highest-follower accounts
(Nik Sharma 187.5K, Chase Dimond 168.7K) are the ones furthest from the merchant P&L and closest to
a media rate card.

## 5. Platform risk — how does a category die?

Shopify publishes **~40 apps of its own** on the App Store (`apps.shopify.com/partners/shopify`).
**That list is the map of swallowed categories** — check it once a quarter.

Categories Shopify is currently directly in: email/SMS (Shopify Messaging), popups
(Forms), automation (Flow), live support (Inbox), translation, subscriptions, bundles, on-site search
(Search & Discovery), influencers (Collabs), checkout customization (Checkout Blocks), inventory
(Stocky), dynamic pricing (Smart Pricing), AI FAQ (Knowledge Base), theme A/B testing (SimGym)…

**🔍 Critical observation:** most of Shopify's own apps are **mediocrely rated** — Bundles 2.8 ·
Search & Discovery 2.7 · Retail Barcode Labels 2.3 · Fraud Control 2.2. So Shopify's native
solutions generally **serve the bottom 60% of merchants, and fail the rest.** The third-party apps
that survive live in exactly that gap.

### Four mechanisms that kill a category

**1. Releasing a free native app.** (Search & Discovery, Forms, Bundles, Flow going free)
→ The free tier and the bottom end of the market evaporate overnight. The "simple version of X, $9" apps die.
The ones with real depth survive by moving upmarket.

**2. Removing the extension point you depend on.** ⚠️ **The most lethal.**
- `checkout.liquid` → the Checkout Extensibility migration
- **Shopify Scripts:** execution ends **June 30, 2026** → move to Functions
- **Script tags: stop running on March 1, 2027** (announced Aug 24, 2026)
- Legacy customer accounts deprecated (Feb 2026)
→ You don't lose to a competitor; **you stop working on a date Shopify picked.**

**3. Acquiring the leader and making it free/native.** Codisto → Marketplace Connect;
Dovetale → Collabs. The category leader suddenly becomes "free and pre-installed".

**4. Changing distribution, not the product.** *The new mechanism of 2025–2026.*
Priority visibility for Built for Shopify (Oct 30, 2025), Sidekick favoring BFS in its
app recommendations → **Your app keeps working flawlessly but installs go to zero**, because
you've vanished from the surfaces the merchant looks at. Documented case: an app that fell behind
on API versions saw its daily installs stop **suddenly, not gradually**.

### The counter-example
Shopify **shut down its own Product Reviews app** and pointed merchants to third-party review apps.
So Shopify sometimes **exits** a category, too. Swallowing everything is not a law of nature.
*(⚠️ Date/details need verification.)*

### Early-warning signals — starting with the most predictive

**Tier 1 — act immediately:**
1. **A new object/mutation related to your domain appeared in the `unstable` schema.** Shopify can't
   ship a native feature without an API; **the schema moves first.**
2. **A deprecation notice landed on the extension point you use.** No negotiation, the date is set.
3. **A feature preview shipped that describes what your app does.** (E.g. the "physical inventory
   preview" → a direct warning flare for inventory apps.)

**Tier 2 — start planning:**
4. Shopify acquired a company in your category → historically native+free within 12–18 months.
5. An infrastructure post on the engineering blog → product ~5 months later.
6. "Shopify now supports X natively" in the merchant changelog → at this point you're already late.
7. A statement of strategic intent on the earnings call → product 2–4 quarters later.

**Tier 3 — watch:**
8. **A Built for Shopify requirement change specific to your category.** (E.g. the new requirements for
   returns/subscription apps taking effect Dec 1, 2026.) If Shopify is raising the bar in a category,
   it means it's **paying close attention** to that category.
9. A section named after your category opened in Editions → strategic priority.
10. **A low-rated first-party app shipped in your category** → counterintuitive, but this is a *reprieve*:
    Shopify planted the flag but left the quality gap open. That's your competitive ground.

### Categories that look risky right now *(this is our reading, not Shopify's statement)*
Email/SMS marketing · inventory/stock management · shipping rate configuration · product feeds
· on-site search and chat (WebMCP live on every storefront with no setup) · dynamic pricing · subscriptions.

**The ones that look more defensible:** those requiring heavy external integration (ERP, 3PL, accounting),
those requiring a proprietary data network, places where Shopify tried and got low ratings (search depth,
bundle complexity, fraud), and **Plus/enterprise** needs — requirements a "good enough for everyone"
native app can't carry.

---

## 6. ⚠️ Where the sources contradict each other

During this research we saw the same metric vary **by up to 3.5×** from source to source:

- **Judge.me installs:** Storeleads 619,657 · StoreCensus 402,384 · StoreInspect 179,295
- **Total app count:** "16,000+" (Shopify's own statement) · 17,891 active (AppJubilee) ·
  25,468 (AppNavigator) · **28,162 "published"** (Storeleads, cumulative)
- **Apps per store:** median **2** (StoreInspect) vs average **6.1** (StoreCensus)

**The reason is methodological:** all scanners detect apps **only from the storefront signature**.
Admin-only apps (Flow, ERP, 3PL, accounting, most checkout apps) are **structurally invisible**.
Storeleads says so itself. So **every penetration figure is a floor**, not the actual rate.

**Numbers you should not use:**
- ❌ **"The average merchant spends $120/month on apps"** — the mean of a skewed distribution; doesn't
  match Storeleads' own percentiles (1.8% spend >$100).
- ❌ **"The average Shopify app developer earns $93,000"** — traces back to **ZipRecruiter's
  "Shopify Developer" salary page**. Nothing to do with app revenue; it's an **employee salary**.
- ❌ "70% of installs come from search" / "60%" — neither is first-party, and they contradict each other.
- ❌ "48.8% opt-out trial conversion" — not Shopify, a **general mobile app** statistic.

---

## 7. If you only do five things

1. Add the two RSS feeds today (`shopify.dev/changelog/feed.xml` + `changelog.shopify.com/feed.xml`).
2. Write a **monthly `unstable` schema diff** job. The earliest legitimate signal that exists, and nobody uses it.
3. On the 1st of every quarter, point a test app at the **release candidate**.
4. Once a quarter, look at **`apps.shopify.com/partners/shopify`** — Shopify's competitive intent,
   complete with live ratings, out in the open.
5. Read **`community.shopify.dev/c/announcements`** weekly. The Partner Slack is closed,
   the partner managers are gone; the things that affect your business are now announced **only** here.

---

*Sources: [shopify.dev changelog](https://shopify.dev/changelog) · [platform changelog](https://changelog.shopify.com/) · [API versioning](https://shopify.dev/docs/api/usage/versioning) · [feature previews](https://shopify.dev/docs/api/feature-previews) · [community.shopify.dev](https://community.shopify.dev/) · [Editions](https://www.shopify.com/editions) · [Spring '26 dev](https://www.shopify.com/news/spring-26-edition-dev) · [DotDev](https://dotdev.shopify.com/) · [Shopify Engineering](https://shopify.engineering/) · [Apps by Shopify](https://apps.shopify.com/partners/shopify) · [Built for Shopify](https://shopify.dev/docs/apps/launch/built-for-shopify) · [Store Leads](https://storeleads.app/) · [AppStorePulse](https://www.appstorepulse.com/reports) · [App Store Research](https://appstoreresearch.com/) · [Taylor Sicard](https://taylorsicard.com/blog/shopify-partner-program-2026) · [Liquid Weekly](https://liquidweekly.com/blogs/podcast) · [Kurt Elster](https://kurtelster.com/) · [The Logic — partnerships layoffs](https://thelogic.co/news/shopify-partnerships-division-layoffs-future/) · [TSD platform dependency case](https://blog.tsd.digital/platform-dependency-why-our-shopify-app-went-from-daily-installs-to-zero-overnight/)*
