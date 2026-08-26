<script lang="ts">
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	import { XP_PER_DOC, xpFor } from '$lib/client/gamification';
	import { formatDate } from '$lib/format';
	import Burst from '$lib/components/Burst.svelte';
	import XpBar from '$lib/components/XpBar.svelte';
	let { data } = $props();
	const read = createReadingProgress('docs:read');
	let burst: Burst;

	const totalDocs = $derived(data.steps.reduce((n, s) => n + s.docs.length, 0));
	const readDocs = $derived(data.steps.reduce((n, s) => n + s.docs.filter((d) => read.has(d.slug)).length, 0));
	const doneSteps = $derived(data.steps.filter((s) => s.status === 'done').length);
	const xp = $derived(xpFor(readDocs, doneSteps));
	const label = { done: 'Bitti', next: 'Sıradaki', todo: 'Kilitli' } as const;

	function stepPct(step: (typeof data.steps)[number]) {
		if (step.status === 'done') return 100;
		if (!step.docs.length) return 0;
		return Math.round((step.docs.filter((d) => read.has(d.slug)).length / step.docs.length) * 100);
	}
	function badgeEarned(step: (typeof data.steps)[number]) {
		return step.status === 'done' || (step.docs.length > 0 && step.docs.every((d) => read.has(d.slug)));
	}
	function toggle(step: (typeof data.steps)[number], slug: string) {
		const wasRead = read.has(slug);
		read.toggle(slug);
		if (wasRead) return;
		burst.fire(badgeEarned(step) ? `🏅 ${step.title} rozeti!` : `+${XP_PER_DOC} XP`);
	}
</script>

<svelte:head>
	<title>{data.site.name}</title>
	<meta name="description" content={data.site.description} />
	<link rel="canonical" href={data.site.url + '/'} />
</svelte:head>

<Burst bind:this={burst} />

<section class="intro">
	<h1>{data.site.name}</h1>
	<p>{data.intro}</p>
</section>

<XpBar {xp} docsRead={readDocs} docsTotal={totalDocs} phasesDone={doneSteps} phasesTotal={data.steps.length} />

<div class="badges" aria-label="Rozetler">
	{#each data.steps as step (step.n)}
		<span class="badge" class:earned={badgeEarned(step)} title="{step.title} rozeti">{badgeEarned(step) ? '🏅' : '🔒'}<small>{step.n}</small></span>
	{/each}
</div>

<ol class="path">
	{#each data.steps as step, i (step.n)}
		{@const pct = stepPct(step)}
		<li class="step {step.status}" id="faz-{step.n}" style="--i:{i}">
			<div class="step-n" style="--p:{pct}"><span>{step.status === 'done' ? '✓' : step.n}</span></div>
			<div class="step-head">
				<h2>{step.title} <small>· {step.time}</small></h2>
				<span class="status">{label[step.status]}</span>
			</div>
			<p class="learn">{step.learn}</p>
			<p class="done"><strong>Bitti sayılır:</strong> {step.done}</p>
			{#if step.docs.length}
				<div class="mini"><i style="width:{pct}%"></i></div>
				<ul class="step-docs">
					{#each step.docs as doc (doc.slug)}
						<li class:read={read.has(doc.slug)}>
							<label>
								<input type="checkbox" checked={read.has(doc.slug)} onchange={() => toggle(step, doc.slug)} />
								<span class="box"></span>
								<span class="txt">📖 {doc.title}</span>
								<span class="xp-tag">+{XP_PER_DOC}</span>
							</label>
							<a href="/docs/{doc.slug}" aria-label="Oku">→</a>
						</li>
					{/each}
				</ul>
			{/if}
			{#if step.posts.length}
				<ul class="step-posts">
					{#each step.posts as post (post.slug)}
						<li><a href="/posts/{post.slug}">✍️ {post.title}</a> <time datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time></li>
					{/each}
				</ul>
			{/if}
		</li>
	{/each}
</ol>

<p class="rule">{data.rule}</p>
