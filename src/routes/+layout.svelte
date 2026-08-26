<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { LOCALES, setI18n } from '$lib/i18n';
	let { data, children } = $props();
	// svelte-ignore state_referenced_locally — switching locale does a full reload (data-sveltekit-reload)
	const { t } = setI18n(data.locale);
	const links = [
		{ href: '/', label: t.nav.map, icon: '🗺️' },
		{ href: '/journal', label: t.nav.journal, icon: '📜' },
		{ href: '/docs', label: t.nav.library, icon: '📚' },
		{ href: '/about', label: t.nav.about, icon: '🧑‍🚀' }
	];
	const active = (href: string) => (href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title={data.site.name} href="/feed.xml" />
	<link rel="alternate" type="text/markdown" href="/llms.txt" title="llms.txt" />
	<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
	<meta name="author" content={data.site.author} />
	{@html `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: data.site.name, url: data.site.url, description: data.site.description, inLanguage: data.locale, author: { '@type': 'Person', name: data.site.author, url: data.site.url + '/about' } })}</script>`}
</svelte:head>

<header class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 pt-6 pb-2">
	<a href="/" class="font-display text-lg font-extrabold tracking-wide text-ink no-underline">
		<span class="mr-1 inline-block animate-bob">⚔️</span>{data.site.name}
	</a>
	<nav class="flex gap-1 rounded-full border border-line bg-card/70 p-1 text-sm backdrop-blur">
		{#each links as l (l.href)}
			<a
				href={l.href}
				class="rounded-full px-3 py-1 no-underline transition-colors {active(l.href)
					? 'bg-forest text-white shadow'
					: 'text-muted hover:bg-gold/15 hover:text-ink'}"
			>
				<span class="mr-1">{l.icon}</span>{l.label}
			</a>
		{/each}
		<a href="/feed.xml" class="rounded-full px-3 py-1 text-muted no-underline hover:bg-gold/15 hover:text-ink">{t.nav.rss}</a>
	</nav>
	<div class="flex gap-1 text-xs font-extrabold tracking-wider uppercase" aria-label="Language">
		{#each LOCALES as code (code)}
			<a
				href="/lang/{code}?to={encodeURIComponent(page.url.pathname)}"
				data-sveltekit-reload
				class="rounded px-2 py-1 no-underline {data.locale === code ? 'bg-forest text-white' : 'text-muted hover:text-ink'}"
				aria-current={data.locale === code ? 'true' : undefined}>{code}</a>
		{/each}
	</div>
</header>

<main class="mx-auto max-w-5xl px-5 pt-8 pb-16">{@render children()}</main>

<footer class="mx-auto max-w-5xl border-t border-line px-5 pt-6 pb-12 text-sm text-muted">
	© {new Date().getFullYear()} {data.site.author} · {t.footer}
</footer>
