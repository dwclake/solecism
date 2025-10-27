/**
 * @author: dwclake
 * @created: 10-25-2025
 */

import { ipcMain, Notification } from "electron";

import { open, actions } from "./database";
import schemas from "@schemas";

const db = await open();

/**
 *
 */
ipcMain.handle("document-create", (_, title: string) => {
	return new Promise(async (resolve, reject) => {
		try {
	        const { ok, document } = await actions.documents.create(db, title);
	        if (!ok) {
	            return resolve({ ok: false, document: undefined });
	        }

	        resolve({ ok: true, document });
	    } catch (err) {
	        console.log(err);
			resolve({ ok: false, document: undefined });
	    }
	});
});

/**
 *
 */
ipcMain.handle("document-open", async (_, id: number) => {
	return new Promise(async (resolve, reject) => {
		try {
	        const { ok, document } = await actions.documents.open(db, id);
	        if (!ok) {
	            return resolve({ ok: false, document: undefined });
	        }

	        resolve({ ok: true, document });
	    } catch (err) {
	        console.log(err);
			resolve({ ok: false, document: undefined });
	    }
	});
});

/**
 *
 */
ipcMain.handle("document-save", async (_, id: number, title?: string, content?: string) => {
	return new Promise(async (resolve, reject) => {
		try {
	        const { ok, document } = await actions.documents.save(db, id, title, content);
	        if (!ok) {
	            return resolve({ ok: false, document: undefined });
	        }

	        resolve({ ok: true, document });
	    } catch (err) {
	        console.log(err);
			resolve({ ok: false, document: undefined });
	    }
	});
});

/**
 *
 */
ipcMain.handle("document-remove", async (_, id: number) => {
	return new Promise(async (resolve, reject) => {
		try {
	        const { ok, document } = await actions.documents.remove(db, id);
	        if (!ok) {
	            return resolve({ ok: false, document: undefined });
	        }

	        resolve({ ok: true, document });
	    } catch (err) {
	        console.log(err);
			resolve({ ok: false, document: undefined });
	    }
	});
});

/**
 *
 */
ipcMain.on("notify", (_, message) => {
    new Notification({ title: "Notification", body: message }).show();
});

/**
 *
 */
ipcMain.handle("os-check", (_) => {
	return process.platform;
});
