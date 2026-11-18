# Spec 0006 — The /switch offer is honest and billable (mini)

- Status: Draft
- Mode: lite
- Plan: `specs/plans/0006-plan.md`
- Source: Change request 2026-11-18 "fix /switch". Research report `reports/Shopify Q4 2026 merchant problems.md` (local, not in git), section "Zero-Churn Switch: keep the target, rebuild the offer"
- Supersedes: — (no shipped spec covers `/switch`; the glossary entry "Founding offer (Deposit)" in `docs/domain.md` is updated)

## Intent
The `/switch` founding offer promises things we can't safely keep or legally bill. It credits a Paddle
deposit against the app subscription, which Shopify's app billing rule forbids: an App Store app's fee
must be billed through Shopify. It promises "12 months free" for a single lost subscriber. It says
"14 days" for every store, and it compares against Recharge rates that may be out of date. Before any
outreach goes out, the page must describe an offer we can deliver and bill: the deposit pays for the
migration service, the app is billed by Shopify, the guarantee is narrow and capped, and the timeline
depends on the store's payment setup.

## Changed behavior
- [ ] CB-1 — **The deposit pays for the migration service, not the app.**
  - The page and the thanks page call the $500 a deposit for the white-glove migration service.
  - It is fully refundable until the migration starts. Once the migration starts it is the migration fee, not a refund.
  - No text on `/switch` or `/switch/thanks` says the deposit is credited to, counted against, or deducted from the app subscription or any invoice.
- [ ] CB-2 — **The app subscription is billed by Shopify.**
  - The page states that the $299/mo subscription is billed through Shopify, on the merchant's Shopify invoice.
  - The payments note under the deposit button names Paddle only for the deposit.
- [ ] CB-3 — **The guarantee is narrow and capped.** Every place that describes the guarantee (hero, offer list, FAQ, SEO description if mentioned) says the same thing:
  - **What it covers:** subscriber churn caused by the migration, meaning a subscriber who was active in the pre-cutover snapshot and is lost or wrongly billed because of a lost payment method, a double charge, or a missed renewal, within 30 days after cutover.
  - **The remedy:** we refund that customer any wrong charge, and the merchant gets a $299 credit per affected subscriber. Credits are capped at the subscription fees the merchant has paid.
  - **No other remedy:** "12 months free" no longer appears anywhere.
- [ ] CB-4 — **The 14-day promise depends on the payment setup.**
  - "14 days" is promised only for stores on Shopify Checkout with Shopify Payments.
  - Other gateways (Stripe, Braintree, Authorize.net) see "scoped after a free switch audit, typically 4–6 weeks".
  - The hero, offer list, FAQ and SEO description all follow this rule. None says "14 days" without the condition.
- [ ] CB-5 — **The fee comparison uses current reported rates and does not overclaim.**
  - **The comparison card:**
    - It is labelled "Recharge Plus".
    - It computes $499 + 1.34% of monthly subscription revenue + $0.19 per order, where orders = revenue ÷ average order value.
    - Average order value 0 or empty gives orders = 0, not an error or "Infinity".
    - Yearly saving = max(0, (Recharge monthly − 299) × 12).
  - **The saving line** reads as an estimate ("about …").
  - **The note under the calculator** says the rates are Recharge's reported 2026 pricing, may differ from the merchant's plan, and invites them to bring their invoice.
- [ ] CB-6 — **No lifetime promises and no waived-fee anchor.**
  - "Locked for life", "never rises" and "permanent price" are replaced by "locked as long as you stay subscribed".
  - The "$2,000 migration fee waived" framing does not appear anywhere.
  - `docs/domain.md` defines "Founding offer (Deposit)" as a refundable Paddle deposit for the migration service of the Zero-Churn Switch, not a subscription and not credited to it.

## Preserved behavior
<!-- Mini characterization, written from the current page (main @ eaaafae). -->
- [ ] PB-1 — **The deposit checkout works exactly as today.**
  - "Reserve for $500 →" opens the Paddle overlay with the same deposit price id from `content/switch-catalog.json`.
  - The email is prefilled when the reader has entered one.
  - `customData.offer = "zero-churn-switch"`, and the success URL is `/switch/thanks`.
  - The button shows "Loading checkout…" and "Checkout opens soon" in the same states as today.
- [ ] PB-2 — **The layout is unchanged.**
  - `/switch` and `/switch/thanks` still show no site header or footer (0004/PB-4, 0005/PB-2).
  - No horizontal scroll at 320, 390, 768 or 1280 px.
- [ ] PB-3 — **The calculator still updates live.** It recalculates as either input changes, with defaults of $150,000 revenue and $65 average order value.
- [ ] PB-4 — **The rest of the page is unchanged.**
  - The five founding slots and the $299 founding price are unchanged.
  - The "$499/mo later" public price is unchanged.
  - The FAQ questions not named above are unchanged in meaning.
  - The journal link and the footer are unchanged.
- [ ] PB-5 — **The rest of the site is unaffected.** `scripts/check` stays green with no test weakened.

## Out of scope
- The hard-coded "$500" deposit amount in the copy (BR-4: amounts come from Paddle). This is a separate follow-up.
- Changing the Paddle product, the price id or `content/switch-catalog.json`.
- Building the Shopify app, its billing, or the custom-distribution path (Path B in the report).
- Verifying the Recharge rates on primary pages. That verification is required before outreach, but it is not part of this code change.
- Turkish copy: `/switch` is English-only today and stays so.

## Definition of Done
- [ ] `scripts/check` green
- [ ] Independent review done; real findings fixed, noise rejected with written rationale
- [ ] Criterion ↔ evidence table complete for CB-* **and** PB-* (UI: before/after screenshots)
- [ ] Spec moved to `specs/done/` (immutable there)
