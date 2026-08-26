<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	let { data } = $props();
	const { t } = useI18n();
</script>

<Seo site={data.site} title={t.about.eyebrow} description={t.about.p1} path="/about" jsonLd={{ '@context': 'https://schema.org', '@type': 'Person', name: data.site.author, url: data.site.url + '/about', description: t.about.p1 }} />

<article class="card animate-enter p-6 sm:p-8">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">{t.about.eyebrow}</p>
	<h1 class="mb-4 text-3xl font-extrabold text-ink">{t.about.title(data.site.author)}</h1>
	<div class="prose-map">
		<p>{t.about.p1}</p>
		<p>{t.about.p2}</p>
	</div>
</article>
