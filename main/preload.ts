/**
 * @author: dwclake
 * @created: 10-17-2025
 */

import { contextBridge, ipcRenderer } from "electron";

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
                    const { ok, id } = await ipcRenderer.invoke("create-document", title);
                    if (!ok) {
                        return resolve({
                            ok: false,
                            id: undefined
                        });
                    }

                    resolve({
                        ok: true,
                        id
                    });
                } catch (err) {
                    reject(err);
                }
            });
        },
        /**
         *
         * @param id
         */
        delete: (id: number) => {

        },
        /**
         *
         * @param id
         * @returns
         */
        open: (id: number) => {
            return "filecontent";
        },
        /**
         *
         * @param id
         * @param content
         */
        save: (id: number, content: string) => {

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