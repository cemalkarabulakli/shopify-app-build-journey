<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head><title>{page.status}</title></svelte:head>

<article class="post">
	<h1>{page.status}</h1>
	<p>{page.error?.message ?? 'Something went wrong.'} <a href="/">Back to the journal</a>.</p>
</article>
