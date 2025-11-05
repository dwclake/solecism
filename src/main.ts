import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
    app.quit();
}

const createWindow = (): void => {
    // Preload bundle is written to `.vite/build/preload/preload.js`.
    // `__dirname` is the `main` build directory (e.g. `.vite/build/main`), so
    // reference the sibling `preload` folder instead of looking for
    // `preload.js` inside the `main` directory.
    const preloadPath = path.join(__dirname, '..', 'preload', 'preload.js');

    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: preloadPath,
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }
};

ipcMain.handle('ping', async () => {
    return 'pong';
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});