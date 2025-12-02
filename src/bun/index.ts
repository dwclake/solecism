import { BrowserWindow } from "electrobun/bun";

const isDev = !!process.env.ELECTROBUN_SVELTE_DEV;
const devUrl = process.env.ELECTROBUN_SVELTE_URL || "http://localhost:5173";
const url = isDev ? devUrl : "views://mainview/index.html";

// If isDev, wait for server to be ready
console.log("hello?")
if (isDev) {
	console.log("is dev")
	const waitPort = async (port: number, host = "localhost", timeout = 10000) => {
		const start = Date.now();
		while (Date.now() - start < timeout) {
			console.log("waiting")
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
	frame: {
		width: 800,
		height: 800,
		x: 200,
		y: 200
	}
});

// Close app when window is closed
mainWindow.on("closed", () => {
	process.exit(0);
});

console.log("Hello Electrobun app starteddd!", { isDev, url });
