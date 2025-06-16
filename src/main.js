const {
  app,
  Tray,
  Menu,
  nativeImage,
  BrowserWindow,
  ipcMain,
  Notification,
} = require("electron");
const path = require("node:path");

const windows = new Set();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow() {
  // const splash = new BrowserWindow({
  //   width: 600,
  //   height: 400,
  //   transparent: true,
  //   frame: false,
  //   alwaysOnTop: true,
  // });
  // splash.loadURL(SPLASH_WINDOW_WEBPACK_ENTRY);
  // splash.center();

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    // frame: false,
    // autoHideMenuBar: true,
    // titleBarStyle: "hidden",
    // titleBarOverlay: true,
    // titleBarOverlay: {
    //   color: "#2f3241",
    //   symbolColor: "#74b1be",
    //   height: 40,
    // },
    webPreferences: {
      // sandbox: false,
      // webSecurity: false,
      // nodeIntegration: true,
      // contextIsolation: true,
      // devTools: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.loadURL(`file://${__dirname}/index.html`);

  // setTimeout(function () {
  //   splash.close();
    mainWindow.show();
  // }, 5000);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  //  windows.add(mainWindow);
  //  mainWindow.on('closed', () => {
  //   windows.delete(mainWindow);
  //   mainWindow = null;
  //  });
}

app.whenReady().then(() => {
  createWindow();

  // const icon = nativeImage.createFromPath('img/icon-1024x1024.png')
  // tray = new Tray(icon)

  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1', type: 'radio' },
  //   { label: 'Item2', type: 'radio' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' }
  // ])

  // tray.setContextMenu(contextMenu)

  ipcMain.on("minimizeApp", () => {
    mainWindow?.minimize();
  });
  ipcMain.on("maximizeApp", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.on("closeApp", () => {
    mainWindow?.close();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
// .then(showNotification)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("anything-asynchronous", (event, arg) => {
  //execute tasks on behalf of renderer process
  console.log(arg); // prints "ping"
});

function showNotification() {
  const NOTIFICATION_TITLE = "Basic Notification";
  const NOTIFICATION_BODY = "Notification from the Main process";

  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
  // new Notification({
  //   title: NOTIFICATION_TITLE,
  //   body: NOTIFICATION_BODY
  // }).show()
}
