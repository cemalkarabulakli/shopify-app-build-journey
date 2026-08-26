<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Gezgin · {data.site.name}</title>
	<link rel="canonical" href={data.site.url + '/about'} />
</svelte:head>

<article class="card animate-enter p-6 sm:p-8">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">Gezgin</p>
	<h1 class="mb-4 text-3xl font-extrabold text-ink">Ben {data.site.author}</h1>
	<div class="prose-map">
		<p>Tek kişilik bir kurucuyum; bir Shopify app'i inşa ediyorum ve her şeyi burada — kazanımları, yanlış dönüşleri ve sayıları — kaydediyorum.</p>
		<p>App'i erkenden denemek isteyen bir Shopify merchant'ıysan ya da notları karşılaştırmak isteyen bir başka gezginsen, selam ver.</p>
	</div>
</article>
