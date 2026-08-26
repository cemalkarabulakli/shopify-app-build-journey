<script lang="ts">
	import PostMeta from '$lib/components/PostMeta.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Günlük · {data.site.name}</title>
	<meta name="description" content={data.site.description} />
	<link rel="canonical" href={data.site.url + '/journal'} />
</svelte:head>

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">Seyir Defteri</p>
	<h1 class="mb-2 text-3xl font-extrabold text-ink">Günlük</h1>
	<p class="mb-8 text-muted">{data.site.description}</p>
</section>

<ol class="space-y-4">
	{#each data.posts as post, i (post.slug)}
		<li class="card animate-enter p-5" style="animation-delay:{i * 70}ms">
			<PostMeta publishedAt={post.publishedAt} tags={post.tags} />
			<h2 class="mt-1 text-xl font-extrabold"><a href="/posts/{post.slug}" class="text-ink no-underline hover:text-ember">{post.title}</a></h2>
			{#if post.summary}<p class="mt-1 text-muted">{post.summary}</p>{/if}
		</li>
	{:else}
		<li class="text-muted">Henüz kayıt yok.</li>
	{/each}
</ol>
