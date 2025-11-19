const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;
let isAlwaysOnTop = false;
const isDev = !app.isPackaged;

function createWindow() {
  win = new BrowserWindow({
    width: 420,
    height: 260,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173/#/desktop-timer");
    win.webContents.openDevTools();
  } else {
    win.loadURL(
      `file://${path.join(__dirname, "dist", "index.html")}#/desktop-timer`
    );
  }
}

ipcMain.on("toggle-always-on-top", () => {
  isAlwaysOnTop = !isAlwaysOnTop;
  if (win) win.setAlwaysOnTop(isAlwaysOnTop);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
