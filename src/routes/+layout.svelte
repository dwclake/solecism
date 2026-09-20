<script lang="ts">
	import Navbar from '#lib/components/Navbar.svelte';

	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="bg-pattern flex h-dvh w-dvw">
	<header
		class="glass-bg m-4 mr-2 h-min w-min shrink-0 overflow-y-auto rounded-md border-2 shadow-mirage-950 dark:shadow-mirage-200"
	>
		<Navbar />
	</header>
	<!-- Instead of wrapping the page content the glass bg and shadow should go around different floating page sections -->
	<main class="m-4 ml-2 flex flex-1 overflow-y-auto">
		{@render children()}
	</main>
</div>

<style>
</style>
