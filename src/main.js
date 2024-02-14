'use sctrict';

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  });


  mainWindow.loadURL(startUrl);
  mainWindow.setTitle('Kalkulacka');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', function () {
    createWindow();

    if (process.env.NODE_ENV === 'development') {
        // Development specific settings
    }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

try {
  require('electron-reloader')(module)
} catch (_) {}
