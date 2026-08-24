<script lang="ts">
	import { formatDate } from '$lib/format';
	let { publishedAt, tags = [] }: { publishedAt: string; tags?: string[] } = $props();
</script>

<time datetime={publishedAt}>{formatDate(publishedAt)}</time>
{#if tags.length}
	<p class="tags">{#each tags as tag (tag)}<span>#{tag}</span>{/each}</p>
{/if}
