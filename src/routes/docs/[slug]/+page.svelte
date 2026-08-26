<script lang="ts">
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	import { XP_PER_DOC } from '$lib/client/gamification';
	import Burst from '$lib/components/Burst.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { data } = $props();
	const progress = createReadingProgress();
	const isRead = $derived(progress.has(data.doc.slug));
	let burst: Burst;
	function mark() {
		const was = isRead;
		progress.toggle(data.doc.slug);
		if (!was) burst.fire(t.xpToast(XP_PER_DOC));
	}
</script>

<Seo site={data.site} title={data.doc.title} description={data.doc.summary || `${data.doc.title} — ${data.site.description}`} path="/docs/{data.doc.slug}" type="article" markdownPath="/docs/{data.doc.slug}.md" />

<Burst bind:this={burst} />

<article class="card animate-enter p-6 sm:p-8">
	<header class="mb-6 border-b border-dashed border-line pb-5">
		<p class="mb-2 text-sm"><a href="/docs" class="text-forest no-underline hover:text-ember">{t.library.back}</a></p>
		<h1 class="text-3xl leading-tight font-extrabold text-ink">📜 {data.doc.title}</h1>
		{#if t.library.trNotice}<p class="mt-3 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-muted">🇹🇷 {t.library.trNotice}</p>{/if}
	</header>
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
		<span class="max-w-[40%] text-right">{#if data.next}<a href="/docs/{data.next.slug}" class="text-forest no-underline hover:text-ember">{data.next.title} →</a>{/if}</span>
	</nav>
</article>
