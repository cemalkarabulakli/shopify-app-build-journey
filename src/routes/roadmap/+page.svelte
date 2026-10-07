<script lang="ts">
	import { enhance } from '$app/forms';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	import { formatDate } from '$lib/format';
	import { VOTE_WEIGHT, TITLE_MAX, BODY_MAX, NOTE_MAX, ROADMAP_ORDER } from '$lib/domain/roadmap';
	const { t } = useI18n();
	let { data, form } = $props();

	type Status = (typeof ROADMAP_ORDER)[number];
	const col = (s: Status) => data.columns.find((c) => c.status === s)?.items ?? [];
	// The roadmap proper; `shipped` is the changelog and `declined` is kept separate on purpose.
	const roadmap = $derived(['building', 'planned', 'considering'] as const);
	const shipped = $derived(col('shipped'));
	const declined = $derived(col('declined'));
	const total = $derived(data.columns.reduce((n, c) => n + c.items.length, 0));

	const badge = {
		building: 'border-forest bg-forest text-white',
		planned: 'border-forest text-forest',
		considering: 'border-gold text-gold',
		shipped: 'border-forest text-forest',
		declined: 'border-line text-muted'
	} as const;
	const icon = { building: '⚒️', planned: '🗺️', considering: '🗳️', shipped: '✅', declined: '🚫' } as const;
</script>

<Seo site={data.site} title={t.roadmap.title} description={t.roadmap.lede} path="/roadmap" />

<section class="animate-enter">
	<p class="mb-2 text-xs font-extrabold tracking-[.25em] text-gold uppercase">{t.roadmap.eyebrow}</p>
	<h1 class="mb-3 text-3xl leading-tight font-extrabold text-ink sm:text-4xl">{t.roadmap.title}</h1>
	<p class="max-w-3xl text-lg text-muted">{t.roadmap.lede}</p>
	{#if t.roadmap.enOnlyNotice}
		<p class="mt-3 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-muted">🇬🇧 {t.roadmap.enOnlyNotice}</p>
	{/if}

	<!-- How the board works, in three steps -->
	<ol class="mt-5 grid gap-2 sm:grid-cols-3">
		{#each [{ i: '👑', s: t.roadmap.howMembers }, { i: '🗳️', s: t.roadmap.howPublic }, { i: '⚒️', s: t.roadmap.howBuilder }] as step, n (step.s)}
			<li class="card flex items-center gap-3 px-4 py-3 text-sm">
				<span class="grid h-8 w-8 flex-none place-items-center rounded-full border border-line text-base">{step.i}</span>
				<span><b class="text-ink">{n + 1}.</b> {step.s}</span>
			</li>
		{/each}
	</ol>
	<p class="mt-2 text-xs text-muted">⚖️ {t.roadmap.weighting(VOTE_WEIGHT.member)}</p>
</section>

{#if data.unavailable}
	<p class="mt-6 rounded-xl border-l-4 border-ember bg-ember/10 px-4 py-3 text-muted">⚠️ {t.roadmap.unavailable}</p>
{:else}

<!-- Propose: members post, everyone else is told plainly what they can do -->
<section class="card animate-enter mt-6 p-6">
	{#if data.isMember}
		<h2 class="text-xl font-extrabold text-ink">👑 {t.roadmap.submitTitle}</h2>
		<p class="mt-1 text-sm text-muted">{t.roadmap.submitLede}</p>
		{#if form?.submitted}
			<p class="mt-3 rounded-lg border border-forest bg-forest/10 px-3 py-2 text-sm text-forest">✅ {t.roadmap.submitted}</p>
		{/if}
		<form method="POST" action="?/submit" use:enhance class="mt-4 flex flex-col gap-3">
			<label class="flex flex-col gap-1 text-sm">
				<span class="font-extrabold text-ink">{t.roadmap.titleLabel}</span>
				<input name="title" required maxlength={TITLE_MAX} value={form?.title ?? ''} placeholder={t.roadmap.titlePlaceholder}
					class="tap rounded-lg border border-line bg-bg px-3 py-2 text-ink placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/30 focus:outline-none" />
			</label>
			<label class="flex flex-col gap-1 text-sm">
				<span class="font-extrabold text-ink">{t.roadmap.bodyLabel}</span>
				<textarea name="body" required rows="3" maxlength={BODY_MAX} placeholder={t.roadmap.bodyPlaceholder}
					class="rounded-lg border border-line bg-bg px-3 py-2 text-ink placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/30 focus:outline-none">{form?.body ?? ''}</textarea>
			</label>
			<div class="flex flex-wrap items-center gap-3">
				<button class="tap rounded-full bg-forest px-5 py-2.5 font-extrabold text-white hover:bg-forest-soft hover:text-ink">{t.roadmap.submitCta}</button>
				<span class="text-xs text-muted">{t.roadmap.openLimit(data.maxOpen)}</span>
			</div>
		</form>
		{#if form?.submitError}
			<p class="mt-3 text-sm text-ember">{t.roadmap.errors[form.submitError as keyof typeof t.roadmap.errors] ?? form.submitError}</p>
		{/if}
	{:else if data.user}
		<h2 class="text-xl font-extrabold text-ink">{t.roadmap.membersOnly}</h2>
		<p class="mt-1 text-sm text-muted">{t.roadmap.membersOnlyText}</p>
		<a href="/vip" class="tap max-lg:inline-flex max-lg:items-center mt-3 inline-block rounded-full bg-forest px-5 py-2.5 font-extrabold text-white no-underline hover:bg-forest-soft hover:text-ink">{t.roadmap.seeTiers}</a>
	{:else}
		<h2 class="text-xl font-extrabold text-ink">🗳️ {t.roadmap.signInToVote}</h2>
		<p class="mt-1 text-sm text-muted">{t.roadmap.signInToVoteText}</p>
		<div class="mt-3 flex flex-wrap gap-2">
			<a href="/account?next=/roadmap" class="tap max-lg:inline-flex max-lg:items-center rounded-full bg-forest px-5 py-2.5 font-extrabold text-white no-underline hover:bg-forest-soft hover:text-ink">{t.roadmap.signInToVote} →</a>
			<a href="/vip" class="tap max-lg:inline-flex max-lg:items-center rounded-full border border-line px-5 py-2.5 text-muted no-underline hover:text-ink">{t.roadmap.seeTiers}</a>
		</div>
	{/if}
</section>

{#if form?.voteError}
	<p class="mt-4 text-sm text-ember">{t.roadmap.errors[form.voteError as keyof typeof t.roadmap.errors] ?? form.voteError}</p>
{/if}
{#if form?.statusError}
	<p class="mt-4 text-sm text-ember">{t.roadmap.errors[form.statusError as keyof typeof t.roadmap.errors] ?? form.statusError}</p>
{/if}

{#snippet card(item: (typeof data.columns)[number]['items'][number])}
	<article class="card animate-enter p-5">
		<div class="flex gap-4">
			<!-- Vote control: a form, so it works with JavaScript off too -->
			<div class="flex-none text-center">
				{#if item.status === 'shipped' || item.status === 'declined'}
					<div class="grid h-14 w-16 place-items-center rounded-xl border border-line text-muted">
						<span class="text-lg font-extrabold">{item.score}</span>
					</div>
				{:else if data.user}
					<form method="POST" action="?/vote" use:enhance>
						<input type="hidden" name="id" value={item.id} />
						<button aria-label={t.roadmap.voteAria(item.title)} aria-pressed={item.voted}
							class="grid h-14 w-16 place-items-center rounded-xl border-2 transition active:scale-95 {item.voted
								? 'border-forest bg-forest text-white'
								: 'border-line text-ink hover:border-gold hover:bg-gold/10'}">
							<span class="text-base leading-none">{item.voted ? '✓' : '▲'}</span>
							<span class="text-lg leading-none font-extrabold">{item.score}</span>
						</button>
					</form>
				{:else}
					<a href="/account?next=/roadmap" title={t.roadmap.signInToVote}
						class="grid h-14 w-16 place-items-center rounded-xl border-2 border-dashed border-line text-muted no-underline hover:border-gold hover:text-ink">
						<span class="text-base leading-none">▲</span>
						<span class="text-lg leading-none font-extrabold">{item.score}</span>
					</a>
				{/if}
				<p class="mt-1 text-xs tracking-wider text-muted uppercase">{t.roadmap.score}</p>
			</div>

			<!-- Member text can be one long unbroken word (a URL): it must wrap, never widen the page. -->
			<div class="min-w-0 flex-1 [overflow-wrap:anywhere]">
				<div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
					<h3 class="text-lg font-extrabold text-ink">{item.title}</h3>
					<span class="rounded-full border px-2 py-0.5 text-xs font-extrabold tracking-wider uppercase {badge[item.status as Status]}">{icon[item.status as Status]} {t.roadmap.columns[item.status as Status]}</span>
				</div>
				<!-- Plain text from a member; never rendered as HTML -->
				<p class="mt-1.5 whitespace-pre-line text-[.95rem] text-muted">{item.body}</p>

				<p class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
					<span>🗳️ {t.roadmap.voters(item.voters)}</span>
					<span>👑 {t.roadmap.memberVoters(item.memberVoters)}</span>
					<span>{item.authorTier ? t.roadmap.requestedBy(item.authorTier) : t.roadmap.requestedByMember}</span>
					{#if item.shippedAt}<span class="text-forest">✅ {t.roadmap.shippedOn} {formatDate(item.shippedAt, t.locale)}</span>{/if}
				</p>

				{#if item.note}
					<p class="mt-3 rounded-lg border-l-4 border-gold bg-gold/10 px-3 py-2 text-sm text-muted"><b class="text-ink">{t.roadmap.builderNote}:</b> {item.note}</p>
				{/if}

				{#if data.admin}
					<form method="POST" action="?/status" use:enhance class="mt-3 flex flex-wrap items-center gap-2 border-t border-dashed border-line pt-3">
						<input type="hidden" name="id" value={item.id} />
						<span class="text-xs font-extrabold text-muted">{t.roadmap.adminTitle}:</span>
						<select name="status" class="tap rounded-lg border border-line bg-bg px-2 py-1 text-sm text-ink">
							{#each ROADMAP_ORDER as s (s)}<option value={s} selected={s === item.status}>{t.roadmap.columns[s]}</option>{/each}
						</select>
						<input name="note" maxlength={NOTE_MAX} placeholder={t.roadmap.noteLabel} value={item.note ?? ''}
							class="tap min-w-40 flex-1 rounded-lg border border-line bg-bg px-2 py-1 text-sm text-ink placeholder:text-muted/60" />
						<button class="tap rounded-full border-2 border-forest px-3 py-1 text-sm font-extrabold text-forest hover:bg-forest/10">{t.roadmap.save}</button>
					</form>
				{/if}
			</div>
		</div>
	</article>
{/snippet}

<!-- The roadmap: what is being built, what is next, what is up for votes -->
{#each roadmap as status (status)}
	{@const items = col(status)}
	<section class="mt-10">
		<div class="flex flex-wrap items-baseline gap-x-3">
			<h2 class="text-xl font-extrabold text-ink">{icon[status]} {t.roadmap.columns[status]}</h2>
			<span class="text-sm text-muted">{items.length}</span>
		</div>
		<p class="mt-1 text-sm text-muted">{t.roadmap.columnHint[status]}</p>
		{#if items.length}
			<div class="mt-4 space-y-3">
				{#each items as item (item.id)}{@render card(item)}{/each}
			</div>
		{:else}
			<p class="mt-3 rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-muted">
				{status === 'considering' ? t.roadmap.emptyConsidering : t.roadmap.empty}
			</p>
		{/if}
	</section>
{/each}

<!-- The changelog -->
<section class="mt-12 border-t border-line pt-8">
	<div class="flex flex-wrap items-baseline gap-x-3">
		<h2 class="text-xl font-extrabold text-ink">{icon.shipped} {t.roadmap.columns.shipped}</h2>
		<span class="text-sm text-muted">{shipped.length}</span>
	</div>
	<p class="mt-1 text-sm text-muted">{t.roadmap.columnHint.shipped}</p>
	{#if shipped.length}
		<div class="mt-4 space-y-3">{#each shipped as item (item.id)}{@render card(item)}{/each}</div>
	{:else}
		<p class="mt-3 rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-muted">{t.roadmap.empty}</p>
	{/if}
</section>

{#if declined.length}
	<details class="mt-8">
		<summary class="tap max-lg:flex max-lg:items-center cursor-pointer text-sm font-extrabold text-muted hover:text-ink">{icon.declined} {t.roadmap.columns.declined} ({declined.length})</summary>
		<p class="mt-1 text-sm text-muted">{t.roadmap.columnHint.declined}</p>
		<div class="mt-3 space-y-3">{#each declined as item (item.id)}{@render card(item)}{/each}</div>
	</details>
{/if}

{#if total === 0}
	<p class="mt-8 rounded-xl border-l-4 border-gold bg-gold/10 px-4 py-3 text-muted">🗳️ {t.roadmap.emptyConsidering}</p>
{/if}
{/if}
