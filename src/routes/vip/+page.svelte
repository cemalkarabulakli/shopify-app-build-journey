<script lang="ts">
	import { onMount } from 'svelte';
	import { initializePaddle, type Paddle } from '@paddle/paddle-js';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	import type { BillingCycle, Tier } from '$lib/vip/tiers';
	import { UNKNOWN_COUNTRY } from '$lib/vip/country';
	let { data } = $props();
	const { t, locale } = useI18n();

	let paddle = $state<Paddle | undefined>();
	// svelte-ignore state_referenced_locally — prefill only; the field is user-owned afterwards
	let email = $state(data.signedInEmail);
	let cycle = $state<BillingCycle>('month');
	let status = $state<'loading' | 'ready' | 'unavailable'>('loading');
	/** priceId → formatted total string from Paddle. Displayed verbatim, never recomputed. */
	let totals = $state<Record<string, string>>({});
	let priceError = $state('');

	const priceIds = $derived(data.tiers.flatMap((x) => [x.priceId.month, x.priceId.year]).filter(Boolean));
	const configured = $derived(!!data.paddle.token && priceIds.length > 0);

	onMount(async () => {
		if (!configured) return (status = 'unavailable');
		paddle = await initializePaddle({
			token: data.paddle.token,
			environment: data.paddle.environment,
			checkout: { settings: { displayMode: 'overlay', variant: 'one-page', locale, successUrl: data.paddle.successUrl, showAddTaxId: true } }
		});
		if (!paddle) return (status = 'unavailable');
		await loadPrices(paddle);
		status = 'ready';
	});

	async function loadPrices(p: Paddle) {
		try {
			const res = await p.PricePreview({
				items: priceIds.map((priceId) => ({ priceId, quantity: 1 })),
				// Only pass a real ISO code; otherwise Paddle geolocates from the visitor's IP.
				...(data.country !== UNKNOWN_COUNTRY ? { address: { countryCode: data.country } } : {})
			});
			totals = Object.fromEntries(res.data.details.lineItems.map((li) => [li.price.id, li.formattedTotals.total]));
		} catch (e) {
			priceError = (e as Error).message || 'Could not load prices';
		}
	}

	function subscribe(tier: Tier) {
		const priceId = tier.priceId[cycle];
		if (!paddle || !priceId) return;
		paddle.Checkout.open({
			settings: { displayMode: 'overlay', variant: 'one-page', successUrl: data.paddle.successUrl },
			items: [{ priceId, quantity: 1 }],
			customer: email ? { email } : undefined,
			// Subscription webhooks don't carry the email; ride it along so the member record has it.
			customData: email ? { email } : undefined
		});
	}

	const tierText = (key: Tier['key']) => t.vip.tiers[key];
</script>

<Seo site={data.site} title={t.vip.title} description={t.vip.lede} path="/vip" />

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">{t.vip.eyebrow}</p>
	<h1 class="mb-3 text-3xl leading-tight font-extrabold text-ink sm:text-4xl">{t.vip.title}</h1>
	<p class="max-w-3xl text-lg text-muted">{t.vip.lede}</p>
</section>

<div class="mt-8 flex flex-wrap items-center justify-between gap-4">
	<div class="inline-flex rounded-full border border-line bg-card p-1 text-sm font-extrabold" role="tablist">
		{#each ['month', 'year'] as const as c (c)}
			<button role="tab" aria-selected={cycle === c} class="rounded-full px-4 py-1.5 transition {cycle === c ? 'bg-forest text-white shadow' : 'text-muted hover:text-ink'}" onclick={() => (cycle = c)}>
				{t.vip.cycle[c]}{#if c === 'year'}<span class="ml-1 rounded-full bg-gold/20 px-2 py-0.5 text-[.65rem] text-gold">{t.vip.yearlySave}</span>{/if}
			</button>
		{/each}
	</div>
	<label class="flex items-center gap-2 text-sm font-extrabold text-ink">
		{t.vip.emailLabel}
		<input type="email" bind:value={email} placeholder="you@example.com" autocomplete="email" class="rounded-lg border border-line bg-card px-3 py-1.5 font-sans text-base font-normal text-ink placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/30 focus:outline-none" />
	</label>
</div>

{#if priceError}<p class="mt-4 rounded-lg border border-ember/40 bg-ember/10 px-3 py-2 text-sm text-ember">{priceError}</p>{/if}

<div class="mt-6 grid gap-5 lg:grid-cols-3">
	{#each data.tiers as tier, i (tier.key)}
		{@const text = tierText(tier.key)}
		{@const priceId = tier.priceId[cycle]}
		{@const total = totals[priceId]}
		<article class="card animate-enter relative flex flex-col overflow-hidden p-6 {tier.featured ? 'ring-2 ring-gold/70 lg:-translate-y-2' : ''}" style="animation-delay:{i * 80}ms">
			{#if tier.featured}<span class="absolute top-4 right-4 rounded-full bg-gold px-2.5 py-0.5 text-[.65rem] font-extrabold tracking-wider text-ink uppercase">{t.vip.popular}</span>{/if}
			<div class="text-3xl">{tier.icon}</div>
			<h2 class="mt-2 font-display text-xl font-extrabold text-ink">{text.name}</h2>
			<p class="mt-1 min-h-10 text-sm text-muted">{text.tagline}</p>
			<p class="mt-4 font-display text-4xl font-extrabold text-ink" aria-live="polite">
				{#if total}
					{total}<span class="ml-1 font-sans text-sm font-semibold text-muted">/{t.vip.per[cycle]}</span>
				{:else if status === 'loading'}
					<span class="inline-block h-9 w-28 animate-pulse rounded bg-bg-deep"></span>
				{:else}
					<span class="text-lg text-muted">—</span>
				{/if}
			</p>
			<p class="mt-1 text-xs font-extrabold text-forest">🎁 {t.vip.trial(data.trialDays)}</p>
			<ul class="mt-4 flex-1 space-y-2 text-sm">
				{#each text.perks as perk (perk)}
					<li class="flex gap-2"><span class="text-forest">✓</span><span>{perk}</span></li>
				{/each}
			</ul>
			<button
				class="mt-6 w-full rounded-full px-5 py-3 font-extrabold shadow transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 {tier.featured ? 'bg-forest text-white hover:bg-forest-soft hover:text-ink' : 'border-2 border-forest text-forest hover:bg-forest hover:text-white'}"
				disabled={status !== 'ready' || !priceId || !total}
				onclick={() => subscribe(tier)}
			>
				{status === 'loading' ? t.vip.loading : status === 'unavailable' || !priceId ? t.vip.unavailable : t.vip.cta}
			</button>
		</article>
	{/each}
</div>
<p class="mt-4 text-center text-xs text-muted">{t.vip.secure} · {t.vip.localPricing}</p>

<section class="card mt-10 p-6">
	<h2 class="text-xl font-extrabold text-ink">{t.vip.faqTitle}</h2>
	<dl class="mt-3 grid gap-4 sm:grid-cols-2">
		{#each t.vip.faq as f (f.q)}
			<div>
				<dt class="font-extrabold text-ink">{f.q}</dt>
				<dd class="mt-1 text-sm text-muted">{f.a}</dd>
			</div>
		{/each}
	</dl>
</section>
