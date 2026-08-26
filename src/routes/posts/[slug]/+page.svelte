<script lang="ts">
	import PostMeta from '$lib/components/PostMeta.svelte';
	let { data } = $props();
	const canonical = $derived(`${data.site.url}/posts/${data.post.slug}`);
</script>

<svelte:head>
	<title>{data.post.title} · {data.site.name}</title>
	<meta name="description" content={data.post.summary || data.post.title} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.summary || data.post.title} />
	<meta property="og:url" content={canonical} />
</svelte:head>

<article class="card animate-enter p-6 sm:p-8">
	<header class="mb-6 border-b border-dashed border-line pb-5">
		<PostMeta publishedAt={data.post.publishedAt} tags={data.post.tags} />
		<h1 class="mt-2 text-3xl leading-tight font-extrabold text-ink">{data.post.title}</h1>
	</header>
	<!-- HTML is rendered from our own markdown files in content/posts -->
	<div class="prose-map">{@html data.post.html}</div>
	<p class="mt-10"><a href="/journal" class="text-forest no-underline hover:text-ember">← Seyir defteri</a></p>
</article>
