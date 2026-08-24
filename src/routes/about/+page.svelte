<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>About · {data.site.name}</title>
	<link rel="canonical" href={data.site.url + '/about'} />
</svelte:head>

<article class="post">
	<h1>About</h1>
	<p>
		I'm {data.site.author}, a solo founder building a Shopify app and documenting the whole
		thing here — the wins, the wrong turns, and the numbers.
	</p>
	<p>
		If you're a Shopify merchant who wants to try the app early, or another builder who wants
		to compare notes, say hi.
	</p>
</article>
