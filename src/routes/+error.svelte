<script lang="ts">
	import { page } from '$app/state';
	import { useI18n } from '$lib/i18n';
	import FogDragon from '$lib/components/FogDragon.svelte';
	const { t } = useI18n();
</script>

<svelte:head><title>{page.status}</title></svelte:head>

<article class="card animate-enter p-8 text-center">
	<div class="flex justify-center"><FogDragon level={2} size={84} fog /></div>
	<h1 class="mt-3 text-3xl font-extrabold text-ink">{page.status}</h1>
	<p class="mt-2 text-muted">{page.error?.message ?? t.error.lost} <a href="/" class="text-forest">{t.error.back}</a>.</p>
	<p class="mt-3 inline-block rounded-2xl rounded-bl-sm border border-line bg-bg-deep/60 px-3 py-1.5 font-display text-[.95rem] font-bold text-muted">{t.dragon.notFound}</p>
</article>
