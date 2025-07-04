const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
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
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
