export interface Electron {
    ping: () => Promise<string>;
}

declare global {
    const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
    const MAIN_WINDOW_VITE_NAME: string;

    interface Window {
        electron: Electron;
    }
}

declare namespace NodeJS {
    interface Global {
        MAIN_WINDOW_VITE_DEV_SERVER_URL?: string;
        MAIN_WINDOW_VITE_NAME?: string;

        MAIN_PROCESS_SRC_DIR?: string;

        MAIN_PROCESS_BUILD_DIR?: string;
    }
}

export {};
