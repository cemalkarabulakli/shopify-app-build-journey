<script lang="ts">
	/** Confetti + floating "+XP" toast. Call `fire(label)`; purely cosmetic. */
	let bursts = $state<{ id: number; label: string; pieces: { x: number; r: number; d: number; c: string }[] }[]>([]);
	let seq = 0;
	const colors = ['#0a7c3e', '#5ad38a', '#ffd166', '#ef476f', '#118ab2', '#f78c6b'];

	export function fire(label: string) {
		const id = ++seq;
		const pieces = Array.from({ length: 22 }, (_, i) => ({
			x: (i / 22) * 360 + Math.random() * 16,
			r: 60 + Math.random() * 70,
			d: Math.random() * 0.15,
			c: colors[i % colors.length]
		}));
		bursts = [...bursts, { id, label, pieces }];
		setTimeout(() => (bursts = bursts.filter((b) => b.id !== id)), 1400);
	}
</script>

{#each bursts as b (b.id)}
	<div class="burst" aria-hidden="true">
		<span class="toast">{b.label}</span>
		{#each b.pieces as p}
			<i style="--a:{p.x}deg;--r:{p.r}px;--d:{p.d}s;background:{p.c}"></i>
		{/each}
	</div>
{/each}

<style>
	.burst{position:fixed;left:50%;top:40%;width:0;height:0;pointer-events:none;z-index:50}
	.toast{position:absolute;left:0;top:0;transform:translate(-50%,-50%);font-weight:800;font-size:1.6rem;color:var(--accent);white-space:nowrap;animation:rise 1.2s ease-out forwards;text-shadow:0 2px 12px rgba(0,0,0,.15)}
	i{position:absolute;left:-4px;top:-4px;width:8px;height:8px;border-radius:2px;animation:fly .9s cubic-bezier(.2,.8,.3,1) var(--d) forwards;opacity:0}
	@keyframes fly{0%{opacity:1;transform:rotate(var(--a)) translateX(0) rotate(0)}100%{opacity:0;transform:rotate(var(--a)) translateX(var(--r)) rotate(540deg)}}
	@keyframes rise{0%{opacity:0;transform:translate(-50%,-30%) scale(.6)}20%{opacity:1;transform:translate(-50%,-50%) scale(1.15)}100%{opacity:0;transform:translate(-50%,-140%) scale(1)}}
	@media (prefers-reduced-motion:reduce){i{display:none}.toast{animation-duration:.6s}}
</style>
