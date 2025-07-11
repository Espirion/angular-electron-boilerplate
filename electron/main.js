const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const isDev = process.env["ELECTRON_DEV"] === "true";
  win.loadURL(
    isDev
      ? "http://localhost:4200"
      : `file://${path.join(
          __dirname,
          "../dist/angular-electron-boilerplate/index.html"
        )}`
  );
}

app.whenReady().then(createWindow);

// macOS: reopen window if none exist
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Quit on all windows closed (except macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
