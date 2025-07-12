import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

const Store = require('electron-store');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let electronStore = new Store({
  defaults: {
    settings: {
      downloadPath: '',
      theme: 'light',
      autoStart: false,
      concurrentDownloads: 3,
      notifications: true,
    },
    snackbar: {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    },
  },
});

let win: BrowserWindow | null = null;
const serve = process.env['ELECTRON_DEV'] === 'true';

function createWindow(): BrowserWindow {
  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (serve) {
    import('electron-reloader').then((reloader) => {
      const reloaderFn = (reloader as any).default || reloader;
      reloaderFn(module);
    });
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const fullPath = path.join(__dirname, pathIndex);
    const url = `file://${path.resolve(fullPath).replace(/\\/g, '/')}`;
    win.loadURL(url);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

app.on('ready', () => setTimeout(createWindow, 400));

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// 📦 SETTINGS HANDLING VIA ELECTRON-STORE

// Get saved settings
ipcMain.handle('get-settings', async () => {
  return electronStore.get('settings');
});
// Get snackbar settings
ipcMain.handle('get-snackbar-settings', async () => {
  return electronStore.get('snackbar');
});

ipcMain.handle('set-snackbar-settings', async (_event, data) => {
  return electronStore.set('snackbar', data);
});
