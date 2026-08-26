<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head><title>{page.status}</title></svelte:head>

<article class="card animate-enter p-8 text-center">
	<p class="text-6xl">🧭</p>
	<h1 class="mt-3 text-3xl font-extrabold text-ink">{page.status}</h1>
	<p class="mt-2 text-muted">{page.error?.message ?? 'Haritanın dışına çıktın.'} <a href="/" class="text-forest">Haritaya dön</a>.</p>
</article>
