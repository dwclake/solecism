/* @Author: dwclake
 * @Created: 10-17-2025
 */

import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electron", {
    notification: {
        send: (message: string) => {
            ipcRenderer.send("notify", message)
        }
    }
})