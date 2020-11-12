const path = require('path');
const url = require('url');
const {app, BrowserWindow,  Menu, ipcMain} = require('electron');
const auth=require('../components/authentication/auth-main.js')

let win;
let openWin;
let authWin


function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 800,
        icon: __dirname + "/img/owl.png",
        webPreferences: {
		   nodeIntegration:true,
		   enableRemoteModule: true,
		   webviewTag: true
        }
     
	});

	win.loadURL(url.format({
		pathname: path.join(__dirname, '/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});


	openWin = new BrowserWindow({
		width: 1000,
		height: 750,
		show:false,
        icon: __dirname + "/img/owl.png",
        webPreferences: {
		   nodeIntegration:true,
		   enableRemoteModule: true,
		   webviewTag: true
        }
     
	});

	openWin.loadURL(url.format({
		pathname: path.join(__dirname, '/open.html'),

	}));



	ipcMain.on('toggle-prefs', function () {
		if (openWin.isVisible())
		  openWin.hide()
		else
		  openWin.show()
	  });
	openWin.on('closed', () => {
		openWin.hide()
	});

	
	authWin = new BrowserWindow({
		width: 1000,
		height: 800,
        icon: __dirname + "/img/owl.png",
     
	autoHideMenuBar: true,
    useContentSize: true,
    resizable: false,
  });
  authWin.loadURL('https://git-owl-5.herokuapp.com/');



	authWin.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});


	openWin = new BrowserWindow({
		width: 1000,
		height: 750,
		show:false,
        icon: __dirname + "/img/owl.png",
        webPreferences: {
		   nodeIntegration:true,
		   enableRemoteModule: true,
		   webviewTag: true
        }
     
	});



	

  
};
  



app.on('ready',
createWindow)

app.on('window-all-closed', () => {
	app.quit();
});

module.exports=createWindow









