const { app, BrowserWindow, screen, ipcMain, Notification, dialog } = require('electron')
const fs = require('fs')
const path = require('path');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// default configs
let CONFIG = { "terror-interval": 1000 };
const CONFIG_PATH = 'terror_config.json';

// Add sample() to randomly choose an element from an array
Array.prototype.sample = function(){ return this[Math.floor(Math.random()*this.length)]; }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
            NOTIFICATION_TITLE = 'Group Project #6';
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

function three_terror_malware_popups() {
    terror_malware_popups();
    terror_malware_popups();
    terror_malware_popups();
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

const TERROR_FUNCS = [terror_notification, three_terror_malware_popups];
// Randomly chooses a function to terrorize the user with
function run_random_terror() {
    TERROR_FUNCS.sample()();
}

function coinflip_window() {
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    let window_width;
    let window_height;

    let coinflipWindow = new BrowserWindow({
        width: window_width,
        height: window_height,
        x: Math.floor(width / 2) - Math.floor(window_width / 2),
        y: Math.floor(height / 2) - Math.floor(window_height / 2),
        frame: false, // Removes the window frame
        alwaysOnTop: true,
        modal: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'coinflip_window/coinflip_preload.js')
        }
    });

    coinflipWindow.loadFile("coinflip_window/coinflip.html");

    coinflipWindow.once('ready-to-show', () => {
        coinflipWindow.show();
    });

    ipcMain.once('close_window', () => {
        coinflipWindow.close();
    });
}

/// mode: an integer that takes the value of either 0 or 1, each representing a different case
/// 0 - coin flip; 1 - unskippable hero wars ad
function video_window(mode, is_heads=-1) {
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    let vid_path;
    let window_width, window_height;
    let html_path;
    
    if (mode == 0) {
        vid_path = is_heads ? "assets/heads-or-tails/heads.mp4" : "assets/heads-or-tails/tails.mp4";
        window_width = 500;
        window_height = 500;
        html_path = 'video_player.html';
    }
    else if (mode == 1) {
        vid_path = "assets/unskippable-ad/ad.mp4"
        window_width = width - 100;
        window_height = height - 100;
        html_path = 'video_player.html';

    } else if (mode == 2) {
        vid_path = 'assets/ultrakill-5s-congrats.mp4'
        window_width = 500;
        window_height = 500;
        html_path = 'stretchy_player.html';

    }

    let videoWindow = new BrowserWindow({
        width: window_width,
        height: window_height,
        x: Math.floor(width / 2) - Math.floor(window_width / 2),
        y: Math.floor(height / 2) - Math.floor(window_height / 2),
        frame: false, // Removes the window frame
        alwaysOnTop: true,
        modal: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Load the HTML file
    videoWindow.loadFile(html_path); // Update with the correct path

    videoWindow.once('ready-to-show', () => {
        // Send the video path to the renderer process
        videoWindow.webContents.send('set-video-path', path.resolve(vid_path));
        videoWindow.show();
    });

    // Listen for the 'video-ended' message from the renderer process
    ipcMain.once('video-ended', () => {
        videoWindow.close();
        return 0;
    });
}

function start_terror_loop() {
    // start_offering_to_exit();

    randomterrorID = setInterval(run_random_terror, CONFIG['terror-interval']);
    setTimeout(offer_to_exit, 5000, randomterrorID);

    // coinflip_window();
    // terror_notification();
    // terror_malware_popups();
    // offer_to_exit(0);
}

async function offer_to_exit(randomterrorID) {

    clearInterval(randomterrorID);
    coinflip_window();  

    ipcMain.once('submit_user_choice', (event, answer) => reconcile_exit_coinflip(answer))
}

async function reconcile_exit_coinflip(choice) {

    // let heads_or_tails = Math.random() < 0.5 ? 'heads' : 'tails';
    let heads_or_tails = 'heads';
    let user_success = choice == heads_or_tails;

    // TODO: add confetti here maybe
    video_window(0, heads_or_tails == 'heads');
    await sleep(5000);

    if (user_success) {
        video_window(2); // display ultrakill congrats
        await sleep(26000);

        app.quit();

    } else {
        video_window(1); // display hero wars ad
        await sleep(30000);

        let time_to_sleep = getRandomInt(30, 60);
        
        new Notification({
            title: "Better luck next time!",
            body: `Next coin flip in ${time_to_sleep} seconds`,
            icon: path.join(__dirname, "assets/coin.png"),
        }).show()

        newID = setInterval(run_random_terror, CONFIG['terror-interval']);
        setTimeout(offer_to_exit, time_to_sleep * 1000, newID);
    }
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


    // ipcMain.on('begin_terrorizing', start_terror_loop);
    createWindow();
    video_window(2);
});