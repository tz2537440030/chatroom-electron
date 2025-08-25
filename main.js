import { app, BrowserWindow, ipcMain, session, Notification } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 430,
    height: 932,
    title: "证的后宫",
    icon: path.join(__dirname + "src/assets/images", "logo.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
    installReduxDevTools();
  } else {
    win.loadFile(path.join(__dirname, "dist", "index.html"));
    win.webContents.openDevTools();
  }
  if (process.platform === "darwin" && app.dock) {
    app.dock.setIcon(path.join(__dirname, "src/assets/images/logo.png"));
  }
}

async function installReduxDevTools() {
  try {
    const extensionPath = path.resolve(
      __dirname,
      "devtools-extensions/redux-devtools"
    );
    await session.defaultSession.loadExtension(extensionPath);
    console.log("Redux DevTools extension loaded");
  } catch (error) {
    console.warn("Failed to load Redux DevTools:", error);
  }
}

ipcMain.on("notify", (event, { user, msg }) => {
  new Notification({
    title: `新消息来自 ${user}`,
    body: msg,
    icon: path.join(__dirname, "/src/assets/images/logo.png"),
  }).show();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
