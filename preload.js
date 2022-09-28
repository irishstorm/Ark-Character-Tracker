const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("api", {
  createFile: (data) => ipcRenderer.invoke("create-file", data),
  readFile: (data) => ipcRenderer.invoke("read-file", data),
  deleteFile: (data) => ipcRenderer.invoke("delete-file", data),
});
