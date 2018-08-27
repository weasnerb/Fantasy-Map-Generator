import { app, Menu, BrowserWindow } from 'electron';

const { getTemplate } = require('./js/menu-template');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let newWindow;

// This method will be called when Electron has finished
const createWindow = () => {
    // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920 / 2,
    height: 1080 / 2,
    title: "Azgaar's Fantasy Map Generator",
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
    mainWindow = null;
  });
};
// initialization and is ready to create browser windows.

// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // const menu = Menu.buildFromTemplate(menuTemplate.getTemplate);
  createWindow();
  const menu = Menu.buildFromTemplate(getTemplate(mainWindow, newWindow));
  Menu.setApplicationMenu(menu);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    //   app.quit();
    // }
  app.quit(); // Remove the quit mac-specific restriction on quit
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
