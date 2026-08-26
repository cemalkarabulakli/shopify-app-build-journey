<script lang="ts">
	import { formatDate } from '$lib/format';
	import { useI18n } from '$lib/i18n';
	const { t } = useI18n();
	let { publishedAt, tags = [] }: { publishedAt: string; tags?: string[] } = $props();
</script>

<div class="flex flex-wrap items-center gap-2 text-xs tracking-wider text-muted uppercase">
	<time datetime={publishedAt}>{formatDate(publishedAt, t.locale)}</time>
	{#each tags as tag (tag)}<span class="rounded-full border border-line bg-bg-deep/60 px-2 py-0.5 normal-case tracking-normal text-forest">#{tag}</span>{/each}
</div>
