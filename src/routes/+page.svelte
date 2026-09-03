<script lang="ts">
	import { onMount } from 'svelte';
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	import { XP_PER_DOC, levelFor, stageComplete, unlocked, xpFor } from '$lib/client/gamification';
	import FogDragon from '$lib/components/FogDragon.svelte';
	import { formatDate } from '$lib/format';
	import Burst from '$lib/components/Burst.svelte';
	import XpBar from '$lib/components/XpBar.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { data } = $props();
	const read = createReadingProgress('docs:read');
	const tasks = createReadingProgress('phases:done');
	let burst: Burst;

	type Step = (typeof data.steps)[number];
	const stageOf = (s: Step) => ({ id: String(s.n), docs: s.docs.map((d) => d.slug) });
	const stages = $derived(data.steps.map(stageOf));
	// Server-rendered open (crawlers, no-JS); seals apply once the reader's progress is known.
	let mounted = $state(false);
	onMount(() => (mounted = true));
	const open = $derived(unlocked(stages, read.has, tasks.has));
	const sealedStep = (s: Step) => mounted && !open.stage(String(s.n));
	const sealedDoc = (slug: string) => mounted && !open.doc(slug);

	const totalDocs = $derived(data.steps.reduce((n, s) => n + s.docs.length, 0));
	const readDocs = $derived(data.steps.reduce((n, s) => n + s.docs.filter((d) => read.has(d.slug)).length, 0));
	const complete = (s: Step) => stageComplete(stageOf(s), read.has, tasks.has);
	const doneSteps = $derived(data.steps.filter(complete).length);
	const xp = $derived(xpFor(readDocs, doneSteps));

	const stepPct = (s: Step) => {
		const parts = s.docs.length + 1; // scrolls + the task
		const done = s.docs.filter((d) => read.has(d.slug)).length + (tasks.has(String(s.n)) ? 1 : 0);
		return Math.round((done / parts) * 100);
	};
	function toggleDoc(step: Step, slug: string) {
		const wasRead = read.has(slug);
		read.toggle(slug);
		if (!wasRead) burst.fire(complete(step) ? t.home.badgeEarned(step.title) : t.xpToast(XP_PER_DOC));
	}
	function toggleTask(step: Step) {
		const was = tasks.has(String(step.n));
		tasks.toggle(String(step.n));
		if (!was) burst.fire(complete(step) ? t.home.phaseDone(step.title) : '🏁');
	}
	const statusCls = { done: 'border-forest text-forest', next: 'border-forest bg-forest text-white', todo: 'border-line text-muted' } as const;
</script>

<Seo
	site={data.site}
	title={data.site.name}
	description={data.site.description}
	path="/"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: data.site.name,
		description: data.intro,
		url: data.site.url + '/',
		step: data.steps.map((s) => ({ '@type': 'HowToStep', position: s.n + 1, name: `${t.home.phase} ${s.n}: ${s.title}`, text: `${s.learn} ${t.home.doneWhen} ${s.done}`, url: `${data.site.url}/#faz-${s.n}` }))
	}}
/>

<Burst bind:this={burst} />

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">{t.home.eyebrow}</p>
	<h1 class="mb-3 text-3xl leading-tight font-extrabold text-ink sm:text-4xl">{data.site.name}</h1>
	<p class="max-w-3xl text-lg text-muted">{data.intro}</p>
</section>

<div class="grid gap-4 lg:grid-cols-[3fr_2fr] lg:items-stretch">
<XpBar {xp} docsRead={readDocs} docsTotal={totalDocs} phasesDone={doneSteps} phasesTotal={data.steps.length} />

<section class="card mt-4 flex flex-wrap content-center items-center gap-3 px-5 py-4 lg:mt-6" aria-label={t.home.badges}>
	<span class="w-full text-[.7rem] font-extrabold tracking-[.2em] text-gold uppercase">{t.home.badges}</span>
	{#each data.steps as step (step.n)}
		{@const earned = complete(step)}
		<span
			class="relative grid h-10 w-10 place-items-center rounded-full border text-xl transition {earned
				? 'animate-pop border-gold bg-gold/15 shadow-[0_0_0_3px_color-mix(in_srgb,var(--gold)_25%,transparent)]'
				: 'border-line opacity-40 grayscale'}"
			title="{step.title} {t.home.badgeOf}"
		>
			{step.icon}
			<small class="absolute -right-1 -bottom-1 rounded-full border border-line bg-card px-1 text-[.6rem] text-muted">{step.n}</small>
		</span>
	{/each}
</section>
</div>

<!-- The trail -->
<ol class="relative mt-10 space-y-7 pl-16">
	<svg class="pointer-events-none absolute top-0 bottom-0 left-[22px] h-full w-2" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 8 100">
		<line x1="4" y1="0" x2="4" y2="100" stroke="var(--gold)" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round" class="animate-dash" vector-effect="non-scaling-stroke" />
	</svg>

	{#each data.steps as step, i (step.n)}
		{@const pct = stepPct(step)}
		{@const sealed = sealedStep(step)}
		{@const earned = complete(step)}

		<li id="faz-{step.n}" class="relative animate-enter {sealed ? 'opacity-60' : ''}" style="animation-delay:{i * 80}ms">
			<!-- waypoint -->
			<div
				class="absolute top-4 -left-14 grid h-12 w-12 place-items-center rounded-full {step.status === 'next' ? 'animate-pulse-ring' : ''}"
				style="background:conic-gradient(var(--gold) calc({pct} * 1%), var(--line) 0)"
			>
				<div class="grid h-10 w-10 place-items-center rounded-full text-lg {earned ? 'bg-forest text-white' : 'bg-card'}">
					{earned ? '✓' : sealed ? '🔒' : step.icon}
				</div>
			</div>

			{#if step.status === 'next'}
				<div class="absolute top-1.5 -left-[72px] w-16">
					<FogDragon level={levelFor(xp).index + 1} size={56} point flip />
				</div>
			{/if}
			<article class="card p-6 transition-transform hover:-translate-y-0.5 {step.status === 'next' ? 'ring-2 ring-forest/50' : ''}">
				{#if step.status === 'next'}
					<p class="mb-2.5 inline-block rounded-2xl rounded-bl-sm border border-forest bg-forest/10 px-3 py-1.5 text-sm font-bold text-forest">{t.dragon.here}</p>
				{/if}
				<div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
					<span class="font-display text-xs font-extrabold tracking-widest text-muted">{t.home.phase.toUpperCase()} {step.n}</span>
					<h2 class="text-xl font-extrabold text-ink">{step.title}</h2>
					<span class="text-sm text-muted">· {step.time}</span>
					<span class="ml-auto rounded-full border px-2.5 py-0.5 text-[.7rem] font-extrabold tracking-wider uppercase {statusCls[step.status]}">{t.home.status[step.status]}</span>
				</div>
				<p class="mt-2">{step.learn}</p>

				{#if sealed}
					<!-- Sealed phase: title and the one-line description only. -->
					<p class="mt-3 text-sm text-muted">🔒 {t.home.sealedPhase}</p>
				{:else}
					{#if step.docs.length}
						<div class="mt-4 h-1.5 overflow-hidden rounded-full bg-bg-deep">
							<div class="h-full rounded-full bg-gradient-to-r from-forest to-gold transition-[width] duration-500" style="width:{pct}%"></div>
						</div>
						<ul class="mt-2 space-y-1">
							{#each step.docs as doc (doc.slug)}
								{@const isRead = read.has(doc.slug)}
								{@const docSealed = sealedDoc(doc.slug)}
								<li class="flex items-center gap-1 {docSealed ? 'opacity-60' : ''}">
									{#if docSealed}
										<span class="flex flex-1 items-center gap-3 px-2 py-1.5">
											<span class="grid h-5 w-5 flex-none place-items-center text-sm" title={t.home.sealedScroll}>🔒</span>
											<span class="flex-1">📜 {doc.title}</span>
										</span>
									{:else}
										<label class="group flex flex-1 cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gold/10">
											<input type="checkbox" class="peer sr-only" checked={isRead} onchange={() => toggleDoc(step, doc.slug)} />
											<span class="grid h-5 w-5 flex-none place-items-center rounded-md border-2 text-xs text-white transition peer-focus-visible:ring-2 peer-focus-visible:ring-gold {isRead ? 'border-forest bg-forest' : 'border-line group-hover:border-gold'}">{isRead ? '✓' : ''}</span>
											<span class="flex-1 {isRead ? 'text-muted line-through' : ''}">📜 {doc.title}</span>
											<span class="text-[.7rem] font-extrabold text-gold {isRead ? 'opacity-40' : ''}">+{XP_PER_DOC}</span>
										</label>
										<a href="/docs/{doc.slug}" class="rounded-lg px-2.5 py-1 font-extrabold text-forest no-underline hover:bg-forest/10" aria-label={t.home.read}>→</a>
									{/if}
								</li>
							{/each}
						</ul>
					{/if}

					<!-- The phase task: ticking it (with every scroll read) breaks the seal on the next phase. -->
					{@const taskDone = tasks.has(String(step.n))}
					<label class="group mt-3 flex cursor-pointer items-start gap-3 rounded-lg border border-dashed border-line px-3 py-2 transition hover:bg-gold/10">
						<input type="checkbox" class="peer sr-only" checked={taskDone} onchange={() => toggleTask(step)} />
						<span class="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-md border-2 text-xs text-white transition peer-focus-visible:ring-2 peer-focus-visible:ring-gold {taskDone ? 'border-forest bg-forest' : 'border-line group-hover:border-gold'}">{taskDone ? '✓' : ''}</span>
						<span class="text-[.95rem] {taskDone ? 'text-muted' : ''}"><b class="text-ink">🏁 {t.home.doneWhen}</b> {step.done} <span class="ml-1 text-xs font-extrabold text-gold">· {t.home.taskDone}</span></span>
					</label>

					{#if step.posts.length}
						<ul class="mt-3 space-y-1 border-t border-dashed border-line pt-3">
							{#each step.posts as post (post.slug)}
								<li class="flex items-center gap-2 px-2 text-[.95rem]">
									<a href="/posts/{post.slug}" class="text-ink no-underline hover:text-ember">✍️ {post.title}</a>
									<time datetime={post.publishedAt} class="ml-auto text-xs whitespace-nowrap text-muted">{formatDate(post.publishedAt, t.locale)}</time>
								</li>
							{/each}
						</ul>
					{/if}
				{/if}
			</article>
		</li>
	{/each}
</ol>

<p class="mt-10 rounded-xl border-l-4 border-ember bg-ember/10 px-4 py-3 text-muted">⚠️ {data.rule}</p>
