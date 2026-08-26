<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	let { data, children } = $props();
	const links = [
		{ href: '/', label: 'Harita', icon: '🗺️' },
		{ href: '/journal', label: 'Günlük', icon: '📜' },
		{ href: '/docs', label: 'Kütüphane', icon: '📚' },
		{ href: '/about', label: 'Gezgin', icon: '🧑‍🚀' }
	];
	const active = (href: string) => (href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title={data.site.name} href="/feed.xml" />
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
		<a href="/feed.xml" class="rounded-full px-3 py-1 text-muted no-underline hover:bg-gold/15 hover:text-ink">RSS</a>
	</nav>
</header>

<main class="mx-auto max-w-5xl px-5 pt-8 pb-16">{@render children()}</main>

<footer class="mx-auto max-w-5xl border-t border-line px-5 pt-6 pb-12 text-sm text-muted">
	© {new Date().getFullYear()} {data.site.author} · Açık havada inşa ediliyor. Harita her gün güncellenir.
</footer>
