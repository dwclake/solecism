<script lang="ts">
	import Navbar from '#lib/components/Navbar.svelte';

	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="bg-pattern">
	<header class="glass-bg">
		<Navbar />
	</header>
	<main>
		{@render children()}
	</main>
</div>

<style>
	div {
		display: flex;
		width: 100dvw;
		height: 100dvh;
	}

	header {
		flex-shrink: 0;
		width: min-content;
		margin: 1rem 0.5rem 1rem 1rem;
		overflow-y: auto;
		border: 2px solid currentColor;
		border-radius: 0.375rem;
		box-shadow: var(--shadow-mirage-950);
	}

	main {
		display: flex;
		flex: 1;
		margin: 1rem 1rem 1rem 0.5rem;
		overflow-y: auto;
		border-radius: 0.375rem;
		scrollbar-width: none;
	}

	main::-webkit-scrollbar {
		display: none;
	}
</style>
