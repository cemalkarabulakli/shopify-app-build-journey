<script lang="ts">
	import { onMount } from 'svelte';
	import { initializePaddle, type Paddle } from '@paddle/paddle-js';
	import Seo from '$lib/components/Seo.svelte';
	let { data } = $props();

	let paddle = $state<Paddle | undefined>();
	// svelte-ignore state_referenced_locally — prefill only; the field is user-owned afterwards
	let email = $state(data.signedInEmail);
	let status = $state<'loading' | 'ready' | 'unavailable'>('loading');

	// Pain math. Recharge Pro published pricing: $499/mo + 1% of GMV + $0.19 per transaction.
	let gmv = $state(150_000);
	let aov = $state(65);
	const orders = $derived(aov > 0 ? gmv / aov : 0);
	const rechargeMonthly = $derived(499 + gmv * 0.01 + orders * 0.19);
	const savedYearly = $derived(Math.max(0, (rechargeMonthly - 299) * 12));
	const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

	onMount(async () => {
		if (!data.paddle.token || !data.depositPriceId) return (status = 'unavailable');
		paddle = await initializePaddle({
			token: data.paddle.token,
			environment: data.paddle.environment,
			checkout: { settings: { displayMode: 'overlay', variant: 'one-page', locale: 'en', successUrl: data.paddle.successUrl, showAddTaxId: true } }
		});
		status = paddle ? 'ready' : 'unavailable';
	});

	function reserve() {
		if (!paddle || !data.depositPriceId) return;
		paddle.Checkout.open({
			settings: { displayMode: 'overlay', variant: 'one-page', successUrl: data.paddle.successUrl },
			items: [{ priceId: data.depositPriceId, quantity: 1 }],
			customer: email ? { email } : undefined,
			customData: { offer: 'zero-churn-switch', ...(email ? { email } : {}) }
		});
	}

	const faq = [
		{
			q: 'Is the deposit really refundable?',
			a: 'Yes, in full, any time before your migration starts — one email, no questions. Once you go live it is credited against your first invoices instead.'
		},
		{
			q: 'What exactly is the zero-churn guarantee?',
			a: 'If any active subscriber is lost or double-billed during the switch, we refund that customer out of our own pocket and you get 12 months free. We run the migration end-to-end, so we can afford to own the outcome.'
		},
		{
			q: 'How does the migration work?',
			a: 'Your subscriptions move onto Shopify’s native subscription contracts — your data stays in your store, not in our silo. We map your plans, run a dry-run import, reconcile every subscriber against the source, then cut over. Fourteen days, done for you.'
		},
		{
			q: 'Why is it $299/mo here and $499/mo later?',
			a: 'The first five merchants shape the product around their real catalogs and carry the early bumps. That work is worth a permanent price: $299/mo locked for life, and the $2,000 white-glove migration fee waived.'
		},
		{
			q: 'Who is building this?',
			a: 'A solo developer, in public — every step, including the numbers, is published in the build journal on this site. You can read exactly where the product stands before you put down a cent.'
		}
	];
</script>

<Seo
	site={data.site}
	title="The Zero-Churn Switch — flat-rate subscriptions for Shopify Plus"
	description="Stop paying a percentage of your subscription revenue. Flat $299/mo for founding merchants, migrated from Recharge in 14 days, with a zero-churn guarantee."
	path="/switch"
/>

<div class="mx-auto max-w-3xl px-5 pt-10 pb-16">
	<!-- Own top bar: the offer stands alone, the journal is the trust link. -->
	<nav class="mb-12 flex items-center justify-between text-sm">
		<span class="font-display text-lg font-extrabold text-ink">Zero-Churn Switch</span>
		<a href="/journal" class="text-muted underline decoration-line underline-offset-4 hover:text-ink">Built in public — read the journal →</a>
	</nav>

	<section class="animate-enter">
		<p class="mb-3 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">Founding-merchant offer · 5 slots</p>
		<h1 class="text-4xl leading-tight font-extrabold text-ink sm:text-5xl">Every dollar Recharge skims, you keep.</h1>
		<p class="mt-4 max-w-2xl text-lg text-muted">
			A flat-rate subscription engine for Shopify Plus merchants — no percentage of your GMV, ever. We move your active
			subscribers for you in 14 days, backed by a zero-churn guarantee.
		</p>
	</section>

	<!-- Pain math -->
	<section class="card animate-enter mt-10 p-6" style="animation-delay:80ms">
		<h2 class="text-xl font-extrabold text-ink">What the percentage costs you</h2>
		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			<label class="text-sm font-extrabold text-ink">
				Monthly subscription revenue
				<input type="number" bind:value={gmv} min="0" step="5000" class="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 font-sans text-base font-normal text-ink focus:border-forest focus:ring-2 focus:ring-forest/30 focus:outline-none" />
			</label>
			<label class="text-sm font-extrabold text-ink">
				Average order value
				<input type="number" bind:value={aov} min="1" step="5" class="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 font-sans text-base font-normal text-ink focus:border-forest focus:ring-2 focus:ring-forest/30 focus:outline-none" />
			</label>
		</div>
		<div class="mt-6 grid gap-4 sm:grid-cols-2">
			<div class="rounded-xl border border-ember/30 bg-ember/5 p-4">
				<p class="text-xs font-extrabold tracking-wider text-ember uppercase">Recharge Pro, this month</p>
				<p class="mt-1 font-display text-3xl font-extrabold text-ink tabular-nums">{usd(rechargeMonthly)}</p>
				<p class="mt-1 text-xs text-muted">$499 + 1% of revenue + $0.19 × {Math.round(orders).toLocaleString('en-US')} orders</p>
			</div>
			<div class="rounded-xl border border-forest/40 bg-forest/5 p-4">
				<p class="text-xs font-extrabold tracking-wider text-forest uppercase">Zero-Churn Switch, founding price</p>
				<p class="mt-1 font-display text-3xl font-extrabold text-ink tabular-nums">$299</p>
				<p class="mt-1 text-xs text-muted">Flat. Locked for life. No per-order fee.</p>
			</div>
		</div>
		<p class="mt-4 text-center font-display text-lg font-extrabold text-forest" aria-live="polite">
			You keep {usd(savedYearly)} a year.
		</p>
		<p class="mt-2 text-center text-xs text-muted">Comparison uses Recharge’s published Pro pricing ($499/mo + 1% + $0.19/transaction). Your plan may differ — bring your last invoice and we’ll do the math on a call.</p>
	</section>

	<!-- Offer terms -->
	<section class="animate-enter mt-10" style="animation-delay:140ms">
		<h2 class="text-xl font-extrabold text-ink">The founding slot</h2>
		<ul class="mt-4 space-y-3 text-[1.02rem]">
			<li class="flex gap-3"><span class="text-forest">✓</span><span><strong>$299/mo flat, locked for life</strong> — the price never rises and never grows a percentage, whatever your GMV becomes. (Public price after the first five: $499/mo.)</span></li>
			<li class="flex gap-3"><span class="text-forest">✓</span><span><strong>White-glove migration, done for you in 14 days</strong> — plan mapping, dry-run import, per-subscriber reconciliation, cutover. The $2,000 migration fee is waived for founding merchants.</span></li>
			<li class="flex gap-3"><span class="text-forest">✓</span><span><strong>Zero-churn guarantee</strong> — any subscriber lost or double-billed in the switch is refunded from our pocket, and you get 12 months free.</span></li>
			<li class="flex gap-3"><span class="text-forest">✓</span><span><strong>Built on Shopify’s native subscription contracts</strong> — your subscriber data lives in your store. Leaving us is easy, which is exactly why you won’t need to.</span></li>
			<li class="flex gap-3"><span class="text-forest">✓</span><span><strong>Your complexity gets built first</strong> — pauses, swaps, tier automation, B2B billing: founding merchants’ catalogs set the roadmap.</span></li>
		</ul>
	</section>

	<!-- Deposit CTA -->
	<section class="card animate-enter mt-10 border-2 border-gold/60 p-6 text-center" style="animation-delay:200ms">
		<h2 class="text-2xl font-extrabold text-ink">Reserve a founding slot</h2>
		<p class="mx-auto mt-2 max-w-xl text-muted">
			A <strong class="text-ink">$500 deposit</strong> holds one of the five slots. Fully refundable until your migration
			starts; credited to your first invoices once you’re live.
		</p>
		<div class="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
			<input
				type="email"
				bind:value={email}
				placeholder="you@yourstore.com"
				autocomplete="email"
				aria-label="Email"
				class="flex-1 rounded-full border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/30 focus:outline-none"
			/>
			<button
				class="rounded-full bg-forest px-6 py-3 font-extrabold text-white shadow transition hover:bg-forest-soft hover:text-ink active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50"
				disabled={status !== 'ready'}
				onclick={reserve}
			>
				{status === 'loading' ? 'Loading checkout…' : status === 'unavailable' ? 'Checkout opens soon' : 'Reserve for $500 →'}
			</button>
		</div>
		<p class="mt-3 text-xs text-muted">Payments and invoices handled by Paddle, our merchant of record. VAT included where applicable.</p>
	</section>

	<!-- FAQ -->
	<section class="animate-enter mt-12" style="animation-delay:260ms">
		<h2 class="text-xl font-extrabold text-ink">Questions</h2>
		<dl class="mt-4 space-y-5">
			{#each faq as f (f.q)}
				<div>
					<dt class="font-extrabold text-ink">{f.q}</dt>
					<dd class="mt-1 text-[.95rem] text-muted">{f.a}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<footer class="mt-14 border-t border-line pt-5 text-sm text-muted">
		Built in the open by <a href="/about" class="underline decoration-line underline-offset-4 hover:text-ink">{data.site.author}</a> —
		progress, numbers and wrong turns in the <a href="/journal" class="underline decoration-line underline-offset-4 hover:text-ink">journal</a>.
	</footer>
</div>
