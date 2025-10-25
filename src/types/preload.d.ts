/**
 * @author: dwclake
 * @created: 10-18-2025
 */

export interface Electron {
    document: {
        create: (title: string) => Promise<{ ok: boolean; id: number | undefined }>;
        delete: (id: number) => void;
        open: (id: number) => string;
        save: (id: number, content: string) => void;
    },
    notification: {
        send: (msg: string) => void;
    }
}

declare global {
    interface Window {
        electron: Electron;
    }
}