<script lang="ts">
	/** Per-page head tags: OG/Twitter, canonical, markdown alternate, JSON-LD. */
	let {
		site,
		title,
		description,
		path,
		type = 'website',
		published,
		markdownPath,
		jsonLd
	}: {
		site: { name: string; url: string; author: string };
		title: string;
		description: string;
		path: string;
		type?: 'website' | 'article';
		published?: string;
		markdownPath?: string;
		jsonLd?: Record<string, unknown>;
	} = $props();
	const url = $derived(site.url + path);
	const ld = $derived(
		JSON.stringify(
			jsonLd ?? {
				'@context': 'https://schema.org',
				'@type': type === 'article' ? 'BlogPosting' : 'WebPage',
				headline: title,
				description,
				url,
				...(published ? { datePublished: published } : {}),
				author: { '@type': 'Person', name: site.author, url: site.url + '/about' },
				isPartOf: { '@type': 'WebSite', name: site.name, url: site.url }
			}
		)
	);
</script>

<svelte:head>
	<title>{title === site.name ? title : `${title} · ${site.name}`}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if published}<meta property="article:published_time" content={published} />{/if}
	{#if markdownPath}<link rel="alternate" type="text/markdown" href={site.url + markdownPath} title="Markdown version" />{/if}
	{@html `<script type="application/ld+json">${ld.replace(/</g, '\\u003c')}</script>`}
</svelte:head>
