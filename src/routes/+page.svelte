<script lang="ts">
	import PostMeta from '$lib/components/PostMeta.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.site.name}</title>
	<meta name="description" content={data.site.description} />
	<link rel="canonical" href={data.site.url + '/'} />
</svelte:head>

<section class="intro">
	<h1>{data.site.name}</h1>
	<p>{data.site.description}</p>
</section>

<ol class="post-list">
	{#each data.posts as post (post.slug)}
		<li class="post-item">
			<PostMeta publishedAt={post.publishedAt} tags={post.tags} />
			<h2><a href="/posts/{post.slug}">{post.title}</a></h2>
			{#if post.summary}<p>{post.summary}</p>{/if}
		</li>
	{:else}
		<li>No entries yet.</li>
	{/each}
</ol>
