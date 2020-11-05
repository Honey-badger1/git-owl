const {BrowserWindow} = require('electron');
const createWindow = require('../../desktop-settings/window.js');
const path = require('path');
const router = require('./routes/router'); 
let win = null;

function createAuthWindow() {
  destroyAuthWin();

  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false
    }
  });

  win.loadURL(
    path.join(__dirname, '/logo.html'))

    const {session: {webRequest}} = win.webContents;



  win.webContents.openDevTools();

  win.on('authenticated', () => {
    destroyAuthWin();
  });

  win.on('closed', () => {
    win = null;
  });
}

function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}


function createLogoutWindow() {
    const logoutWindow = new BrowserWindow({
      show: false,
    });
  
    logoutWindow.loadURL(authService.getLogOutUrl());
  
    logoutWindow.on('ready-to-show', async () => {
      logoutWindow.close();
      await authService.logout();
    });
  }
  
  module.exports = {
    createAuthWindow,
    createLogoutWindow
  };