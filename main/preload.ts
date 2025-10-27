/**
 * @author: dwclake
 * @created: 10-17-2025
 */

import { contextBridge, ipcRenderer } from "electron";

import schemas from "@schemas";

contextBridge.exposeInMainWorld("electron", {
	db: {
		document: {
			/**
			 *
			 * @param title
			 * @returns
			 */
			create: async (title: string) => {
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
			open: async (id: number) => {
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
			 */
			save: async (id: number, title?: string, content?: string) => {
				const { ok, document } = await ipcRenderer.invoke("document-save", id, title, content);
				if (!ok) {
					return { ok: false, document: undefined };
				}

				return { ok: true, document };
			},
			/**
			 *
			 * @param id
			 */
			remove: async (id: number) => {
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
		check: () => {
			return ipcRenderer.invoke("os-check");
		},
		notification: {
			/**
			 *
			 * @param message
			 */
			send: (message: string) => {
				ipcRenderer.send("notify", message);
			}
		},
	}
});
