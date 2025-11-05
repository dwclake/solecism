import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    ping: async (): Promise<string> => {
        return ipcRenderer.invoke('ping');
    },

    invoke: (channel: string, ...args: unknown[]) => {
        const allowedChannels = ['ping'];
        if (!allowedChannels.includes(channel)) {
            throw new Error(`ipc channel "${channel}" is not permitted`);
        }
        return ipcRenderer.invoke(channel, ...args);
    }
});