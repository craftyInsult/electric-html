// // Preload (Isolated World)
// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld(
//   "bridge",
//   {
//     passHtmlViaIPC: () => { 
//         ipcRenderer.once("IPCDOMContentLoaded", () => document.documentElement.outerHTML) 
//     }
//   }
// ); 