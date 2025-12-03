import { BrowserWindow } from "electrobun/bun";
import { BrowserView } from "electrobun/bun";
import { type RPC } from "../shared/types";

const isDev = !!process.env.ELECTROBUN_SVELTE_DEV;
const devUrl = process.env.ELECTROBUN_SVELTE_URL || "http://localhost:5173";
const url = isDev ? devUrl : "views://mainview/index.html";

// Create an RPC object for the bun handlers with the shared type
const rpc = BrowserView.defineRPC<RPC>({
	maxRequestTime: 5000,
	handlers: {
		requests: {
			someBunFunction: ({ a, b }) => {
				console.log(`browser asked me to do math with: ${a} and ${b}`);
				return a + b;
			}
		},
		// When the browser sends a message we can handle it
		// in the main bun process
		messages: {
			"*": (messageName, payload) => {
				console.log("global message handler", messageName, payload);
			},
			logToBun: ({ msg }) => {
				console.log("Log to bun: ", msg);
			}
		}
	}
});

// If isDev, wait for server to be ready
if (isDev) {
	const waitPort = async (port: number, host = "localhost", timeout = 10000) => {
		const start = Date.now();
		while (Date.now() - start < timeout) {
			try {
				const response = await fetch(`http://${host}:${port}`);
				if (response.ok) {
					return;
				}
			} catch {
				// ignore
			}
		}
		throw new Error(`Timeout waiting for port ${port} on host ${host}`);
	};
	const urlObj = new URL(devUrl);
	const port = parseInt(urlObj.port, 10) || 80;
	await waitPort(port, urlObj.hostname);
}

// Create the main application window
const mainWindow = new BrowserWindow({
	title: "Solecism",
	url,
	rpc,
	frame: {
		width: 800,
		height: 800,
		x: 200,
		y: 200
	}
});

// Close app when window is closed
mainWindow.on("close", () => {
	console.log("electronbun closing...");

	// set exit code to 0
	process.exitCode = 0;
	// Emit SIGINT to allow graceful shutdown
	process.emit("SIGINT");
});

console.log("Hello Electrobun app started!", { isDev, url });
