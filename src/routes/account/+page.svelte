<script lang="ts">
	import { enhance } from '$app/forms';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	import { formatDate } from '$lib/format';
	let { data, form } = $props();
	const { t } = useI18n();
	const err = $derived(form?.error ?? data.error);
</script>

<Seo site={data.site} title={t.account.title} description={t.account.lede} path="/account" />
<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">{t.account.eyebrow}</p>
	<h1 class="mb-3 text-3xl font-extrabold text-ink">{t.account.title}</h1>
</section>

{#if !data.user}
	<article class="card animate-enter mt-6 max-w-lg p-6">
		{#if data.sent}
			<p class="text-6xl">📨</p>
			<h2 class="mt-3 text-xl font-extrabold text-ink">{t.account.sentTitle}</h2>
			<p class="mt-1 text-muted">{t.account.sentText}</p>
		{:else}
			<p class="text-muted">{t.account.lede}</p>
			<form method="POST" action="?/login" use:enhance class="mt-4 flex flex-col gap-3">
				<input type="email" name="email" required autocomplete="email" placeholder="you@example.com" class="rounded-lg border border-line bg-bg px-3 py-2 text-ink placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/30 focus:outline-none" />
				<button class="rounded-full bg-forest px-5 py-2.5 font-extrabold text-white hover:bg-forest-soft hover:text-ink">{t.account.sendLink}</button>
			</form>
			{#if err}<p class="mt-3 text-sm text-ember">{t.account.errors[err as keyof typeof t.account.errors] ?? err}</p>{/if}
		{/if}
	</article>
{:else}
	<div class="mt-6 grid gap-5 lg:grid-cols-[3fr_2fr]">
		<article class="card animate-enter p-6">
			<p class="text-sm text-muted">{t.account.signedInAs} <b class="text-ink">{data.user.email}</b></p>
			{#if data.access?.hasAccess}
				<p class="mt-3 text-4xl">👑</p>
				<h2 class="mt-2 text-2xl font-extrabold text-ink">{t.account.vipActive(data.tierName ?? 'VIP')}</h2>
				<p class="mt-1 text-muted">{t.account.vipActiveText}</p>
			{:else}
				<h2 class="mt-3 text-2xl font-extrabold text-ink">{t.account.noVip}</h2>
				<p class="mt-1 text-muted">{t.account.noVipText} <a href="/vip" class="text-forest">{t.nav.vip} →</a></p>
			{/if}
			{#if data.access?.subscriptions.length}
				<ul class="mt-5 space-y-2 border-t border-dashed border-line pt-4 text-sm">
					{#each data.access.subscriptions as s (s.id)}
						<li class="flex flex-wrap items-center gap-2">
							<span class="rounded-full border px-2 py-0.5 text-[.7rem] font-extrabold uppercase {s.status === 'active' || s.status === 'trialing' ? 'border-forest text-forest' : 'border-line text-muted'}">{s.status}</span>
							<code class="text-xs text-muted">{s.id}</code>
							{#if s.scheduledChange}<span class="text-xs text-ember">⏳ {t.account.scheduled(s.scheduledChange.action, formatDate(s.scheduledChange.at, t.locale))}</span>
							{:else if s.currentPeriodEnd}<span class="text-xs text-muted">{t.account.renews} {formatDate(s.currentPeriodEnd, t.locale)}</span>{/if}
						</li>
					{/each}
				</ul>
			{/if}
			{#if data.error === 'db'}<p class="mt-3 text-sm text-ember">{t.account.errors.db}</p>{/if}
		</article>
		<aside class="card animate-enter flex flex-col gap-3 self-start p-6">
			<h2 class="font-extrabold text-ink">{t.account.billingTitle}</h2>
			<p class="text-sm text-muted">{t.account.billingText}</p>
			<form method="POST" action="/account/portal">
				<button class="w-full rounded-full bg-forest px-5 py-2.5 font-extrabold text-white hover:bg-forest-soft hover:text-ink disabled:opacity-50" disabled={!data.access?.customerId}>{t.account.openPortal} →</button>
			</form>
			<form method="POST" action="/account/logout"><button class="w-full rounded-full border border-line px-5 py-2 text-sm text-muted hover:text-ink">{t.account.logout}</button></form>
		</aside>
	</div>
{/if}
