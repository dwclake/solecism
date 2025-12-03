<script lang="ts">
	import { onMount } from "svelte";

	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";

	import { init, store } from "$state";

	let num: number = $state(0);

	onMount(init);

	const onclick = async () => {
		const a = Math.random();
		const b = Math.random();
		num = await store.electrobun.rpc?.request.someBunFunction({ a, b });
	};

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<button {onclick}>press me</button>
<div>{num}</div>
{@render children()}
