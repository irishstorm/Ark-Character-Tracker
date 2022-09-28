const { app, Menu } = require("electron");
const isMac = process.platform === "darwin";

const template = [
  //    { role: "appMenu" },
  ...(isMac
    ? [
        {
          label: "File",
          submenu: [{ role: "about" }],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  {
    label: "Help",
    submenu: [
      {
        label: "About",
        click: () => {
          const { dialog } = require("electron");
          dialog.showMessageBox({
            type: "info",
            title: "About",
            message:
              "This app was made to keep track of your ark characters and which server they are on.\n\n\nMade by: Toxicfury\nVersion: 1.0.0",
            buttons: ["OK"],
          });
        },
      },
    ],
  },
];

module.exports = Menu.buildFromTemplate(template);
