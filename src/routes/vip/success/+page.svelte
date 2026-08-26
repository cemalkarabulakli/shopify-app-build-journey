<script lang="ts">
	import { onMount } from 'svelte';
	import Burst from '$lib/components/Burst.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	let { data } = $props();
	const { t } = useI18n();
	let burst: Burst;
	onMount(() => setTimeout(() => burst.fire('👑 VIP'), 300));
</script>

<Seo site={data.site} title={t.vip.successTitle} description={t.vip.successText} path="/vip/success" />
<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<Burst bind:this={burst} />

<article class="card animate-enter p-8 text-center">
	<p class="text-6xl">👑</p>
	<h1 class="mt-3 text-3xl font-extrabold text-ink">{t.vip.successTitle}</h1>
	<p class="mx-auto mt-2 max-w-xl text-muted">{t.vip.successText}</p>
	<a href="/" class="mt-6 inline-block rounded-full bg-forest px-5 py-2 font-extrabold text-white no-underline hover:bg-forest-soft hover:text-ink">{t.error.back}</a>
</article>
