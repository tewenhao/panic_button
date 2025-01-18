const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('coinflip', {
    submit_user_choice: (choice) => ipcRenderer.send('submit_user_choice', choice),
    close_window: () => ipcRenderer.send('close_window')
  })