import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electron", {
    notification: {
        send: (message: string) => {
            ipcRenderer.send("notify", message)
        }
    }
})