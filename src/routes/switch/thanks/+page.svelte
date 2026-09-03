<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	let { data } = $props();
</script>

<Seo site={data.site} title="Slot reserved — Zero-Churn Switch" description="Your founding-merchant deposit is in." path="/switch/thanks" />

<div class="mx-auto max-w-2xl px-5 pt-16 pb-24 text-center">
	<p class="text-[.7rem] font-extrabold tracking-[.25em] text-gold uppercase">Founding merchant</p>
	<h1 class="mt-3 text-4xl font-extrabold text-ink">Your slot is reserved.</h1>
	<p class="mx-auto mt-4 max-w-xl text-lg text-muted">
		Your receipt is on its way from Paddle. Within one business day you’ll get a personal email to book the migration
		call — bring your latest Recharge invoice and we’ll walk your catalog together.
	</p>
	<p class="mx-auto mt-3 max-w-xl text-sm text-muted">
		Remember: the deposit is fully refundable until your migration starts — one email is enough.
	</p>
	<a href="/journal" class="mt-8 inline-block rounded-full border-2 border-forest px-6 py-3 font-extrabold text-forest no-underline transition hover:bg-forest hover:text-white">Read the build journal →</a>
</div>
