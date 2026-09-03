# Who to Listen To — People, Companies and Vision

> The fastest way to understand an ecosystem is to read what the people shaping it think.
> This file: who Shopify's leadership is and what they're saying; who has proven their name
> in the ecosystem; and what **strategic message** falls out of all of it?
>
> ⚠️ **Roles changed often.** Every title below was re-verified in August 2026 —
> most org charts on the internet (Clay, Craft.co, TheOrg) are **stale** and still list
> executives who left in 2025.

---

## 1. Shopify leadership (verified as of August 2026)

| Person | Role | Since |
|---|---|---|
| **Tobi Lütke** | Founder, **CEO** and Chairman of the Board | CEO since 2008, Chairman since 2023 |
| **Harley Finkelstein** | **President** (not COO) | Since 2020; at the company since 2010 |
| **Mikhail Parakhin** | **CTO** | September 2024 — former CEO of Microsoft Advertising & Web Services, former Yandex CTO |
| **Jess Hertz** | **COO** | 9 October 2025 — promoted from General Counsel |
| **Jeff Hoffmeister** | CFO | 2022 |
| **Farhan Thawar** | VP & Head of Engineering | ~1,000+ engineers; the most visible engineering leader |
| **Vanessa Lee** | VP Product — in 2026 *"the most senior product leader reporting directly to the CEO"* | At the company since 2017 |
| **Atlee Clark** | VP Partnerships | Author of the July 2026 ecosystem manifesto |

**Departures that invalidate the org charts:**

| Person | Former role | Now | Date |
|---|---|---|---|
| Kaz Nejatian | COO & VP Product | **CEO of Opendoor** | Sep 2025 |
| **Glen Coates** | VP Product, Core — **owned the developer platform + App Store** | **Head of App Platform at OpenAI** (bringing apps into ChatGPT) | 2025 |
| Bobby Morrison | Chief Revenue Officer | left | Oct 2025 |
| Allan Leinwand | CTO | left; replaced by Parakhin | 2024 |

⚠️ **Unanswered question:** **who runs the developer platform / App Store organisation**
after Coates' departure appears in no 2026 source.

## 2. Tobi Lütke — philosophy

He doesn't blog. His body of work lives in **X posts (@tobi)**, long podcasts, and internal
memos published after they leaked.

| Idea | Quote | Source / date |
|---|---|---|
| **AI is now the baseline expectation** | *"Reflexive AI usage is now a baseline expectation at Shopify."* · *"Before teams ask for more headcount, they must show why they can't get what they want done with AI."* | Internal memo, posted by him on X on 7 Apr 2025. AI usage was added to performance reviews |
| **Anti-stagnation** | *"I don't want tree rings to show."* · *"Fall in love with a problem, stay flexible on the solution."* | Homecoming, Toronto, 24 Jun 2025 |
| **Originality / craft** | *"If you build the same thing others have built, you can only ever be as good as them."* | Uncapped, Ep. 50, 28 May 2026 |
| **The infinite game** | Runs Shopify on a **100-year horizon**; rejects KPIs/OKRs as the primary lens in favour of "taste, quality, passion, emotions" | Lenny's Podcast, 2 Feb 2025 — the best long-form summary of his philosophy |
| **Subtraction / no meetings** | *"Meetings are usually a bug"* — they paper over a lack of trust, clarity or process. Jan 2023 calendar purge: every recurring meeting with 3+ people deleted, Wednesdays banned → **~76,500 hours** reclaimed | Bloomberg/Axios, Jan 2023 |
| **Still writes code** | With a coding agent, made **Liquid parse+render 53% faster**, with **61% fewer allocations** | 2026 |

Follow: [x.com/tobi](https://x.com/tobi) · [Lenny's episode](https://www.youtube.com/watch?v=tq6vdDJQXvs) · [Uncapped Ep. 50](https://uncappedpod.com/p/tobi-lutke-building-shopify-and-the)

## 3. Harley Finkelstein — the voice of entrepreneurship

The message hasn't changed in a decade: **entrepreneurship = the vehicle for human potential**,
Shopify = "arming the rebels".

- *"AI is putting entrepreneurship on overtime."* · *"AI is making entrepreneurship dramatically
  more accessible."* (CNBC, Aug 2026 and May 2026)
- Traffic and orders arriving at Shopify stores from ChatGPT/Gemini **tripled year over year**;
  last quarter **75% of AI-driven purchases came from product categories outside the top 100**.
- ⚠️ *"A new entrepreneur makes their first sale every 26 seconds"* — Tobi had said **36 seconds**
  three months earlier. **Don't quote either one as fact.**

## 4. Mikhail Parakhin (CTO) — the most satisfying technical read of 2026

[Latent Space interview (22 Apr 2026)](https://www.latent.space/p/shopify) — the richest primary
source on how Shopify builds today.

- **~90% daily active AI tool usage** across the company. A **phase change** happened in
  December 2025 when model quality crossed a threshold.
- **Unlimited top-tier-model token budgets** for employees; lower-tier models are actively discouraged.
- **CLI agents are overtaking IDE tools.** Shopify's own agent, **River**, is used more internally
  than Copilot and Cursor.
- Core thesis: *"The real unlock isn't more agents in parallel; it's **better critique loops**,
  stronger models, and spending more on **review** than on generation."*
- *"AI can write far more code… but there has to be a very strong bottleneck at PR review.
  Otherwise the bug count goes through the roof."*
- **The bottleneck has moved:** it's not code generation but **PR review, CI/CD stability and rollback**
  that set the speed limit.
- Internal systems: **Tangle** (ML orchestration, open source), **Tangent** (automated research
  loop; took search from 800 → 4,200 QPS), **SimGym** (customer simulation on a decade of merchant
  data; ~0.7 correlation with real A/B tests). The defensibility argument is this **data moat**.

## 5. Farhan Thawar (Head of Engineering) — the operating playbook

[Bessemer: "Inside Shopify's AI-first engineering playbook" (2 Apr 2026)](https://www.bvp.com/atlas/inside-shopifys-ai-first-engineering-playbook)

- *"Code is cheap now. But I don't want code, I want **solutions**."*
- *"The brain is a muscle. If you stop going to the gym, it atrophies."* (his answer to the skill-atrophy worry)
- *"At Shopify we use one tool for every job — **except AI**."* Cursor, Claude Code, Copilot,
  Codex and Gemini all run side by side.
- Numbers: **~20% engineering productivity gain**; a **$250/day** token alert threshold per
  user; the rollback rate stayed flat despite more code being shipped.
- *"If you haven't figured out how to harness agents in 2026, you'll fall behind."*

## 6. Engineering voices

Shopify's public engineering identity splits in two:

**The Ruby/Rails infrastructure team** — [railsatscale.com](https://railsatscale.com/), their mission:
*"Make Ruby and Rails 100-year tools."*
- **Jean Boussier** (Pitchfork app server, Ruby performance) · **Aaron Patterson** ("tenderlove")
- **Maxime Chevalier-Boisvert** (led YJIT, now **ZJIT**) · **Takashi Kokubun** (YJIT/ZJIT)
- **Kevin Newton** (**Prism** — the new universal Ruby parser) · Peter Zhu & Matthew Valentine-House (GC)
- Shopify also gives **~$500K/year** in academic grants to Ruby researchers.

**The AI/ML organisation** — the 2026 output of [shopify.engineering](https://shopify.engineering/latest)
is almost entirely AI: *"Building an agentic harness that outlasts the model"* (Jul 2026),
*"Clustering billions of products for agentic commerce"* (Jun 2026), *"Teaching Sidekick to say no"*
(Jun 2026), *"Building the Universal Commerce Protocol"* (Jan 2026).

## 7. People who have proven their name in the ecosystem

The most defensible signal: the **2026 Shopify Build Awards** — handed out at DotDev 2026 (Toronto,
21–22 Jul 2026, ~2,000 attendees). **Shopify itself picked these names.**

| Person(s) | Work | Category |
|---|---|---|
| Mike Rossi & Bill Curtis | **Smile.io** (loyalty) | Apps |
| Dave Spanton & Sammy Isseyegh | **Discount Kit** — native on Shopify Functions | Apps |
| Harel Ishay | **EasyTeam** (POS workforce/payroll) | Apps |
| Michael Ray & Rachael Yaeger | **Human NYC** (agency) | Storefronts |
| Simon Wesierski & Michael Klim | **Commerce UI** — complex product configurator, **in pure Liquid** | Storefronts |
| Simon Corompt & Maxime Berthelot | **Unlikely** | Storefronts |
| Adam Sharon-Zipser & Jacob Osborne | Elephant Room / Prosper Digital | Merchant Impact |
| **Emili Horncastle** | **Zapiet** | **Community** (awarded for the first time) |

**App founders profiled by Shopify itself (28 Apr 2026):**

| Founder | App | Scale |
|---|---|---|
| Erikas Mališauskas | **Kaching Appz** | 100,000+ merchants, team of 40 |
| Alex Beller, Adam Turner, Colin Turner | **Postscript** (SMS) | passed **$100M in revenue**, 20,000+ brands |
| Isaac Bowen & Abe Lopez | **Lightward** (Locksmith + Mechanic) | 8-figure revenue, **0% employee turnover in 10 years**, 19,000+ merchants |

**Lightward's story** is this ecosystem's cult example of "craft, not scale" — a more relevant
north star for a solo/small team than Klaviyo.

**Publishers and educators:**

| Person | What | Why it matters |
|---|---|---|
| **Kurt Elster** | *The Unofficial Shopify Podcast*; founder of Ethercycle | Since 2014, 500+ episodes, 2.5M downloads. The merchant/CRO angle |
| **Karl Meisterheim & Taylor Page** | **Liquid Weekly** newsletter + podcast | The developer side's publication; ran the first Shopify Developer Survey |
| **Martin Cox** | *The Shopify App Show* | 14-year veteran; 25-minute conversations with indie app founders |
| **Jay Myers** | *Shopify1Percent*; co-founder of Bold Commerce | Retention/subscriptions/CRO |
| **Taylor Sicard** | App pricing & partner program analysis | The most-cited independent benchmarks of 2026 |

⚠️ **On agencies:** almost every "best Shopify Plus agencies of 2026" list is
**pay-to-rank SEO content**. The only agency signal worth trusting is the Build Awards list above.

## 8. Companies

**The biggest app companies** *(figures from secondary sources, approximate)*:

| Company | Category | Scale |
|---|---|---|
| **Klaviyo** (NYSE: KVYO) | Email/SMS/CDP | Q2 FY2026 revenue **$370.6M** (+26%) · **205,000+ customers** · **NRR 109%** · ~423,000 installs on Shopify |
| **Yotpo** | Reviews, UGC, loyalty | 380,000+ installs |
| **Gorgias** | Helpdesk | 25,000+ Shopify stores · $530M valuation (2024) · **Shopify is an investor** |
| **Recharge** | Subscriptions | Category leader; GMV-based pricing |
| **Postscript** | SMS | $100M+ revenue |
| **Judge.me, Loox, Smile.io, Triple Whale, Loop Returns, Okendo, Rebuy, Tapcart, Zapiet, Lightward** | various | The recognised second generation |

**Ecosystem economics** *(Shopify's own claims — optimistically framed, but the direction is right)*:
- **$1.3 billion** paid out to app developers in the year to April 2026
- The partner ecosystem generated **~7× Shopify's own revenue** in 2025
  (**$6.86** for every $1 Shopify earned), supporting **1.5M jobs**
- ⚠️ But the long tail is brutal: most apps make **under $1,000/month**

**Developer tools:**

| Tool | What |
|---|---|
| **Gadget** ([gadget.dev](https://gadget.dev/)) | Serverless full-stack platform for Shopify apps. Founders **Harry Brundage** (former Shopify Director of Core Engineering) and **Mohammad Hashemi** (former Shopify PM). $8.5M seed, Sequoia + Bessemer |
| **Shopify AI Toolkit / Dev MCP** | **Open-sourced on 9 Apr 2026.** Connects Claude Code / Cursor / Windsurf to the Admin GraphQL schema, the Polaris docs and the CLI |
| **Storefront MCP** | A native MCP endpoint on every store |

## 9. Vision — five recurring themes

**1. The agentic commerce platform bet.** For ~two years Tobi has been positioning Shopify on the
assumption that AI assistants will become the primary discover-and-buy surface. The concrete form:
**UCP — Universal Commerce Protocol**, launched by Google on 11 Jan 2026, **co-developed with
Shopify**, with Etsy/Wayfair/Target/Walmart as partners and 20+ institutions (Stripe, Visa,
Mastercard, Adyen, Amex) backing it. **It competes with OpenAI+Stripe's ACP.** The architectural
difference: **ACP merges checkout and payment; UCP separates them** — the merchant keeps their
choice of payment provider.

**2. AI as a cultural mandate, imposed from the top.** Tobi's April 2025 memo is the origin
document; Parakhin's 90% daily usage and Thawar's 20% productivity claim are the receipt.
The internal consensus in 2026 has moved past "use AI" to **"agent harnesses"** — parallel agents +
critique loops, with **the bottleneck now being review capacity**.

**3. Entrepreneurship as a moral framework.** Finkelstein's "golden age of entrepreneurship" and
Tobi's "arming the rebels" are the same argument. Atlee Clark's July 2026 piece is the ecosystem
version: ***"The pie is infinite. Every new builder makes room for the next one."***

**4. Craft, originality, subtraction, the long horizon.** 100-year thinking, rejecting OKRs,
"meetings are a bug", "the best thing founders can do is subtract". The Rails team's "100-year tools"
mission is the same value expressed in infrastructure. Lightward's 10-year 0% turnover story is
its counterpart in the ecosystem.

**5. ⚠️ The future of the app ecosystem — and the tension nobody says out loud.**
*The official line (Clark, Jul 2026):* AI democratises building, so expertise becomes
**more** valuable — *"fewer people need help getting from zero to one now, but they still need
help getting from one to two, to three."*

*The honest reading:* in DotDev 2026 sessions, partners were told outright to adjust their
business models; the content titles included **"app categories, AI commoditisation, and what
builders should stop building"**. In the same period Shopify shipped **native AI merchandising
that replaces rule-engine apps** and native A/B testing. There's a carrot alongside the stick:
**Sidekick App Extensions** open third-party app data up to Sidekick.

**The strategic message to an app builder in 2026 is clear:**
> Build **deep platform integration** or **proprietary data/workflows** —
> not **thin rule-engine layers** that Shopify will swallow.

Two of the 2026 app Build Awards (Discount Kit on Functions, EasyTeam on POS) went to exactly
this kind of **deep-native** app. That looks like deliberate signalling.

---

## 10. What does it mean for us?

1. **Tobi's "if you build the same thing, you can only be as good" line** maps one-to-one onto
   the ecosystem data: in the 2,830-app SEO category, 89.8% of reviews sit in 83 apps.
2. **Build deep-native.** Functions, POS, Sidekick extensions, metafields/metaobjects —
   these are the surfaces Shopify rewards. Thin script-injecting layers are dying.
3. **Model yourself on Lightward**, not Klaviyo. 19,000 merchants, 8-figure revenue, small team —
   a reachable north star for a solo developer.
4. **Read the sources, not the gossip.** The Latent Space interview, the Bessemer playbook and the
   Lenny's episode teach more than a hundred "Shopify statistics 2026" blog posts.
5. **Treat AI as both tool and risk.** Shopify runs on agents internally and is betting on
   agentic commerce externally. If your app doesn't expose an interface an AI agent can call,
   you could be on the wrong side within a few years.

---

*Sources: [Latent Space / Parakhin](https://www.latent.space/p/shopify) · [Bessemer / Thawar](https://www.bvp.com/atlas/inside-shopifys-ai-first-engineering-playbook) · [Lenny's / Tobi](https://www.youtube.com/watch?v=tq6vdDJQXvs) · [Uncapped Ep. 50](https://uncappedpod.com/p/tobi-lutke-building-shopify-and-the) · [BetaKit — Hertz COO](https://betakit.com/shopify-promotes-jess-hertz-to-coo-as-chief-revenue-officer-departs/) · [BetaKit — Parakhin CTO](https://betakit.com/shopify-taps-microsoft-executive-mikhail-parakhin-as-its-new-cto/) · [BetaKit — Coates → OpenAI](https://betakit.com/shopifys-head-of-core-product-leaves-for-openai/) · [Build Awards 2026](https://www.shopify.com/partners/blog/shopify-build-award-2026) · [Shopify — $1.3B ecosystem](https://www.shopify.com/news/billion-dollar-ecosystem) · [Shopify — A world with more builders](https://www.shopify.com/news/a-world-with-more-builders) · [Rails at Scale](https://railsatscale.com/) · [Shopify Engineering](https://shopify.engineering/latest) · [Liquid Weekly](https://liquidweekly.com/blogs/podcast) · [Kurt Elster](https://kurtelster.com/)*
