<script lang="ts">
	/** Fog Dragon — the mascot. Six forms, one per level in $lib/client/gamification LEVELS.
	 *  Pure SVG + CSS today; swap the internals for a Rive canvas later, same props. */
	let {
		level = 4,
		size = 56,
		point = false,
		flip = false,
		fog = false
	}: { level?: number; size?: number; point?: boolean; flip?: boolean; fog?: boolean } = $props();

	const n = $derived(Math.min(6, Math.max(1, Math.round(level))));
</script>

<span
	class="dragon inline-block flex-none align-bottom {point ? 'pointing' : 'animate-bob'}"
	style="width:{size}px;height:{size}px;{flip ? 'transform:scaleX(-1);' : ''}"
	aria-hidden="true"
>
	<svg viewBox="0 0 64 64" width={size} height={size}>
		<ellipse cx="32" cy="58" rx="16" ry="3" fill="var(--ink)" opacity=".08" />

		{#if n === 1}
			<!-- 1 · Egg — Novice Wanderer -->
			<path
				d="M32 18c11 0 18 14 18 24 0 8-8 14-18 14s-18-6-18-14c0-10 7-24 18-24z"
				fill="var(--bg-deep)"
				stroke="var(--line)"
				stroke-width="1.5"
			/>
			<path d="M18 34l8 3-6 5 9 3-7 5" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" />
			<path d="M44 46q7 1 5-6" fill="none" stroke="var(--forest)" stroke-width="4" stroke-linecap="round" />
			<circle cx="38" cy="34" r="3.2" fill="#fff" stroke="var(--forest)" stroke-width="1.2" />
			<circle cx="37.4" cy="34" r="1.7" fill="var(--ink)" class="pupil" />
		{:else}
			{@const big = n >= 5}
			{#if n === 6}
				<circle cx="30" cy="34" r="26" fill="var(--gold-soft)" opacity=".16" />
			{/if}

			<!-- wings -->
			{#if n === 3}
				<path d="M33 32q-2-9 8-7 3 6-3 8z" fill="var(--forest-soft)" stroke="var(--forest)" stroke-width="1.4" stroke-linejoin="round" />
			{:else if n === 6}
				<path d="M34 30q-6-20 18-16 5 12-7 18z" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="1.6" stroke-linejoin="round" class="wing" />
			{:else if n >= 4}
				<path d="M33 31q-3-15 13-11 4 9-5 13z" fill="var(--forest-soft)" stroke="var(--forest)" stroke-width="1.6" stroke-linejoin="round" class="wing" />
			{/if}

			<!-- body -->
			<ellipse cx="34" cy={n === 2 ? 45 : 42} rx={big ? 17 : n === 2 ? 13 : 16} ry={big ? 14 : n === 2 ? 11 : 13} fill="var(--forest)" />
			<ellipse cx="35" cy={n === 2 ? 48 : 46} rx={n === 2 ? 8 : 10} ry={n === 2 ? 6 : 7} fill="var(--forest-soft)" opacity=".55" />

			<!-- tail -->
			<path
				d={n === 2 ? 'M46 47q10 1 7-8' : big ? 'M50 45q15 2 10-13' : 'M48 45q13 2 8-11'}
				fill="none"
				stroke="var(--forest)"
				stroke-width={n === 2 ? 5 : 6}
				stroke-linecap="round"
				class="tail"
			/>
			{#if n === 3}
				<!-- lantern on the tail — the 🔦 level -->
				<circle cx="52" cy="30" r="7" fill="var(--gold-soft)" opacity=".25" class="lantern" />
				<rect x="48" y="26" width="8" height="9" rx="2" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="1.2" />
			{:else}
				<path d={big ? 'M56 32l9-8-1 10z' : 'M53 35l8-7-1 9z'} fill="var(--gold-soft)" />
			{/if}

			<!-- head -->
			<circle cx="24" cy={n === 2 ? 32 : n === 3 ? 30 : n === 6 ? 26 : 27} r={n === 2 ? 11 : n === 6 ? 12 : 11.5} fill="var(--forest)" />
			<ellipse cx={n === 2 ? 16 : n === 6 ? 13 : 14} cy={n === 2 ? 35 : n === 3 ? 33 : 30} rx={n === 6 ? 7 : 6.5} ry={n === 6 ? 5.2 : 5} fill="var(--forest)" />
			<circle cx={n === 2 ? 12.6 : 10.5} cy={n === 2 ? 34 : n === 3 ? 32 : 29} r="1.2" fill="#0d3d30" />

			<!-- horns / headgear -->
			{#if n === 2}
				<path d="M18 22c4-6 12-6 16 0-5 3-11 3-16 0z" fill="var(--bg-deep)" stroke="var(--line)" stroke-width="1.2" />
			{:else if n === 3}
				<path d="M28 20l1.5-7 3.5 7z" fill="var(--gold-soft)" />
			{:else if n === 4}
				<path d="M27 17l1.5-8 4 8z" fill="var(--gold-soft)" />
				<path d="M20 17v-6l3.5 6z" fill="var(--gold-soft)" />
			{:else if n === 5}
				<path d="M13 18q11-8 22-1l-1 3q-10-5-20 1z" fill="var(--sky)" />
				<path d="M15 17q9-12 18-1z" fill="var(--sky)" />
			{:else}
				<path d="M26 15l2-10 4.5 10z" fill="var(--gold-soft)" />
				<path d="M19 16l-.5-8 4 8z" fill="var(--gold-soft)" />
				<path d="M14 14l6-5 6 5 6-5 5 5z" fill="var(--gold-soft)" stroke="var(--gold)" stroke-width="1.2" />
			{/if}

			<!-- eye -->
			<circle cx={n === 2 ? 23 : n === 3 ? 22 : 21} cy={n === 2 ? 30 : n === 3 ? 28 : n === 6 ? 24 : 25} r={n === 6 ? 3.6 : 3.4} fill="#fff" />
			<circle cx={n === 2 ? 22.2 : n === 3 ? 21.2 : 20} cy={n === 2 ? 30 : n === 3 ? 28 : n === 6 ? 24 : 25} r={n === 6 ? 2 : 1.9} fill="var(--ink)" class="pupil" />

			<!-- props -->
			{#if n === 4}
				<rect x="20" y="42" width="22" height="7" rx="3.5" fill="#f2ead6" stroke="var(--gold)" stroke-width="1.3" transform="rotate(-8 31 45)" />
			{:else if n === 5}
				<path d="M30 40v6M27 46a3 3 0 006 0" fill="none" stroke="var(--gold-soft)" stroke-width="1.8" stroke-linecap="round" />
			{/if}

			<!-- feet -->
			<ellipse cx={n === 2 ? 29 : big ? 26 : 27} cy={n === 2 ? 56 : 55} rx={big ? 5.4 : n === 2 ? 4.5 : 5} ry={big ? 3.2 : n === 2 ? 2.8 : 3} fill="#0d6b56" />
			<ellipse cx={n === 2 ? 40 : big ? 41 : 40} cy={n === 2 ? 56 : 55} rx={big ? 5.4 : n === 2 ? 4.5 : 5} ry={big ? 3.2 : n === 2 ? 2.8 : 3} fill="#0d6b56" />

			{#if fog || n === 6}
				<circle cx="6" cy="30" r="2.8" fill={n === 6 ? '#fff' : 'var(--line)'} class="puff" />
				<circle cx="4" cy="25" r="1.9" fill={n === 6 ? '#fff' : 'var(--line)'} class="puff puff2" />
			{/if}
		{/if}
	</svg>
</span>

<style>
	.pointing { animation: lean 2.6s ease-in-out infinite; }
	@keyframes lean {
		0%, 100% { transform: translateY(0) rotate(0); }
		50% { transform: translateY(-4px) rotate(-4deg); }
	}
	.puff { animation: fogdrift 2.6s ease-out infinite; }
	.puff2 { animation-delay: 0.55s; }
	@keyframes fogdrift {
		0% { opacity: 0; transform: translateX(0) scale(0.7); }
		40% { opacity: 0.8; }
		100% { opacity: 0; transform: translateX(-9px) scale(1.5); }
	}
	.lantern { animation: glow 3s ease-in-out infinite; }
	@keyframes glow { 0%, 100% { opacity: 0.18; } 50% { opacity: 0.42; } }
	/* A flipped host would mirror the shadow too; keep the pupil readable either way. */
	:global(.dragon svg) { overflow: visible; }
</style>
