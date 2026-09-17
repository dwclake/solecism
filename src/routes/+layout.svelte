<script lang="ts">
	import Navbar from '#lib/components/Navbar.svelte';
	import Sidebar from '#lib/components/Sidebar.svelte';

	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex h-screen">
	<header class="w-min shrink-0 overflow-y-auto">
		<Navbar />
	</header>
	<main class="flex-1 overflow-y-auto p-4">
		{@render children()}
	</main>
</div>
