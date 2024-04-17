'use sctrict';

const { app, BrowserWindow,Menu } = require('electron');
const path = require('path');
const url = require('url');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

let mainWindow;

function createWindow() {
  if (process.env.NODE_ENV !== 'development') {
    mainWindow = new BrowserWindow({
      width: 500,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
      },
    });
  }
  else{
    // Development specific settings
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    mainWindow.webContents.openDevTools();
  }

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

    const template = [
      {
        label: 'Help',
        click: () => {
          const helpWindow = new BrowserWindow({
            width: 600,
            height: 400,
            parent: mainWindow,
            modal: true,
            webPreferences: {
              nodeIntegration: true
            },
            autoHideMenuBar: true
          });

          const startUrl = url.format({
            pathname: path.join(__dirname, 'help.html'),
            protocol: 'file:',
            slashes: true,
          });

          helpWindow.loadURL(startUrl);
          helpWindow.setTitle('Kalkulacka');
        }
      }
    ];
  
    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

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
