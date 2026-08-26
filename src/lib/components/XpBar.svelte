<script lang="ts">
	import { levelFor } from '$lib/client/gamification';
	let { xp, docsRead, docsTotal, phasesDone, phasesTotal }: { xp: number; docsRead: number; docsTotal: number; phasesDone: number; phasesTotal: number } = $props();
	const level = $derived(levelFor(xp));

	// Count-up animation for the XP number.
	let shown = $state(0);
	$effect(() => {
		const target = xp;
		const from = shown;
		if (from === target) return;
		const start = performance.now();
		const dur = 600;
		let raf = 0;
		const tick = (t: number) => {
			const k = Math.min(1, (t - start) / dur);
			shown = Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3)));
			if (k < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<section class="xp" aria-label="İlerleme">
	<div class="xp-head">
		<span class="lvl"><b class="icon">{level.icon}</b> Seviye {level.index + 1} · <strong>{level.title}</strong></span>
		<span class="num"><b>{shown}</b> XP</span>
	</div>
	<div class="bar" role="progressbar" aria-valuenow={level.pct} aria-valuemin="0" aria-valuemax="100">
		<i style="width:{level.pct}%"></i>
	</div>
	<div class="xp-foot">
		<span>{phasesDone}/{phasesTotal} faz · {docsRead}/{docsTotal} doküman</span>
		<span>{#if level.next}{level.toNext} XP → {level.next}{:else}Zirve 👑{/if}</span>
	</div>
</section>

<style>
	.xp{margin:20px 0 8px;padding:16px 18px;border:1px solid var(--border);border-radius:12px;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 8%,var(--bg)),var(--bg))}
	.xp-head,.xp-foot{display:flex;justify-content:space-between;align-items:center;gap:12px}
	.xp-foot{margin-top:8px;font-size:.85rem;color:var(--muted)}
	.lvl{font-size:.95rem}
	.icon{display:inline-block;animation:bob 2.4s ease-in-out infinite}
	.num{font-variant-numeric:tabular-nums;color:var(--accent)}
	.num b{font-size:1.4rem}
	.bar{position:relative;height:12px;margin-top:10px;background:var(--border);border-radius:6px;overflow:hidden}
	.bar i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),#5ad38a);border-radius:6px;transition:width .7s cubic-bezier(.2,.8,.3,1);position:relative}
	.bar i::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);transform:translateX(-100%);animation:shine 2.2s ease-in-out infinite}
	@keyframes shine{to{transform:translateX(100%)}}
	@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
	@media (prefers-reduced-motion:reduce){.bar i::after,.icon{animation:none}.bar i{transition:none}}
</style>
