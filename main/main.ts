/**
 * @author: dwclake
 * @created: 10-17-2025
 */

import { app, BrowserWindow } from "electron";

import "./handlers";

declare const WEBVIEW_WEBPACK_ENTRY: string;
declare const WEBVIEW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = (): void => {
    const window = new BrowserWindow({
        minHeight: 600,
        minWidth: 800,
        titleBarStyle: "hidden",
        ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: WEBVIEW_PRELOAD_WEBPACK_ENTRY
        }
    });

    window.loadURL(WEBVIEW_WEBPACK_ENTRY);
}

app.whenReady().then(createWindow);