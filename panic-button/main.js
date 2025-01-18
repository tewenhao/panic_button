const { app, BrowserWindow, screen } = require('electron')
const path = require('path')

function createWindow() {
  // Get the primary display's dimensions
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  // Create a window with transparent background
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    frame: false, // Removes the window frame
    transparent: true, // Makes the window background transparent
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Note: In production, you should enable contextIsolation
    }
  })

  // Load the index.html file
  mainWindow.loadFile('index.html')
  
  // Optional: Open DevTools for debugging
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(createWindow)

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