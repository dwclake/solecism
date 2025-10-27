/**
 * @author: dwclake
 * @created: 10-17-2025
 */

import { contextBridge, ipcRenderer } from "electron";

import schemas from "./database/schemas";

contextBridge.exposeInMainWorld("electron", {
    document: {
        /**
         *
         * @param title
         * @returns
         */
        create: (title: string) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { ok, document } = await ipcRenderer.invoke("document-create", title);
                    if (!ok) {
                        return resolve({ ok: false, document: undefined });
                    }

                    resolve({ ok: true, document });
                } catch (err) {
                    reject(err);
                }
            });
        },
        /**
         *
         * @param id
         * @returns
         */
        open: async (id: number) => {
            const { ok, document } = await ipcRenderer.invoke("document-open", id);
        },
        /**
         *
         * @param id
         * @param title
         * @param content
         */
        save: async (id: number, title?: string, content?: string) => {
            const { ok, document } = await ipcRenderer.invoke("document-save", id, title, content);
        },
        /**
         *
         * @param id
         */
        remove: async (id: number) => {
            const { ok, document } = await ipcRenderer.invoke("document-remove", id);
        }
    },
    notification: {
        /**
         *
         * @param message
         */
        send: (message: string) => {
            ipcRenderer.send("notify", message);
        }
    }
})