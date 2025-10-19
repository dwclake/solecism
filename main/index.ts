/* @Author: dwclake
 * @Created: 10-17-2025
 */

import { app, ipcMain, BrowserWindow, Notification } from "electron"

import { db } from "./database"

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require("electron-squirrel-startup")) {
    app.quit()
}

const createWindow = (): void => {
    const window = new BrowserWindow({
        height: 600,
        width: 800,
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    })

    window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
}

app.whenReady().then(createWindow)

ipcMain.on("notify", (_, message) => {
    new Notification({ title: "Notification", body: message }).show()
})