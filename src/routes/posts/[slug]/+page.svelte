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

<article class="post">
	<header>
		<PostMeta publishedAt={data.post.publishedAt} tags={data.post.tags} />
		<h1>{data.post.title}</h1>
	</header>
	<!-- HTML is rendered from our own markdown files in content/posts -->
	{@html data.post.html}
	<p class="back"><a href="/">← All entries</a></p>
</article>
