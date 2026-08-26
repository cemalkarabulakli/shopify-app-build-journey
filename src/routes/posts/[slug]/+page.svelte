<script lang="ts">
	import PostMeta from '$lib/components/PostMeta.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { data } = $props();
</script>

<Seo site={data.site} title={data.post.title} description={data.post.summary || data.post.title} path="/posts/{data.post.slug}" type="article" published={data.post.publishedAt} markdownPath="/posts/{data.post.slug}.md" />

<article class="card animate-enter p-6 sm:p-8">
	<header class="mb-6 border-b border-dashed border-line pb-5">
		<PostMeta publishedAt={data.post.publishedAt} tags={data.post.tags} />
		<h1 class="mt-2 text-3xl leading-tight font-extrabold text-ink">{data.post.title}</h1>
	</header>
	<!-- HTML is rendered from our own markdown files in content/posts -->
	<div class="prose-map">{@html data.post.html}</div>
	<p class="mt-10"><a href="/journal" class="text-forest no-underline hover:text-ember">{t.journal.back}</a></p>
</article>
