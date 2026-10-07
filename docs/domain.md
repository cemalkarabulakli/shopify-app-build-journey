# Domain

The shared language between business, humans, and agents. If a term isn't here, expect the AI to
invent its own meaning for it.

## Ubiquitous language

| Term | Meaning | Notes / not to be confused with |
|---|---|---|
| Entry | A journal post: `content/posts/<slug>.md`, served at `/posts/<slug>` | Code type is `Post`; not a Doc |
| Doc (Scroll) | A learning note `docs/NN-*.md`, served at `/docs/<slug>`; reading order = filename | Not the ANEW engineering docs (`architecture.md` etc.), which are never published (BR-11) |
| Path | The ordered learning path (`content/path.<locale>.json`) shown on the home page | |
| Stage | One phase of the Path, rendered as a sealable map stage with its Docs | |
| XP | Client-side reading gamification (`lib/client/gamification.ts`) | Not money, not membership |
| Chapter | One of the journey's four parts (Learn Shopify · Build basic apps · Merchants & ecosystem · Our app), a run of phases | Not a phase |
| Quest | A real-world task on a phase (`path.<locale>.json`), ticked by the reader for bonus XP | Not the phase's "done when" task, which unseals |
| Merchant (card) | A curated successful Shopify merchant on `/merchants` (`content/merchants.json`) | Not a VIP customer |
| Outreach | The reader contacting a merchant from their own mail app or the merchant's contact page | The site never sends it |
| Member (VIP) | A person whose subscription currently grants access (BR-2) | Not "customer": a customer may have no access |
| Tier | A paid plan: Starter, Pro, Advanced; monthly or yearly price ids | Prices live in Paddle, not in code (BR-4) |
| Trial | Free days before the first charge (`trialDays` in `vip-catalog.json`) | |
| Billing mirror | Postgres copy of Paddle state: Customer, Subscription, Transaction, Webhook event | Paddle is the source of truth |
| Magic link | Hashed one-time login token sent by email | No passwords exist |
| Session | HMAC-signed cookie holding only the email | |
| Admin | An email listed in `ADMIN_EMAILS` | Not a tier |
| Feature request | A public roadmap item with status `considering · planned · building · shipped · declined` | "Open" = first three |
| Vote | One weighted endorsement of an open Feature request | Weight is fixed when cast |
| Roadmap / Changelog | The board's open requests / its `shipped` requests | Same table, different filter |
| Founding offer (Deposit) | The `/switch` pre-sale: a Paddle deposit for the Zero-Churn Switch app | Not a VIP subscription |

## Business rules
- **BR-1** A draft entry (`draft: true`) is invisible everywhere: index, page, feed, sitemap.
- **BR-2** Access is granted for subscription status `active`, `trialing`, `past_due`; denied for
  `paused`, `canceled`. A *scheduled* cancel or pause never revokes access before it takes effect.
- **BR-3** Paddle is the source of truth. Webhooks are verified on the raw body, applied
  idempotently by event id, and an older event never overwrites newer state (`occurred_at`).
- **BR-4** Prices are never hard-coded: amounts come from Paddle at runtime, price ids from
  `content/vip-catalog.json` / `content/switch-catalog.json`.
- **BR-5** Login tokens are stored hashed, are single-use, and expire.
- **BR-6** A Feature request has a title of 4–120 chars, a body of 10–2000 chars, a note of ≤ 500
  chars; one author holds at most 5 open requests; the body is rendered as plain text only.
- **BR-7** One vote per person per request. Weight is 3 for a Member, 1 otherwise, fixed at the
  moment of voting. Only open requests accept votes. The board shows voters and member voters
  next to the score.
- **BR-8** Entering `shipped` stamps `shippedAt`; leaving it clears the stamp. Declined requests
  stay publicly visible with their note.
- **BR-9** Only an Admin may change a request's status.
- **BR-10** *(retired 2026-10-07: the project/milestone code was never shipped — spec 0003 D2.)*
- **BR-11** From `docs/`, only `NN-<name>.md` (exactly two digits, then a dash), `README.md` and
  `LEARNING.md` (exact case) are published. Every other file there is unreachable (404) and absent
  from the docs list, home page, sitemap and `llms*.txt`. Journal entries are not affected.
- **BR-12** A quest is worth 150 XP while ticked and never seals or unseals a phase or scroll. The
  outreach quest is not ticked: it is done exactly while 3 or more different merchants are marked
  as reached out to. All reader progress stays in the reader's browser.
- **BR-13** Outreach never leaves through the site: "Reach out" opens the reader's own mail app
  addressed to an email the merchant itself publishes for business or press (with that page
  recorded), or else the merchant's public contact page. A merchant figure is shown only with its
  public source.

## Key domain invariants
- No one loses paid access early (BR-2), and no one gains it from client-supplied data:
  membership is always resolved server-side from the billing mirror.
- Billing state only changes from verified Paddle events (BR-3).
- Entities are valid from construction: `create()` rejects invalid data, `withX()` returns a new
  instance — a route can never write a half-valid row.
