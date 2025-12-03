import type { RPC } from "../../shared/types";

interface State {
	electrobun: any | null;
}
export const store = $state<State>({
	electrobun: null
});

export const init = async () => {
	if (store.electrobun) {
		return;
	}

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

	store.electrobun = new Electroview({ rpc });
};
