import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
    app.quit();
}

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        title: 'solecsim',
        titleBarStyle: 'hidden',
        ...(process.platform != 'darwin' ? { titleBarOverlay: true } : {}),
        webPreferences: {
            preload: path.join(__dirname, '..', 'preload', 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    if (WEBVIEW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(WEBVIEW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(
            path.join(__dirname, `../renderer/${WEBVIEW_VITE_NAME}/index.html`)
        );
    }
}

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
