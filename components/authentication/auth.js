const {BrowserWindow} = require('electron');
const createWindow = require('../../desktop-settings/window.js');
//const authService = require('../services/auth-service'); 

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

  win.loadURL(url.format({
      //login url
    pathname: path.join(__dirname, '/logo.html'),
    protocol: 'file:',
    slashes: true}));

  const {session: {webRequest}} = win.webContents;

  const filter = {
    urls: [
      'http://localhost/callback*'
    ]
  };

  webRequest.onBeforeRequest(filter, async ({url}) => {
    await authService.loadTokens(url);
    createWindow();
    return destroyAuthWin();
  });

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