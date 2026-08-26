<script lang="ts">
	/** Confetti + floating "+XP" toast. Call `fire(label)`; purely cosmetic. */
	let bursts = $state<{ id: number; label: string; pieces: { a: number; r: number; d: number; c: string }[] }[]>([]);
	let seq = 0;
	const colors = ['#008060', '#95bf47', '#e3b341', '#b7791f', '#1f4e79', '#ffffff'];

	export function fire(label: string) {
		const id = ++seq;
		const pieces = Array.from({ length: 26 }, (_, i) => ({
			a: (i / 26) * 360 + Math.random() * 14,
			r: 70 + Math.random() * 80,
			d: Math.random() * 0.15,
			c: colors[i % colors.length]
		}));
		bursts = [...bursts, { id, label, pieces }];
		setTimeout(() => (bursts = bursts.filter((b) => b.id !== id)), 1400);
	}
</script>

{#each bursts as b (b.id)}
	<div class="pointer-events-none fixed top-[40%] left-1/2 z-50 h-0 w-0" aria-hidden="true">
		<span class="toast absolute top-0 left-0 rounded-full border border-gold bg-card px-4 py-1 font-display text-xl font-extrabold whitespace-nowrap text-forest shadow-lg">{b.label}</span>
		{#each b.pieces as p}
			<i class="piece absolute -top-1 -left-1 h-2 w-2 rounded-sm" style="--a:{p.a}deg;--r:{p.r}px;--d:{p.d}s;background:{p.c}"></i>
		{/each}
	</div>
{/each}

<style>
	.toast { transform: translate(-50%, -50%); animation: rise 1.2s ease-out forwards; }
	.piece { opacity: 0; animation: fly 0.9s cubic-bezier(0.2, 0.8, 0.3, 1) var(--d) forwards; }
	@keyframes fly { 0% { opacity: 1; transform: rotate(var(--a)) translateX(0) rotate(0); } 100% { opacity: 0; transform: rotate(var(--a)) translateX(var(--r)) rotate(540deg); } }
	@keyframes rise { 0% { opacity: 0; transform: translate(-50%, -30%) scale(0.6); } 20% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); } 100% { opacity: 0; transform: translate(-50%, -140%) scale(1); } }
</style>
