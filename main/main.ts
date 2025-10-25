/**
 * @author: dwclake
 * @created: 10-17-2025
 */

import { app, ipcMain, BrowserWindow, Notification } from "electron";

import "./handlers";
import database from "./database";

declare const WEBVIEW_WEBPACK_ENTRY: string;
declare const WEBVIEW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
    app.quit();
}

const db = await database.open();
// db.run(`INSERT INTO documents (title, content) VALUES (?, ?)`, [
//     "Sample Document",
//     "This is a sample document created on app startup."
// ]);

// db.all(`SELECT * FROM documents`).then((rows) => {
//     console.log("Documents in database:");
//     rows.forEach((row) => {
//         console.log(`${row.id}: ${row.title} - ${row.content} (Created at: ${row.created_at})`);
//     });
// });

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