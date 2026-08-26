<script lang="ts">
	import { page } from '$app/state';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
</script>

<svelte:head><title>{page.status}</title></svelte:head>

<article class="card animate-enter p-8 text-center">
	<p class="text-6xl">🧭</p>
	<h1 class="mt-3 text-3xl font-extrabold text-ink">{page.status}</h1>
	<p class="mt-2 text-muted">{page.error?.message ?? t.error.lost} <a href="/" class="text-forest">{t.error.back}</a>.</p>
</article>
