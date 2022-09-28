/**
    ToDo: 
      [+] Make it delete.
      [+] Remove the last commas from the file.
      [+] Edit the menu bar.
 */

const { BrowserWindow, app, ipcMain, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const mainMenu = require("./src/menu.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(mainMenu);

  ipcMain.handle("create-file", (req, data) => {
    const dir = "logs";
    const filePath = path.join(__dirname, "logs", `database.txt`);
    const stringBuilder = data.name + "," + data.server + ",,";

    if (!data) {
      console.log("Error : No Data");
      return false;
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.appendFileSync(filePath, stringBuilder, function (err) {
      console.log(err);
    });

    return { success: true, filePath };
  });

  ipcMain.handle("read-file", (req, data) => {
    const filePath = path.join(__dirname, "logs", `database.txt`);
    const file = fs.readFileSync(filePath, "utf8");
    return file;
  });

  ipcMain.handle("delete-file", (req, data) => {
    const filePath = path.join(__dirname, "logs", `database.txt`);
    const file = fs.readFileSync(filePath, "utf8");
    const fileArray = file.split(",");
    const index = fileArray.indexOf(data);
    fileArray.splice(index, 3);
    const newFile = fileArray.join(",");
    fs.writeFileSync(filePath, newFile, "utf8");
    return true;
  });

  win.loadFile("src/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
