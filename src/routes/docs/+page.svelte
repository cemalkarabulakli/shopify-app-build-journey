<script lang="ts">
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	let { data } = $props();
	const progress = createReadingProgress();
	const done = $derived(data.docs.filter((d) => progress.has(d.slug)).length);
</script>

<svelte:head>
	<title>Docs · {data.site.name}</title>
	<meta name="description" content="Learning notes and research behind the app, in reading order." />
	<link rel="canonical" href={data.site.url + '/docs'} />
</svelte:head>

<article class="post docs">
	<header>
		<h1>{data.intro?.title ?? 'Docs'}</h1>
	</header>

	<div class="docs-progress">
		<span>{done}/{data.docs.length} okundu</span>
		<div class="bar"><i style="width:{data.docs.length ? (done / data.docs.length) * 100 : 0}%"></i></div>
	</div>
	<ol class="docs-list">
		{#each data.docs as doc, i (doc.slug)}
			<li class:read={progress.has(doc.slug)}>
				<input type="checkbox" checked={progress.has(doc.slug)} onchange={() => progress.toggle(doc.slug)} aria-label="Okundu" />
				<span class="num">{String(i + 1).padStart(2, '0')}</span>
				<a href="/docs/{doc.slug}">{doc.title}</a>
			</li>
		{/each}
	</ol>

	{#if data.intro}
		<!-- HTML is rendered from our own markdown in /docs -->
		{@html data.intro.html}
	{/if}
</article>
