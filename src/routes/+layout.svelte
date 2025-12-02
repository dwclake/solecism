<script lang="ts">
	import { onMount } from "svelte";
	import type { RPC } from "../../shared/types";

	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";

	let num: number = $state(0);
	let electrobun: any = $state(null);

	onMount(async () => {
		// Dynamic import — only runs in the browser
		const { Electroview } = await import("electrobun/view");

		const rpc = Electroview.defineRPC<RPC>({
			handlers: {
				requests: {
					someWebviewFunction: ({ a, b }) => {
						document.body.innerHTML += `bun asked me to do math with ${a} and ${b}\n`;
						return a + b;
					}
				},
				messages: {
					logToWebview: ({ msg }) => {
						console.log(`bun asked me to logToWebview: ${msg}`);
					}
				}
			}
		});

		electrobun = new Electroview({ rpc });
	});

	const onclick = async () => {
		num = await electrobun.rpc?.request.someBunFunction({ a: 5, b: 10 });
	};

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<button {onclick}>press me</button>
<div>{num}</div>
{@render children()}
