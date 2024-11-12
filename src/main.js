const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  const splash = new BrowserWindow({
    width: 600, 
    height: 400, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });
  splash.loadURL(SPLASH_WINDOW_WEBPACK_ENTRY)
  splash.center();

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      // sandbox: false,
      // webSecurity: false,
      nodeIntegration: true,
      // contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.loadURL(`file://${__dirname}/index.html`);

  setTimeout(function () {
    splash.close();
    mainWindow.show();
  }, 5000);

  // Open the DevTools.  
 // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});



ipcMain.on('anything-asynchronous', (event, arg) => {
//execute tasks on behalf of renderer process 
    console.log(arg) // prints "ping"
})