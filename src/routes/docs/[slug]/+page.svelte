<script lang="ts">
	import { onMount } from 'svelte';
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	import { XP_PER_DOC, unlocked } from '$lib/client/gamification';
	import Burst from '$lib/components/Burst.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { data } = $props();
	const progress = createReadingProgress();
	const tasks = createReadingProgress('phases:done');
	// Server-rendered open (crawlers, no-JS); the seal is applied once the reader's progress is known.
	let mounted = $state(false);
	onMount(() => (mounted = true));
	const open = $derived(unlocked(data.stages, progress.has, tasks.has));
	const sealed = $derived(mounted && !open.doc(data.doc.slug));
	const stageOpen = $derived(!data.stage || open.stage(data.stage.id));
	const isRead = $derived(progress.has(data.doc.slug));
	const nextOpen = $derived(!!data.next && open.doc(data.next.slug));
	let burst: Burst;
	function mark() {
		const was = isRead;
		progress.toggle(data.doc.slug);
		if (was) return;
		burst.fire(data.next && open.doc(data.next.slug) ? t.library.unsealed(data.next.title) : t.xpToast(XP_PER_DOC));
	}
</script>

<Seo site={data.site} title={data.doc.title} description={data.doc.summary || `${data.doc.title} — ${data.site.description}`} path="/docs/{data.doc.slug}" type="article" markdownPath="/docs/{data.doc.slug}.md" />

<Burst bind:this={burst} />

<article class="card animate-enter p-6 sm:p-8">
	<header class="mb-6 border-b border-dashed border-line pb-5">
		<p class="mb-2 text-sm"><a href="/docs" class="text-forest no-underline hover:text-ember">{t.library.back}</a></p>
		<h1 class="text-3xl leading-tight font-extrabold text-ink">{sealed ? '🔒' : '📜'} {data.doc.title}</h1>
	</header>

	{#if sealed}
		<!-- Only the title and the summary show while the scroll is sealed. -->
		{#if data.doc.summary}<p class="text-lg text-muted">{data.doc.summary}</p>{/if}
		<div class="mt-6 rounded-xl border border-gold/40 bg-gold/10 p-5">
			<p class="font-extrabold text-ink">🔒 {t.library.sealed}</p>
			<p class="mt-1 text-sm text-muted">{t.library.sealedLede}</p>
			<p class="mt-3 flex flex-wrap gap-3 text-sm">
				{#if !stageOpen && data.stage}
					<a href="/#faz-{data.stage.n}" class="rounded-full border-2 border-forest px-4 py-1.5 font-extrabold text-forest no-underline hover:bg-forest/10">{t.library.finishPhase(`${t.home.phase} ${data.stage.n}`)} {t.library.toMap}</a>
				{:else if data.prev}
					<a href="/docs/{data.prev.slug}" class="rounded-full border-2 border-forest px-4 py-1.5 font-extrabold text-forest no-underline hover:bg-forest/10">{t.library.readFirst(data.prev.title)} →</a>
				{/if}
			</p>
		</div>
	{:else}
		<!-- HTML is rendered from our own markdown in /docs -->
		<div class="prose-map">{@html data.doc.html}</div>

		<nav class="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-line pt-5 text-sm">
			<span class="max-w-[40%]">{#if data.prev}<a href="/docs/{data.prev.slug}" class="text-forest no-underline hover:text-ember">← {data.prev.title}</a>{/if}</span>
			<button
				class="rounded-full border-2 px-5 py-2 font-extrabold transition active:scale-95 {isRead ? 'border-forest bg-forest text-white' : 'border-gold bg-gold/15 text-ink hover:bg-gold/30'}"
				onclick={mark}
			>
				{isRead ? t.library.marked : t.library.markRead(XP_PER_DOC)}
			</button>
			<span class="max-w-[40%] text-right">
				{#if data.next}
					{#if nextOpen}
						<a href="/docs/{data.next.slug}" class="text-forest no-underline hover:text-ember">{data.next.title} →</a>
					{:else}
						<span class="text-muted" title={isRead ? t.library.finishPhase(`${t.home.phase} ${data.stage?.n ?? ''}`) : t.library.unlockNext}>🔒 {data.next.title}</span>
						<small class="block text-xs text-muted">{isRead ? t.library.finishPhase(`${t.home.phase} ${data.stage?.n ?? ''}`) : t.library.unlockNext}</small>
					{/if}
				{/if}
			</span>
		</nav>
	{/if}
</article>
