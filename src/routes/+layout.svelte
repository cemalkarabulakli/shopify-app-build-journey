<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { LOCALES, setI18n } from '$lib/i18n';
	import FogDragon from '$lib/components/FogDragon.svelte';
	let { data, children } = $props();
	// svelte-ignore state_referenced_locally — switching locale does a full reload (data-sveltekit-reload)
	const { t } = setI18n(data.locale);
	const links = [
		{ href: '/', label: t.nav.map, icon: '🗺️' },
		{ href: '/journal', label: t.nav.journal, icon: '📜' },
		{ href: '/docs', label: t.nav.library, icon: '📚' },
		{ href: '/merchants', label: t.nav.merchants, icon: '🏪' },
		{ href: '/about', label: t.nav.about, icon: '🧑‍🚀' },
		{ href: '/vip', label: t.nav.vip, icon: '👑' },
		{ href: '/roadmap', label: t.nav.roadmap, icon: '🗳️' },
		{ href: '/account', label: t.nav.account, icon: '🎟️' }
	];
	const active = (href: string) => (href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href));
	// The /switch offer stands alone: no journal chrome in front of cold-outreach visitors.
	const bare = $derived(page.url.pathname.startsWith('/switch'));
	// Below 1024 px the nav lives in a <details> menu (spec 0005): native without JS, closed after each navigation.
	let menuOpen = $state(false);
	let menuButton: HTMLElement;
	afterNavigate(() => (menuOpen = false));
	// Escape closes an open menu and hands focus back to its button, not to the page body.
	function closeOnEscape(e: KeyboardEvent) {
		if (e.key !== 'Escape' || !menuOpen) return;
		menuOpen = false;
		menuButton.focus();
	}
</script>

<svelte:window onkeydown={closeOnEscape} />

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="theme-color" content="#008060" />
	<link rel="alternate" type="application/rss+xml" title={data.site.name} href="/feed.xml" />
	<link rel="alternate" type="text/markdown" href="/llms.txt" title="llms.txt" />
	<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
	<meta name="author" content={data.site.author} />
	{@html `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: data.site.name, url: data.site.url, description: data.site.description, inLanguage: data.locale, author: { '@type': 'Person', name: data.site.author, url: data.site.url + '/about' } }).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

{#if bare}
	{@render children()}
{:else}
<!-- Phones and tablets: one pinned row with a menu (spec 0005). From 1024 px: the nav row of spec 0004, unchanged. -->
<header
	class="z-40 mx-auto flex max-w-5xl items-center gap-1 px-3 py-1.5 max-lg:sticky max-lg:top-0 max-lg:border-b max-lg:border-line max-lg:bg-bg/90 max-lg:backdrop-blur lg:flex-wrap lg:justify-between lg:gap-3 lg:px-5 lg:pt-6 lg:pb-2"
>
	<a href="/" class="tap flex min-w-0 flex-1 items-center font-display text-[13px] font-extrabold tracking-wide text-ink no-underline max-lg:leading-tight sm:text-base lg:block lg:flex-none lg:text-lg">
		<span class="mr-1.5 inline-block flex-none align-middle"><FogDragon level={4} size={34} /></span>{data.site.name}
	</a>
	<nav class="flex flex-wrap justify-center gap-1 rounded-2xl border border-line bg-card/70 p-1 text-sm backdrop-blur max-lg:hidden lg:rounded-full">
		{#each links as l (l.href)}
			<a
				href={l.href}
				class="rounded-full px-3 py-1 whitespace-nowrap no-underline transition-colors {active(l.href)
					? 'bg-forest text-white shadow'
					: 'text-muted hover:bg-gold/15 hover:text-ink'}"
			>
				<span class="mr-1">{l.icon}</span>{l.label}
			</a>
		{/each}
		<a href="/feed.xml" class="rounded-full px-3 py-1 whitespace-nowrap text-muted no-underline hover:bg-gold/15 hover:text-ink">{t.nav.rss}</a>
	</nav>
	<div class="flex flex-none gap-1 text-xs font-extrabold tracking-wider uppercase" aria-label="Language">
		{#each LOCALES as code (code)}
			<a
				href="/lang/{code}?to={encodeURIComponent(page.url.pathname)}"
				data-sveltekit-reload
				class="tap grid place-items-center rounded px-2 py-1 no-underline max-lg:rounded-lg {data.locale === code ? 'bg-forest text-white' : 'text-muted hover:text-ink'}"
				aria-current={data.locale === code ? 'true' : undefined}>{code}</a>
		{/each}
	</div>
	<details bind:open={menuOpen} class="group flex-none lg:hidden">
		<summary bind:this={menuButton} class="tap grid cursor-pointer list-none place-items-center rounded-lg text-xl text-ink hover:bg-gold/15 [&::-webkit-details-marker]:hidden" aria-label={t.nav.menu}>
			<span class="group-open:hidden" aria-hidden="true">☰</span><span class="hidden group-open:inline" aria-hidden="true">✕</span>
		</summary>
		<nav class="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-card shadow-lg" aria-label={t.nav.menu}>
			<ul class="mx-auto grid max-w-5xl gap-1 px-3 py-2 sm:grid-cols-2">
				{#each links as l (l.href)}
					<li>
						<a
							href={l.href}
							aria-current={active(l.href) ? 'page' : undefined}
							class="tap flex items-center gap-3 rounded-xl px-3 py-2 no-underline {active(l.href) ? 'bg-forest text-white' : 'text-ink hover:bg-gold/15'}"
						>
							<span class="w-6 text-center">{l.icon}</span>{l.label}
						</a>
					</li>
				{/each}
				<li>
					<a href="/feed.xml" class="tap flex items-center gap-3 rounded-xl px-3 py-2 text-ink no-underline hover:bg-gold/15"><span class="w-6"></span>{t.nav.rss}</a>
				</li>
			</ul>
		</nav>
	</details>
</header>

<main class="mx-auto max-w-5xl px-4 pt-6 pb-16 sm:px-5 lg:pt-8">{@render children()}</main>

<footer class="mx-auto max-w-5xl border-t border-line px-4 pt-6 pb-12 text-sm text-muted sm:px-5">
	© {new Date().getFullYear()} {data.site.author} · {t.footer}
</footer>
{/if}
