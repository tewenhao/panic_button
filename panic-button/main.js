const { app, BrowserWindow, screen, ipcMain, Notification } = require('electron')
const path = require('path')

function createWindow() {
  // Get the primary display's dimensions
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  // Create a window with transparent background
  const mainWindow = new BrowserWindow({
    icon: 'assets/icon.png',
    width: width,
    height: height,
    x: 0,
    y: 0,
    frame: false, // Removes the window frame
    transparent: true, // Makes the window background transparent
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // Note: In production, you should enable contextIsolation
      preload: path.join(__dirname, 'preload.js')
    },
    movable: false
  })

  // Load the index.html file
  mainWindow.loadFile('index.html')
  mainWindow.setAlwaysOnTop(true)
  
  // Optional: Open DevTools for debugging
  // mainWindow.webContents.openDevTools()
}

function handleSetTitle (event, title) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  }

// Handle window behavior on different platforms
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function terror_notification() {
    
    const NOTIFICATION_TITLE = 'Basic Notification ' + Math.floor(Math.random() * 1000);
    const NOTIFICATION_BODY = 'Notification from the Main process';

    new Notification({title: NOTIFICATION_TITLE,body: NOTIFICATION_BODY}).show()
}

function run_random_terror() {
    const terror_funcs = [terror_notification];
    let i = Math.floor(Math.random() * terror_funcs.length);
    let r = terror_funcs[i];
    r();
}

function start_terror_loop() {
    setInterval(run_random_terror, 5000);
    // terror_notification();
}





app.whenReady().then(() => {
    ipcMain.on('set-title', handleSetTitle);
    ipcMain.on('begin_terrorizing', start_terror_loop);
    createWindow();
});