<script lang="ts">
	import Navbar from '#lib/components/Navbar.svelte';

	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="grain-bg z-0 flex h-svh w-svw text-mirage-900 dark:bg-mirage-100 dark:text-mirage-300">
	<header
		class="z-1 m-4 mr-2 h-min w-min shrink-0 overflow-y-auto rounded-md border-2 bg-mirage-200 shadow-mirage-950 dark:shadow-mirage-200"
	>
		<Navbar />
	</header>
	<main
		class="z-1 m-4 ml-2 w-4/5 flex-1 overflow-y-auto rounded-md border-2 bg-mirage-200 shadow-mirage-950 dark:shadow-mirage-200"
	>
		{@render children()}
	</main>
</div>
