<script lang="ts">
	import { onMount } from 'svelte';
	import { initializePaddle, type Paddle } from '@paddle/paddle-js';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	import type { Cycle } from './+page.server';
	let { data } = $props();
	const { t, locale } = useI18n();

	let paddle = $state<Paddle | undefined>();
	let email = $state('');
	let cycle = $state<Cycle>('monthly');
	let status = $state<'loading' | 'ready' | 'unavailable'>('loading');
	const configured = $derived(!!data.paddle.token && data.tiers.some((x) => x.monthly.priceId));

	onMount(async () => {
		if (!configured) return (status = 'unavailable');
		paddle = await initializePaddle({
			token: data.paddle.token,
			environment: data.paddle.environment,
			checkout: { settings: { displayMode: 'overlay', locale, successUrl: data.paddle.successUrl, showAddTaxId: true } }
		});
		status = paddle ? 'ready' : 'unavailable';
	});

	function subscribe(priceId: string | null) {
		if (!paddle || !priceId) return;
		paddle.Checkout.open({
			items: [{ priceId, quantity: 1 }],
			customer: email ? { email } : undefined,
			// Subscription webhooks don't carry the email; ride it along so the member record has it.
			customData: email ? { email } : undefined
		});
	}

	const usd = (n: number) => new Intl.NumberFormat(t.locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
	const tierText = (key: string) => t.vip.tiers[key as keyof typeof t.vip.tiers];
</script>

<Seo
	site={data.site}
	title={t.vip.title}
	description={t.vip.lede}
	path="/vip"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: `${data.site.name} — ${t.vip.title}`,
		description: t.vip.lede,
		url: data.site.url + '/vip',
		offers: data.tiers.flatMap((x) => [
			{ '@type': 'Offer', name: `${tierText(x.key).name} monthly`, price: x.monthly.usd, priceCurrency: 'USD', url: data.site.url + '/vip', availability: 'https://schema.org/InStock' },
			{ '@type': 'Offer', name: `${tierText(x.key).name} yearly`, price: x.yearly.usd, priceCurrency: 'USD', url: data.site.url + '/vip', availability: 'https://schema.org/InStock' }
		])
	}}
/>

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">{t.vip.eyebrow}</p>
	<h1 class="mb-3 text-3xl leading-tight font-extrabold text-ink sm:text-4xl">{t.vip.title}</h1>
	<p class="max-w-3xl text-lg text-muted">{t.vip.lede}</p>
</section>

<div class="mt-8 flex flex-wrap items-center justify-between gap-4">
	<div class="inline-flex rounded-full border border-line bg-card p-1 text-sm font-extrabold" role="tablist">
		{#each ['monthly', 'yearly'] as const as c (c)}
			<button role="tab" aria-selected={cycle === c} class="rounded-full px-4 py-1.5 transition {cycle === c ? 'bg-forest text-white shadow' : 'text-muted hover:text-ink'}" onclick={() => (cycle = c)}>
				{t.vip.cycle[c]}{#if c === 'yearly'}<span class="ml-1 rounded-full bg-gold/20 px-2 py-0.5 text-[.65rem] text-gold">{t.vip.yearlySave}</span>{/if}
			</button>
		{/each}
	</div>
	<label class="flex items-center gap-2 text-sm font-extrabold text-ink">
		{t.vip.emailLabel}
		<input type="email" bind:value={email} placeholder="you@example.com" autocomplete="email" class="rounded-lg border border-line bg-card px-3 py-1.5 font-sans text-base font-normal text-ink placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/30 focus:outline-none" />
	</label>
</div>

<div class="mt-6 grid gap-5 lg:grid-cols-3">
	{#each data.tiers as tier, i (tier.key)}
		{@const text = tierText(tier.key)}
		{@const price = tier[cycle]}
		{@const featured = tier.key === 'pro'}
		<article class="card animate-enter relative flex flex-col overflow-hidden p-6 {featured ? 'ring-2 ring-gold/70 lg:-translate-y-2' : ''}" style="animation-delay:{i * 80}ms">
			{#if featured}<span class="absolute top-4 right-4 rounded-full bg-gold px-2.5 py-0.5 text-[.65rem] font-extrabold tracking-wider text-ink uppercase">{t.vip.popular}</span>{/if}
			<div class="text-3xl">{text.icon}</div>
			<h2 class="mt-2 font-display text-xl font-extrabold text-ink">{text.name}</h2>
			<p class="mt-1 min-h-10 text-sm text-muted">{text.tagline}</p>
			<p class="mt-4 font-display text-4xl font-extrabold text-ink">
				{usd(price.usd)}<span class="ml-1 font-sans text-sm font-semibold text-muted">/{t.vip.per[cycle]}</span>
			</p>
			{#if cycle === 'yearly'}<p class="text-xs text-muted">≈ {usd(price.usd / 12)}/{t.vip.per.monthly}</p>{/if}
			<p class="mt-1 text-xs font-extrabold text-forest">🎁 {t.vip.trial(data.trialDays)}</p>
			<ul class="mt-4 flex-1 space-y-2 text-sm">
				{#each text.perks as perk (perk)}
					<li class="flex gap-2"><span class="text-forest">✓</span><span>{perk}</span></li>
				{/each}
			</ul>
			<button
				class="mt-6 w-full rounded-full px-5 py-3 font-extrabold shadow transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 {featured ? 'bg-forest text-white hover:bg-forest-soft hover:text-ink' : 'border-2 border-forest text-forest hover:bg-forest hover:text-white'}"
				disabled={status !== 'ready' || !price.priceId}
				onclick={() => subscribe(price.priceId)}
			>
				{status === 'loading' ? t.vip.loading : status === 'unavailable' || !price.priceId ? t.vip.unavailable : t.vip.cta}
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
