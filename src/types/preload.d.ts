export interface Electron {
    notification: {
        send: (msg: string) => void;
    }
}

declare global {
    interface Window {
        electron: Electron;
    }
}