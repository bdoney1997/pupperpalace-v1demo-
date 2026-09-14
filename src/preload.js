// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');
 
//
// Abel- 
// Expose `ipcRenderer` to renderer only 
// For security purposes this is mainly intended for prototyping and in order to
// Rapidly advance with User Interface and functionality.
// Once program is no longer in early stages of development, adding implementation of  
// A back end web application framework might be recommended
//
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, ...args) => {
    ipcRenderer.send(channel, ...args);
  },
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  removeListener: (eventName) => {
	ipcRenderer.removeAllListeners(eventName);
 
  }
});
 
 
 
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
 
 
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})