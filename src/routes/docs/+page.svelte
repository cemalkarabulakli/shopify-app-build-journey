<script lang="ts">
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	let { data } = $props();
	const progress = createReadingProgress();
	const done = $derived(data.docs.filter((d) => progress.has(d.slug)).length);
</script>

<svelte:head>
	<title>Kütüphane · {data.site.name}</title>
	<meta name="description" content="Yolculuğun arkasındaki araştırma parşömenleri, okuma sırasıyla." />
	<link rel="canonical" href={data.site.url + '/docs'} />
</svelte:head>

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">Parşömen Kütüphanesi</p>
	<h1 class="mb-2 text-3xl font-extrabold text-ink">{data.intro?.title ?? 'Kütüphane'}</h1>
	<p class="text-muted">Her parşömen bir adımda okunur; haritada nerede olduğunu <a href="/" class="text-forest">Harita</a>'dan takip et.</p>
</section>

<div class="mt-6 flex items-center gap-3 text-sm text-muted">
	<span>📖 {done}/{data.docs.length} okundu</span>
	<div class="h-2 flex-1 overflow-hidden rounded-full bg-bg-deep"><div class="h-full rounded-full bg-gradient-to-r from-forest to-gold transition-[width] duration-500" style="width:{data.docs.length ? (done / data.docs.length) * 100 : 0}%"></div></div>
</div>

<ol class="card mt-3 mb-10 divide-y divide-line">
	{#each data.docs as doc, i (doc.slug)}
		{@const isRead = progress.has(doc.slug)}
		<li class="flex items-center gap-3 px-4 py-3">
			<label class="grid h-5 w-5 cursor-pointer place-items-center rounded-md border-2 text-xs text-white {isRead ? 'border-forest bg-forest' : 'border-line hover:border-gold'}">
				<input type="checkbox" class="sr-only" checked={isRead} onchange={() => progress.toggle(doc.slug)} aria-label="Okundu" />{isRead ? '✓' : ''}
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
