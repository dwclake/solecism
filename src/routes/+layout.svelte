<script lang="ts">
	import Navbar from '#lib/components/Navbar.svelte';
	import Sidebar from '#lib/components/Sidebar.svelte';

	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div>
	<Navbar />
</div>
<main>
	{@render children()}
</main>
