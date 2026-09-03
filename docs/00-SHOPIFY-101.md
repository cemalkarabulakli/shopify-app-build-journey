# Shopify 101 — For the Developer Who Knows Nothing About It

> The person reading this file: **knows how to write code**, understands a bit of marketing, has
> **zero** knowledge of Shopify. Goal: after 30 minutes of reading, be able to answer "what is a
> Shopify app, what am I going to build, where does the money come from". No setup, just a clear
> picture in your head.

---

## 1. What exactly is Shopify?

An e-commerce **SaaS**. A business pays a monthly fee and gets a ready-made online store in return:
product management, cart, payments, shipping, tax, admin panel. You open a store without writing code.

There are three parties in the ecosystem:

| Party | Who | What they want |
|---|---|---|
| **Merchant** (seller) | The store owner. Our customer. | More sales, less manual work |
| **Shopify** | The platform | Ecosystem growth, commission |
| **Partner / Developer** | **Us** | Sell tools to merchants and make money |

Critical point: **our customer is the merchant, not Shopify.** Shopify is just the distribution
channel — the intermediary that runs the App Store, issues the invoice and collects the money.

## 2. What is a Shopify app?

Software that does a job Shopify doesn't do on its own, which the merchant **installs** into their store.

Examples (real App Store categories):
- Automatically collecting and displaying product reviews
- WhatsApp/SMS reminders for abandoned carts
- Automatic reorders to the supplier when stock runs low
- Printing shipping labels, managing returns
- "Buy this too" recommendations on the product page

Technically, the app **does not run on Shopify's servers.** It is a normal web application sitting on
your own server (in our case, on Coolify). Shopify only:
1. Sends the merchant to you via OAuth,
2. Shows your application inside the admin panel in an **iframe**,
3. Gives you an **access token** to access the store's data.

So it's a web app as you know it. What's new: the authentication flow, the APIs and billing are tied to Shopify.

## 3. Mental model — the pieces

```
                 ┌────────────────────────────────────────────┐
                 │  Shopify Admin (what the merchant sees)    │
                 │  ┌──────────────────────────────────────┐  │
   merchant ───► │  │  <iframe> YOUR APP                   │  │
                 │  │  (running on your server)            │  │
                 │  └──────────────────────────────────────┘  │
                 └────────────────────────────────────────────┘
                            │  Admin GraphQL API (you → Shopify: read/write data)
                            ▼
                 ┌────────────────────────────────────────────┐
                 │  Shopify: products, orders, customers      │
                 └────────────────────────────────────────────┘
                            │  Webhook (Shopify → you: "an order came in")
                            ▼
                     your server / your database
```

There are three directions, don't mix them up:
- **iframe** → the merchant sees your UI inside the admin (this is called an *embedded app*).
- **API call** → you ask Shopify for data. GraphQL. (The REST API is legacy now; don't write new code against it.)
- **Webhook** → Shopify notifies you of an event. Order created, product deleted, app uninstalled.

## 4. Glossary — you can't move forward without these

| Term | What it means |
|---|---|
| **Merchant** | The store owner. Your customer. |
| **Store / shop** | A single store. Has a permanent name like `something.myshopify.com`. |
| **Partner account** | Your developer account. Free. Your apps and test stores live here. |
| **Development store** | A free test store filled with fake data. Can't make real sales. This is where you develop. |
| **Embedded app** | An app that opens in an iframe inside the admin. This is the standard. |
| **App Bridge** | Shopify's library that lets your JS inside the iframe talk to the admin outside it (open a modal, redirect, show a toast). |
| **Session token** | Identity in an embedded app. Because it's an iframe, cookies can't be trusted; a short-lived JWT comes with every request. |
| **Access token** | The key you receive when a merchant installs the app, granting access to that store's API. One per store. |
| **Scopes** | Permissions. Like `read_products`, `write_orders`. Every permission you ask for is shown to the merchant on the install screen — asking for too many lowers installs. |
| **Admin GraphQL API** | The main API for reading/writing store data. |
| **Webhook** | An event notification Shopify sends you (HTTP POST). |
| **Extension** | The part of your app that injects code somewhere outside the admin (see below). |
| **Theme** | The store's storefront — a theme written with Liquid templates. A separate world from the app. |
| **Liquid** | Shopify's theme templating language. You'll see little of it writing apps, a lot of it if you get into theme work. |
| **App Store** | apps.shopify.com — the marketplace where apps are listed. Getting in requires **review**. |
| **Custom app** | An app written for a single store, not listed on the App Store. No review. |
| **Shopify Functions** | WASM code that runs on Shopify's own infrastructure (discount logic, shipping rules). Rare but powerful. |

## 5. Types of apps — deciding what to build

**Public app** — Listed on the App Store, anyone can install it. Scales, but goes through the review process.
👉 *This is our target.*

**Custom app** — For a single merchant. No review, fast. Like consulting work; doesn't scale, but
brings in the first money quickly and teaches you the real problem.

**Extensions** — Parts of your app that reach outside the admin:
- *Theme app extension* → adds a block to the storefront (e.g. a review box on the product page)
- *Checkout UI extension* → adds fields to the checkout page (some parts require the Plus plan)
- *Admin UI extension* → adds buttons/panels to the admin's own pages
- *Shopify Functions* → runs discount/shipping logic inside Shopify

At the start, an **embedded admin app** alone is enough. Extensions come later.

## 6. How is money made?

You charge the merchant a **subscription** (typical: $9–99/mo, some usage-based). You don't collect
the money yourself: via the **Billing API**, Shopify adds it to the merchant's existing invoice,
charges it, and pays you. No credit card integration — this is a huge convenience.

Shopify takes a revenue share. The current general framework: 0% up to a certain annual threshold,
a share above it. **The rates change — confirm them in the Partner docs at the time you apply**,
don't trust the number here.

A realistic sense of scale: $30/mo × 50 merchants = $1,500/mo. That's a small-to-mid but real app on
the App Store. Set your target from here, not from "there are millions of merchants".

## 7. Why this business is attractive for a developer — and where the trap is

**Attractive:**
- Payment infrastructure, authentication and the distribution channel come ready-made.
- Your customer is already a paying business; no B2C "user waiting for free stuff" problem.
- Merchants are easy to find: they openly talk about what they sell, their revenue, their problems.

**Trap:**
- App Store competition is fierce; every popular category has 50+ apps.
- Merchants install apps like items in a shopping cart and delete them a month later. **Churn is high.**
- A "nice app" doesn't sell; a **measurable result** sells (conversion went up, saved this many hours).
- The biggest mistake: learn the platform, write code for 3 months, then publish something nobody wants.

That's why in the roadmap the technical warm-up is **deliberately short**, followed by merchant conversations.

## 8. The 5 sentences that need to be clear in your head

1. Shopify app = a normal web application running on my own server, shown in the admin via an iframe.
2. Merchant installs → OAuth → I get an access token for that store.
3. I read data with the Admin GraphQL API, I hear about events via webhooks.
4. Shopify collects the money via the Billing API and pays me.
5. The hard part isn't the code; it's **which merchant's which pain I'm solving.**

## 9. What's next

We got this far without installing anything. Setup and the first running application:
👉 [LEARNING.md](LEARNING.md) — Session 1.

---

*Sources: shopify.dev (official docs), partners.shopify.com. This file gets corrected as we learn —
if you see something wrong, change it and add a date.*
