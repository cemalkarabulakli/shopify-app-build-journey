<script lang="ts">
	import { onMount } from 'svelte';
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	import { unlocked } from '$lib/client/gamification';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { data } = $props();
	const progress = createReadingProgress();
	const tasks = createReadingProgress('phases:done');
	// Everything renders open on the server (crawlers, no-JS); seals apply once the reader's progress is known.
	let mounted = $state(false);
	onMount(() => (mounted = true));
	const open = $derived(unlocked(data.stages, progress.has, tasks.has));
	const isOpen = (slug: string) => !mounted || open.doc(slug);
	const done = $derived(data.docs.filter((d) => progress.has(d.slug)).length);
</script>

<Seo site={data.site} title={t.library.title} description="{t.library.eyebrow} — {data.site.description}" path="/docs" />

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">{t.library.eyebrow}</p>
	<h1 class="mb-2 text-3xl font-extrabold text-ink">{t.library.title}</h1>
	<p class="text-muted">{t.library.lede} <a href="/" class="text-forest">{t.library.ledeLink}</a>.</p>
	<p class="mt-2 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-muted">🔒 {t.library.sealedLede}</p>
</section>

<div class="mt-6 flex items-center gap-3 text-sm text-muted">
	<span>📖 {done}/{data.docs.length} {t.library.read}</span>
	<div class="h-2 flex-1 overflow-hidden rounded-full bg-bg-deep"><div class="h-full rounded-full bg-gradient-to-r from-forest to-gold transition-[width] duration-500" style="width:{data.docs.length ? (done / data.docs.length) * 100 : 0}%"></div></div>
</div>

<ol class="card mt-3 mb-10 divide-y divide-line">
	{#each data.docs as doc, i (doc.slug)}
		{@const isRead = progress.has(doc.slug)}
		{@const sealed = !isOpen(doc.slug)}
		<li class="flex items-start gap-3 px-4 py-3 {sealed ? 'opacity-60' : ''}">
			{#if sealed}
				<span class="grid h-5 w-5 place-items-center text-sm" title={t.library.sealed} aria-label={t.library.sealed}>🔒</span>
			{:else}
				<label class="grid h-5 w-5 cursor-pointer place-items-center rounded-md border-2 text-xs text-white {isRead ? 'border-forest bg-forest' : 'border-line hover:border-gold'}">
					<input type="checkbox" class="sr-only" checked={isRead} onchange={() => progress.toggle(doc.slug)} aria-label={t.library.readLabel} />{isRead ? '✓' : ''}
				</label>
			{/if}
			<span class="w-7 pt-0.5 font-display text-xs font-extrabold text-muted">{String(i + 1).padStart(2, '0')}</span>
			<div class="min-w-0 flex-1">
				{#if sealed}
					<span class="text-ink">{doc.title}</span>
					{#if doc.summary}<p class="mt-0.5 line-clamp-2 text-sm text-muted">{doc.summary}</p>{/if}
				{:else}
					<a href="/docs/{doc.slug}" class="no-underline {isRead ? 'text-muted line-through' : 'text-ink hover:text-ember'}">{doc.title}</a>
				{/if}
			</div>
		</li>
	{/each}
</ol>

{#if data.intro}
	<!-- HTML is rendered from our own markdown in /docs -->
	<div class="prose-map">{@html data.intro.html}</div>
{/if}
