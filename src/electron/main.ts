import { app, BrowserWindow } from "electron";
import path from "path";

async function openDevTools(window: BrowserWindow): Promise<void> {
  return new Promise((resolve) => {
    window.webContents.once("devtools-opened", resolve);
    window.webContents.openDevTools({
      mode: "detach",
    });
  });
}

async function createWindow(): Promise<void> {
  const mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 1024,
    height: 768,
    maximizable: false,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
  });

  await Promise.all([mainWindow.loadFile("main.html"), openDevTools(mainWindow)]);

  mainWindow.show();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(async () => {
  await createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
