/**
 * @author: dwclake
 * @created: 10-25-2025
 */

import { ipcMain, Notification } from "electron";

import { open, actions } from "./database";
import schemas from "./database/schemas";

const db = await open();

/**
 *
 */
ipcMain.handle("document-create", async (_, title: string) => {
    try {
        const { ok, document } = await actions.documents.create(db, title);
        if (!ok) {
            return { ok: false, document: undefined };
        }

        return { ok: true, document };
    } catch (err) {
        throw err;
    }
});

/**
 *
 */
ipcMain.handle("document-open", async (_, id: number) => {

});

/**
 *
 */
ipcMain.handle("document-save", async (_, id: number, title?: string, content?: string) => {

});

/**
 *
 */
ipcMain.handle("document-remove", async (_, id: number) => {

});

/**
 *
 */
ipcMain.on("notify", (_, message) => {
    new Notification({ title: "Notification", body: message }).show();
});