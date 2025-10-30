/**
 * @author: dwclake
 * @created: 10-17-2025
 */

import { contextBridge, ipcRenderer } from "electron";

import { Return, Document } from "@schemas";

contextBridge.exposeInMainWorld("electron", {
	db: {
		document: {
			/**
			 *
			 * @param title
			 * @returns
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
			 */
			remove: async (id: number): Return<Document> => {
				const { ok, document } = await ipcRenderer.invoke("document-remove", id);
				if (!ok) {
					return { ok: false, document: undefined };
				}

				return { ok: true, document };
			}
		},
	},
	os: {
		/**
         *
         * @returns
         */
		check: async () => {
			return await ipcRenderer.invoke("os-check");
		},
		notify: {
			/**
			 *
			 * @param message
			 */
			send: (msg: string) => {
				ipcRenderer.send("notify", msg);
			}
		},
	}
});
