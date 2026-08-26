<script lang="ts">
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { data } = $props();
	const progress = createReadingProgress();
	const done = $derived(data.docs.filter((d) => progress.has(d.slug)).length);
</script>

<Seo site={data.site} title={t.library.title} description="{t.library.eyebrow} — {data.site.description}" path="/docs" />

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">{t.library.eyebrow}</p>
	<h1 class="mb-2 text-3xl font-extrabold text-ink">{t.library.title}</h1>
	<p class="text-muted">{t.library.lede} <a href="/" class="text-forest">{t.library.ledeLink}</a>.</p>
	{#if t.library.trNotice}<p class="mt-2 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-muted">🇹🇷 {t.library.trNotice}</p>{/if}
</section>

<div class="mt-6 flex items-center gap-3 text-sm text-muted">
	<span>📖 {done}/{data.docs.length} {t.library.read}</span>
	<div class="h-2 flex-1 overflow-hidden rounded-full bg-bg-deep"><div class="h-full rounded-full bg-gradient-to-r from-forest to-gold transition-[width] duration-500" style="width:{data.docs.length ? (done / data.docs.length) * 100 : 0}%"></div></div>
</div>

<ol class="card mt-3 mb-10 divide-y divide-line">
	{#each data.docs as doc, i (doc.slug)}
		{@const isRead = progress.has(doc.slug)}
		<li class="flex items-center gap-3 px-4 py-3">
			<label class="grid h-5 w-5 cursor-pointer place-items-center rounded-md border-2 text-xs text-white {isRead ? 'border-forest bg-forest' : 'border-line hover:border-gold'}">
				<input type="checkbox" class="sr-only" checked={isRead} onchange={() => progress.toggle(doc.slug)} aria-label={t.library.readLabel} />{isRead ? '✓' : ''}
			</label>
			<span class="w-7 font-display text-xs font-extrabold text-muted">{String(i + 1).padStart(2, '0')}</span>
			<a href="/docs/{doc.slug}" class="flex-1 no-underline {isRead ? 'text-muted line-through' : 'text-ink hover:text-ember'}">{doc.title}</a>
		</li>
	{/each}
</ol>

{#if data.intro}
	<!-- HTML is rendered from our own markdown in /docs -->
	<div class="prose-map">{@html data.intro.html}</div>
{/if}
