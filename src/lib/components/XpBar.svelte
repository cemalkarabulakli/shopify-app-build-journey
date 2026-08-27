<script lang="ts">
	import { levelFor } from '$lib/client/gamification';
	import FogDragon from '$lib/components/FogDragon.svelte';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { xp, docsRead, docsTotal, phasesDone, phasesTotal }: { xp: number; docsRead: number; docsTotal: number; phasesDone: number; phasesTotal: number } = $props();
	const level = $derived(levelFor(xp));

	let shown = $state(0);
	$effect(() => {
		const target = xp;
		const from = shown;
		if (from === target) return;
		const start = performance.now();
		let raf = 0;
		const tick = (t: number) => {
			const k = Math.min(1, (t - start) / 600);
			shown = Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3)));
			if (k < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	// Level-up quip: only when the level index actually rises during this visit.
	let quip = $state('');
	let lastIndex = $state(-1);
	$effect(() => {
		const i = level.index;
		if (lastIndex >= 0 && i > lastIndex) {
			quip = t.dragon.levelUp(i + 1, t.levels[i]);
			const id = setTimeout(() => (quip = ''), 3200);
			lastIndex = i;
			return () => clearTimeout(id);
		}
		lastIndex = i;
	});
</script>

<section class="card relative mt-6 overflow-hidden p-5" aria-label={t.home.card}>
	<p class="mb-2 text-[.7rem] font-extrabold tracking-[.2em] text-gold uppercase">{t.home.card}</p>
	<div class="flex flex-wrap items-end justify-between gap-3">
		<div class="flex items-end gap-3">
			<FogDragon level={level.index + 1} size={72} fog />
			<div>
				<div class="text-sm text-muted">{t.home.level} {level.index + 1} · {level.index + 1}/6</div>
				<div class="font-display text-2xl font-extrabold text-ink">{t.levels[level.index]}</div>
			</div>
		</div>
		<div class="text-right tabular-nums">
			<span class="font-display text-3xl font-extrabold text-forest">{shown}</span>
			<span class="text-sm text-muted">XP</span>
		</div>
	</div>
	{#if quip}
		<p class="animate-pop mt-3 inline-block rounded-2xl rounded-bl-sm border border-gold bg-card px-3 py-1.5 font-display text-[.95rem] font-bold text-ink">{quip}</p>
	{/if}
	<div class="relative mt-4 h-3.5 overflow-hidden rounded-full border border-line bg-bg-deep" role="progressbar" aria-valuenow={level.pct} aria-valuemin="0" aria-valuemax="100">
		<div class="relative h-full rounded-full bg-gradient-to-r from-forest via-forest-soft to-gold transition-[width] duration-700 ease-out" style="width:{level.pct}%">
			<span class="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
		</div>
	</div>
	<div class="mt-2 flex flex-wrap justify-between gap-2 text-xs text-muted">
		<span>🏁 {phasesDone}/{phasesTotal} {t.home.phases} · 📖 {docsRead}/{docsTotal} {t.home.scrolls}</span>
		<span>{#if level.hasNext}{level.toNext} {t.home.toNext} <b class="text-ink">{t.levels[level.index + 1]}</b>{:else}{t.home.maxed}{/if}</span>
	</div>
</section>
