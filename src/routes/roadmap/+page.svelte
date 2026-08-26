<script lang="ts">
	let { data } = $props();
	const canonical = $derived(`${data.site.url}/roadmap`);
</script>

<svelte:head>
	<title>{data.page.title} · {data.site.name}</title>
	<meta name="description" content={data.page.summary || data.page.title} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content={data.page.title} />
	<meta property="og:description" content={data.page.summary || data.page.title} />
	<meta property="og:url" content={canonical} />
</svelte:head>

<article class="post roadmap">
	<header>
		<h1>{data.page.title}</h1>
		{#if data.page.summary}<p class="lede">{data.page.summary}</p>{/if}
	</header>
	<!-- HTML is rendered from our own markdown in content/pages -->
	{@html data.page.html}
</article>
