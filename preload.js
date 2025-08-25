const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  notify: (user, msg) => ipcRenderer.send('notify', { user, msg })
});