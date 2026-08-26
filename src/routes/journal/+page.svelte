<script lang="ts">
	import PostMeta from '$lib/components/PostMeta.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { data } = $props();
</script>

<Seo site={data.site} title={t.journal.title} description={data.site.description} path="/journal" />

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">{t.journal.eyebrow}</p>
	<h1 class="mb-2 text-3xl font-extrabold text-ink">{t.journal.title}</h1>
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
		<li class="text-muted">{t.journal.empty}</li>
	{/each}
</ol>
