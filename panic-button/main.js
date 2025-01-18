const { app, BrowserWindow, screen, ipcMain, Notification, dialog } = require('electron')
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

function terror_malware_popups() {
    const panic_msgs = [
      "PANIK PANIK PANIKKKKKKK",
      "EVERYTHING'S IN FLAMES WHAT IS HAPPENING???!!!",
      "I CAN'T FUNCTION AT ALL WHAT???",
      "WHERE'S MY MEDS??!!",

      // special aloysius mentions
      "DAMN IT AHHHH"
    ];

    let i = Math.floor(Math.random() * panic_msgs.length);
    let msg = panic_msgs[i];

    // dialog.showErrorBox(
    //     title="PANICCCCCCCCCCCCCCCCCCCCCCCCCCC",
    //     content=msg
    // );

    // dialog.showMessageBox(
    //     {
    //         message: msg,
    //         type: "warning",
    //         buttons: ["AHHHHHHHHH"],
    //         title: "PANIKINAPANIKINAPANIK",
    //         // icon: <insert mcafee logo NativeImage thing>
    //     }
    // )

    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

    // Create a new BrowserWindow for each message
    let panicWindow = new BrowserWindow({
        width: 400,
        height: 200,
        x: Math.floor(Math.random() * (width - 400)),
        y: Math.floor(Math.random() * (height - 200)),
        frame: false, // Removes the window frame
        alwaysOnTop: true,
        modal: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Load HTML content into the window
    panicWindow.loadURL(`data:text/html,
      <html>
          <body style="display: flex; align-items: center; justify-content: center; height: 100%; margin: 0; font-family: Arial, sans-serif; background-color: white;">
              <div style="text-align: center;">
                  <h1>${msg}</h1>
                  <button onclick="window.close()">AHHHHHHHHH</button>
              </div>
          </body>
      </html>`);

    panicWindow.once('ready-to-show', () => {
        panicWindow.show();
    });
}

function run_random_terror() {
    const terror_funcs = [terror_notification, terror_malware_popups];
    let i = Math.floor(Math.random() * terror_funcs.length);
    let r = terror_funcs[i];
    r();
}

function start_terror_loop() {
    setInterval(run_random_terror, 1000);
    // terror_notification();
    // terror_malware_popups();
}





app.whenReady().then(() => {
    ipcMain.on('set-title', handleSetTitle);
    ipcMain.on('begin_terrorizing', start_terror_loop);
    createWindow();
});