const { app, BrowserWindow, screen, ipcMain, Notification, dialog } = require('electron')
const fs = require('fs')
const path = require('path')

// default configs
let CONFIG = { "terror-interval": 1000 };
const CONFIG_PATH = CONFIG_PATH;

// Add sample() to randomly choose an element from an array
Array.prototype.sample = function(){ return this[Math.floor(Math.random()*this.length)]; }

function createWindow() {
  // Get the primary display's dimensions
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  // Create a window with transparent background
  const mainWindow = new BrowserWindow({
    icon: 'assets/icon.png',
    // type: 'toolbar',
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

function terror_notification() {

    const NOTIFICATION_TYPES = ['Default', 'WhatsApp', 'Telegram']
    let notif_type = NOTIFICATION_TYPES.sample();

    // let NOTIFICAION_SENDERID = app.getName();
    let NOTIFICATION_TITLE = 'Gentle Reminder 😊';
    let NOTIFICATION_BODY = 'LOCK IN LOCK IN LOCK IN LOCK IN LOCK IN LOCK IN LOCK IN LOCK IN';
    let NOTIFICATION_ICON = 'assets/icon.png';

    
    switch (notif_type) {
        case 'WhatsApp':
            // NOTIFICAION_SENDERID = 'WhatsApp';
            NOTIFICATION_TITLE = 'Professor ?????';
            NOTIFICATION_BODY = 'I noticed you have not submitted your assignment. Please do so by the end of the day.';
            NOTIFICATION_ICON = 'assets/notification-icons/WhatsApp_default_pfp.png';
            break;
        case 'Telegram':
            // NOTIFICAION_SENDERID = 'Telegram';
            NOTIFICATION_TITLE = 'CP2106 Final Project Group #6';
            NOTIFICATION_BODY = '+65 82637422: Eh guys submission is tmr, how ah';
            NOTIFICATION_ICON = 'assets/notification-icons/telegram.png';
            break;
        default:
    }

    new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
        icon: path.join(__dirname, NOTIFICATION_ICON),
    }).show()

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

const TERROR_FUNCS = [terror_notification, terror_malware_popups];
// Randomly chooses a function to terrorize the user with
function run_random_terror() {
    TERROR_FUNCS.sample()();
}

function start_terror_loop() {
    setInterval(run_random_terror, CONFIG['terror-interval']);
    // terror_notification();
    // terror_malware_popups();
}


// Set the App User Model ID to the app's name, relevant for Notifications on Windows
if (process.platform === 'win32'){ app.setAppUserModelId(app.getName()); }

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

// show window when app is ready
app.whenReady().then(() => {
    fs.readFile(CONFIG_PATH, 'utf8', function (err, data) {
      if (err) {
        fs.writeFile(CONFIG_PATH, JSON.stringify(CONFIG), 'utf8', function(err) {if (err) throw err;});
      } else {
        CONFIG = JSON.parse(data);
      }
    });



    ipcMain.on('begin_terrorizing', start_terror_loop);
    createWindow();
});