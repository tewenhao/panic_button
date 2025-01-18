const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('actions', {
    begin_terrorizing: () => ipcRenderer.send('begin_terrorizing'),
    set_on_top: (channel, data) => ipcRenderer.send(channel, data)
})

// contextBridge.exposeInMainWorld('electronAPI', {
//     setTitle: (title) => ipcRenderer.send('set-title', title)
//   })