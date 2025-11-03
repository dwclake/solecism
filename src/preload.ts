/*
 *
 */

import { contextBridge, ipcRenderer } from "electron";

import { Return, Document } from "@schemas";

const document = {
	/**
	 *
	 * @param title
	 * @returns
	 * @author dwclake
	 */
	create: async (title: string): Return<Document> => {
		const { ok, document } = await ipcRenderer.invoke("document-create", title);
		if (!ok) {
			return { ok: false, document: undefined };
		}

		return { ok: true, document };
	},
	/**
	 *
	 * @param id
	 * @returns
	 * @author dwclake
	 */
	open: async (id: number): Return<Document> => {
		const { ok, document } = await ipcRenderer.invoke("document-open", id);
		if (!ok) {
			return { ok: false, document: undefined };
		}

		return { ok: true, document };
	},
	/**
	 *
	 * @param id
	 * @param title
	 * @param content
	 * @returns
	 * @author dwclake
	 */
	save: async (id: number, title?: string, content?: string): Return<Document> => {
		const { ok, document } = await ipcRenderer.invoke("document-save", id, title, content);
		if (!ok) {
			return { ok: false, document: undefined };
		}

		return { ok: true, document };
	},
	/**
	 *
	 * @param id
	 * @returns
	 * @author dwclake
	 */
	remove: async (id: number): Return<Document> => {
		const { ok, document } = await ipcRenderer.invoke("document-remove", id);
		if (!ok) {
			return { ok: false, document: undefined };
		}

		return { ok: true, document };
	}
}

contextBridge.exposeInMainWorld("electron", {
	db: {
		document
	},
	os: {
		/**
         *
         * @returns
         * @author dwclake
         */
		check: async () => {
			return await ipcRenderer.invoke("os-check");
		},
		notify: {
			/**
			 *
			 * @param message
			 * @author dwclake
			 */
			send: (msg: string) => {
				ipcRenderer.send("notify", msg);
			}
		},
	}
});
