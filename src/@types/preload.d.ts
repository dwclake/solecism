interface Electron {
    ping: () => Promise<string>;
}

declare global {
    const WEBVIEW_VITE_DEV_SERVER_URL: string | undefined;
    const WEBVIEW_VITE_NAME: string;

    interface Window {
        electron: Electron;
    }
}

declare namespace NodeJS {
    interface Global {
        WEBVIEW_VITE_DEV_SERVER_URL?: string;
        WEBVIEW_VITE_NAME?: string;
    }
}

export {};