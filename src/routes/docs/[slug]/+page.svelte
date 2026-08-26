<script lang="ts">
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	let { data } = $props();
	const progress = createReadingProgress();
	const canonical = $derived(`${data.site.url}/docs/${data.doc.slug}`);
	const isRead = $derived(progress.has(data.doc.slug));
</script>

<svelte:head>
	<title>{data.doc.title} · {data.site.name}</title>
	<meta name="description" content={data.doc.summary || data.doc.title} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content={data.doc.title} />
	<meta property="og:url" content={canonical} />
</svelte:head>

<article class="post docs">
	<header>
		<p class="back"><a href="/docs">← Docs</a></p>
		<h1>{data.doc.title}</h1>
	</header>
	<!-- HTML is rendered from our own markdown in /docs -->
	{@html data.doc.html}

	<nav class="docs-nav">
		<span>{#if data.prev}<a href="/docs/{data.prev.slug}">← {data.prev.title}</a>{/if}</span>
		<button class="read-toggle" class:done={isRead} onclick={() => progress.toggle(data.doc.slug)}>
			{isRead ? '✓ Okundu' : 'Okudum olarak işaretle'}
		</button>
		<span>{#if data.next}<a href="/docs/{data.next.slug}">{data.next.title} →</a>{/if}</span>
	</nav>
</article>
