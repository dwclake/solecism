/* @Author: dwclake
 * @Created: 10-17-2025
 */

import { app, ipcMain, BrowserWindow, Notification } from "electron"

import db from "./database"

declare const WEBVIEW_WEBPACK_ENTRY: string
declare const WEBVIEW_PRELOAD_WEBPACK_ENTRY: string

if (require("electron-squirrel-startup")) {
    app.quit()
}

// const documents = await db.documents()
// documents.run(`INSERT INTO documents (title, content) VALUES (?, ?)`, [
//     "Sample Document",
//     "This is a sample document created on app startup."
// ])

// documents.all(`SELECT * FROM documents`).then((rows) => {
//     console.log("Documents in database:")
//     rows.forEach((row) => {
//         console.log(`${row.id}: ${row.title} - ${row.content} (Created at: ${row.created_at})`)
//     })
// })

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
    })

    window.loadURL(WEBVIEW_WEBPACK_ENTRY)
}

app.whenReady().then(createWindow)

ipcMain.on("notify", (_, message) => {
    new Notification({ title: "Notification", body: message }).show()
})

// import CSVCleaner from "./stuff/CSVCleaner"

// const cleaner = new CSVCleaner({
//     buffer: 10,
//     path: "./data/ID.010.csv"
// })

// for (let i = 0; i < 12; i++) {
//     const row: any = await cleaner.getCleanedRow()
//     console.log(row)
// }