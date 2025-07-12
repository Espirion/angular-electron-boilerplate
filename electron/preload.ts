import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  arch: process.arch,
  invoke: (channel: string, ...args: any[]) =>
    ipcRenderer.invoke(channel, ...args),
  send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
  on: (channel: string, listener: (...args: any[]) => void) =>
    ipcRenderer.on(channel, (event, ...args) => listener(...args)),
  removeListener: (channel: string, listener: (...args: any[]) => void) =>
    ipcRenderer.removeListener(channel, listener),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  setSettings: (settings: any) => ipcRenderer.invoke('set-settings', settings),
  getSnackBarSettings: () => ipcRenderer.invoke('get-snackbar-settings'),
  setSnackBarSettings: (snackBarSettings: any) => {
    ipcRenderer.invoke('set-snackbar-settings', snackBarSettings);
  },
});
