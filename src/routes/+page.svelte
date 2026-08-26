<script lang="ts">
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	import { XP_PER_DOC, xpFor } from '$lib/client/gamification';
	import { formatDate } from '$lib/format';
	import Burst from '$lib/components/Burst.svelte';
	import XpBar from '$lib/components/XpBar.svelte';
	let { data } = $props();
	const read = createReadingProgress('docs:read');
	let burst: Burst;

	type Step = (typeof data.steps)[number];
	const totalDocs = $derived(data.steps.reduce((n, s) => n + s.docs.length, 0));
	const readDocs = $derived(data.steps.reduce((n, s) => n + s.docs.filter((d) => read.has(d.slug)).length, 0));
	const doneSteps = $derived(data.steps.filter((s) => s.status === 'done').length);
	const xp = $derived(xpFor(readDocs, doneSteps));

	const stepPct = (s: Step) =>
		s.status === 'done' ? 100 : s.docs.length ? Math.round((s.docs.filter((d) => read.has(d.slug)).length / s.docs.length) * 100) : 0;
	const badgeEarned = (s: Step) => s.status === 'done' || (s.docs.length > 0 && s.docs.every((d) => read.has(d.slug)));
	function toggle(step: Step, slug: string) {
		const wasRead = read.has(slug);
		read.toggle(slug);
		if (!wasRead) burst.fire(badgeEarned(step) ? `🏅 ${step.title} rozeti!` : `+${XP_PER_DOC} XP`);
	}
	const status = {
		done: { text: 'Fethedildi', cls: 'border-forest text-forest' },
		next: { text: 'Buradasın', cls: 'border-gold bg-gold text-ink' },
		todo: { text: 'Sisli', cls: 'border-line text-muted' }
	} as const;
</script>

<svelte:head>
	<title>{data.site.name}</title>
	<meta name="description" content={data.site.description} />
	<link rel="canonical" href={data.site.url + '/'} />
</svelte:head>

<Burst bind:this={burst} />

<section class="animate-enter">
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">Görev Haritası · Sıfırdan App Store'a</p>
	<h1 class="mb-3 text-3xl leading-tight font-extrabold text-ink sm:text-4xl">{data.site.name}</h1>
	<p class="max-w-3xl text-lg text-muted">{data.intro}</p>
</section>

<div class="grid gap-4 lg:grid-cols-[3fr_2fr] lg:items-stretch">
<XpBar {xp} docsRead={readDocs} docsTotal={totalDocs} phasesDone={doneSteps} phasesTotal={data.steps.length} />

<section class="card mt-4 flex flex-wrap content-center items-center gap-3 px-5 py-4 lg:mt-6" aria-label="Rozet çantası">
	<span class="w-full text-[.7rem] font-extrabold tracking-[.2em] text-gold uppercase">Rozet Çantası</span>
	{#each data.steps as step (step.n)}
		{@const earned = badgeEarned(step)}
		<span
			class="relative grid h-10 w-10 place-items-center rounded-full border text-xl transition {earned
				? 'animate-pop border-gold bg-gold/15 shadow-[0_0_0_3px_color-mix(in_srgb,var(--gold)_25%,transparent)]'
				: 'border-line opacity-40 grayscale'}"
			title="{step.title} rozeti"
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
		{@const st = status[step.status]}
		<li id="faz-{step.n}" class="relative animate-enter {step.status === 'todo' ? 'opacity-70' : ''}" style="animation-delay:{i * 80}ms">
			<!-- waypoint -->
			<div
				class="absolute top-4 -left-14 grid h-12 w-12 place-items-center rounded-full {step.status === 'next' ? 'animate-pulse-ring' : ''}"
				style="background:conic-gradient(var(--gold) calc({pct} * 1%), var(--line) 0)"
			>
				<div class="grid h-10 w-10 place-items-center rounded-full text-lg {step.status === 'done' ? 'bg-forest text-white' : 'bg-card'}">
					{step.status === 'done' ? '✓' : step.icon}
				</div>
			</div>

			<article class="card p-6 transition-transform hover:-translate-y-0.5 {step.status === 'next' ? 'ring-2 ring-gold/60' : ''}">
				<div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
					<span class="font-display text-xs font-extrabold tracking-widest text-muted">FAZ {step.n}</span>
					<h2 class="text-xl font-extrabold text-ink">{step.title}</h2>
					<span class="text-sm text-muted">· {step.time}</span>
					<span class="ml-auto rounded-full border px-2.5 py-0.5 text-[.7rem] font-extrabold tracking-wider uppercase {st.cls}">{st.text}</span>
				</div>
				<p class="mt-2">{step.learn}</p>
				<p class="mt-1 text-[.95rem] text-muted"><b class="text-ink">🏁 Bitti sayılır:</b> {step.done}</p>

				{#if step.docs.length}
					<div class="mt-4 h-1.5 overflow-hidden rounded-full bg-bg-deep">
						<div class="h-full rounded-full bg-gradient-to-r from-forest to-gold transition-[width] duration-500" style="width:{pct}%"></div>
					</div>
					<ul class="mt-2 space-y-1">
						{#each step.docs as doc (doc.slug)}
							{@const isRead = read.has(doc.slug)}
							<li class="flex items-center gap-1">
								<label class="group flex flex-1 cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gold/10">
									<input type="checkbox" class="peer sr-only" checked={isRead} onchange={() => toggle(step, doc.slug)} />
									<span class="grid h-5 w-5 flex-none place-items-center rounded-md border-2 text-xs text-white transition peer-focus-visible:ring-2 peer-focus-visible:ring-gold {isRead ? 'border-forest bg-forest' : 'border-line group-hover:border-gold'}">{isRead ? '✓' : ''}</span>
									<span class="flex-1 {isRead ? 'text-muted line-through' : ''}">📜 {doc.title}</span>
									<span class="text-[.7rem] font-extrabold text-gold {isRead ? 'opacity-40' : ''}">+{XP_PER_DOC}</span>
								</label>
								<a href="/docs/{doc.slug}" class="rounded-lg px-2.5 py-1 font-extrabold text-forest no-underline hover:bg-forest/10" aria-label="Oku">→</a>
							</li>
						{/each}
					</ul>
				{/if}

				{#if step.posts.length}
					<ul class="mt-3 space-y-1 border-t border-dashed border-line pt-3">
						{#each step.posts as post (post.slug)}
							<li class="flex items-center gap-2 px-2 text-[.95rem]">
								<a href="/posts/{post.slug}" class="text-ink no-underline hover:text-ember">✍️ {post.title}</a>
								<time datetime={post.publishedAt} class="ml-auto text-xs whitespace-nowrap text-muted">{formatDate(post.publishedAt)}</time>
							</li>
						{/each}
					</ul>
				{/if}
			</article>
		</li>
	{/each}
</ol>

<p class="mt-10 rounded-xl border-l-4 border-ember bg-ember/10 px-4 py-3 text-muted">⚠️ {data.rule}</p>
