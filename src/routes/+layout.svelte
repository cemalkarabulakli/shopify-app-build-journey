<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title={data.site.name} href="/feed.xml" />
</svelte:head>

<header class="site-header">
	<a class="brand" href="/">{data.site.name}</a>
	<nav><a href="/">Yol</a><a href="/journal">Journal</a><a href="/docs">Docs</a><a href="/about">About</a><a href="/feed.xml">RSS</a></nav>
</header>

<main>{@render children()}</main>

<footer class="site-footer">© {new Date().getFullYear()} {data.site.author} · Built in public.</footer>
