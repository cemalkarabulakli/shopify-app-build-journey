<script lang="ts">
	import { createReadingProgress } from '$lib/client/readingProgress.svelte';
	import { formatDate } from '$lib/format';
	let { data } = $props();
	const read = createReadingProgress('docs:read');
	const totalDocs = $derived(data.steps.reduce((n, s) => n + s.docs.length, 0));
	const readDocs = $derived(data.steps.reduce((n, s) => n + s.docs.filter((d) => read.has(d.slug)).length, 0));
	const doneSteps = $derived(data.steps.filter((s) => s.status === 'done').length);
	const label = { done: '✅ Bitti', next: '▶ Sıradaki', todo: '⬜' } as const;
</script>

<svelte:head>
	<title>{data.site.name}</title>
	<meta name="description" content={data.site.description} />
	<link rel="canonical" href={data.site.url + '/'} />
</svelte:head>

<section class="intro">
	<h1>{data.site.name}</h1>
	<p>{data.intro}</p>
</section>

<div class="docs-progress">
	<span>{doneSteps}/{data.steps.length} faz · {readDocs}/{totalDocs} doküman okundu</span>
	<div class="bar"><i style="width:{totalDocs ? (readDocs / totalDocs) * 100 : 0}%"></i></div>
</div>

<ol class="path">
	{#each data.steps as step (step.n)}
		<li class="step {step.status}" id="faz-{step.n}">
			<div class="step-head">
				<span class="step-n">{step.n}</span>
				<h2>{step.title} <small>· {step.time}</small></h2>
				<span class="status">{label[step.status]}</span>
			</div>
			<p class="learn">{step.learn}</p>
			<p class="done"><strong>Bitti sayılır:</strong> {step.done}</p>
			{#if step.docs.length}
				<ul class="step-docs">
					{#each step.docs as doc (doc.slug)}
						<li class:read={read.has(doc.slug)}>
							<input type="checkbox" checked={read.has(doc.slug)} onchange={() => read.toggle(doc.slug)} aria-label="Okundu" />
							<a href="/docs/{doc.slug}">📖 {doc.title}</a>
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
