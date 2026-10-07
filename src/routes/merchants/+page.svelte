<script lang="ts">
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	import { reachOutLink, reachedCount } from '$lib/client/outreach';
	import Burst from '$lib/components/Burst.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { data } = $props();
	// Per browser, like every other progress (R8); nothing about outreach reaches the server.
	const reached = createReadingProgress('merchants:reached');
	let burst: Burst;

	const count = $derived(reachedCount(data.merchants.map((m) => m.id), reached.has));
	function toggle(id: string) {
		const before = count;
		reached.toggle(id);
		if (before < data.target && before + 1 >= data.target && reached.has(id)) burst.fire(t.merchants.questDone);
	}
</script>

<Seo site={data.site} title={t.merchants.title} description="{t.merchants.eyebrow} — {data.site.description}" path="/merchants" />
<Burst bind:this={burst} />

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">{t.merchants.eyebrow}</p>
	<h1 class="mb-2 text-3xl font-extrabold text-ink">{t.merchants.title}</h1>
	<p class="max-w-3xl text-muted">{t.merchants.lede}</p>
</section>

<div class="mt-6 flex items-center gap-3 text-sm text-muted">
	<span>⚔️ {t.merchants.progress(count, data.target)}</span>
	<div class="h-2 flex-1 overflow-hidden rounded-full bg-bg-deep">
		<div class="h-full rounded-full bg-gradient-to-r from-forest to-gold transition-[width] duration-500" style="width:{Math.min(100, (count / data.target) * 100)}%"></div>
	</div>
</div>

<ul class="mt-4 mb-10 grid gap-4 sm:grid-cols-2">
	{#each data.merchants as m (m.id)}
		{@const link = reachOutLink({ name: m.name, fact: m.factEn, email: m.email, contactPage: m.contactPage })}
		{@const isReached = reached.has(m.id)}
		<li class="card flex flex-col gap-3 p-5 {isReached ? 'ring-2 ring-forest/40' : ''}">
			<div>
				<h2 class="text-xl font-extrabold text-ink">{m.name}</h2>
				<p class="text-sm text-muted">{t.merchants.sells}: {m.sells}</p>
			</div>
			<p class="text-[.95rem]">
				📈 {m.fact}
				<a href={m.sourceUrl} target="_blank" rel="noopener noreferrer" class="ml-1 text-xs whitespace-nowrap text-forest">{t.merchants.source} ↗</a>
			</p>
			{#if m.stories.length}
				<p class="text-sm text-muted">
					{t.merchants.story}
					{#each m.stories as s, i (s.slug)}{i ? ', ' : ' '}<a href="/docs/{s.slug}" class="text-forest">📜 {s.title}</a>{/each}
				</p>
			{/if}
			<div class="mt-auto flex flex-wrap items-center gap-2 pt-1">
				<a
					href={link.href}
					target={link.newTab ? '_blank' : undefined}
					rel={link.newTab ? 'noopener noreferrer' : undefined}
					title={m.email ? t.merchants.viaEmail : t.merchants.viaPage}
					class="rounded-full bg-forest px-4 py-1.5 text-sm font-bold text-white no-underline hover:bg-forest-soft">✉️ {t.merchants.reachOut}</a
				>
				<a href={m.storeUrl} target="_blank" rel="noopener noreferrer" class="rounded-full border border-line px-3 py-1.5 text-sm no-underline text-ink hover:bg-gold/10">{t.merchants.store} ↗</a>
				<label class="ml-auto flex cursor-pointer items-center gap-2 text-sm {isReached ? 'text-forest' : 'text-muted'}">
					<input type="checkbox" class="peer sr-only" checked={isReached} onchange={() => toggle(m.id)} />
					<span class="grid h-5 w-5 place-items-center rounded-md border-2 text-xs text-white peer-focus-visible:ring-2 peer-focus-visible:ring-gold {isReached ? 'border-forest bg-forest' : 'border-line'}">{isReached ? '✓' : ''}</span>
					{isReached ? t.merchants.marked : t.merchants.mark}
				</label>
			</div>
			<p class="text-xs text-muted">{m.email ? t.merchants.viaEmail : t.merchants.viaPage}</p>
		</li>
	{/each}
</ul>
