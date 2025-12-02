import { BrowserWindow } from "electrobun/bun";

const isDev = !!process.env.ELECTROBUN_SVELTE_DEV;
const devUrl = process.env.ELECTROBUN_SVELTE_URL || "http://localhost:5173";
const url = isDev ? devUrl : "views://mainview/index.html";

// Create the main application window
const mainWindow = new BrowserWindow({
  title: "Solecism",
  url,
  frame: {
    width: 800,
    height: 800,
    x: 200,
    y: 200,
  },
});

// Close app when window is closed
mainWindow.on("closed", () => {
  process.exit(0);
});

console.log("Hello Electrobun app started!", { isDev, url });
