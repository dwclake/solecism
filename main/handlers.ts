/**
 * @author: dwclake
 * @created: 10-25-2025
 */

import { ipcMain, Notification } from "electron";

/**
 *
 */
ipcMain.on("notify", (_, message) => {
    new Notification({ title: "Notification", body: message }).show();
})