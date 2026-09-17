<script lang="ts">
	import Navbar from '#lib/components/Navbar.svelte';
	import Sidebar from '#lib/components/Sidebar.svelte';

	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex h-screen">
	<header
		class="m-4 mr-2 h-min w-min shrink-0 overflow-y-auto rounded-md border-2 bg-mirage-200 shadow-mirage-950 dark:shadow-mirage-200"
	>
		<Navbar />
	</header>
	<main
		class="m-4 ml-2 w-4/5 flex-1 overflow-y-auto rounded-md border-2 bg-mirage-200 shadow-mirage-950 dark:shadow-mirage-200"
	>
		{@render children()}
	</main>
</div>
