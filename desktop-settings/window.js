const path = require('path');
const url = require('url');

const {app, BrowserWindow,  Menu, ipcMain} = require('electron');
const { createAuthWindow } = require('../components/authentication/auth');

let win;


async function showWindow() {
	try {
	  await authService.refreshTokens();
	  return createWindow();
	} catch (err) {
	  createAuthWindow();
	}
  }

function createWindow() {
	win = new BrowserWindow({
		width: 700,
		height: 500,
        icon: __dirname + "/img/owl.png",
        webPreferences: {
		   nodeIntegration:true,
		   enableRemoteModule: true,
		   webviewTag: true
        }
     
	});

	win.loadURL(url.format({
		pathname: path.join(__dirname, '../dist/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});

	win.webContents.executeJavaScript(`
		const fs = require('fs');
		let config = require('../desktop-settings/config.json');
		config = JSON.parse(JSON.stringify(config));

		let button = document.querySelector("#open");
			const {
				dialog
			} = require('electron').remote;
		
			;
			button.addEventListener('click', () => {
		
				let pathRepo = dialog.showOpenDialog({
					properties: ['openDirectory']
				}).then(data => data.filePaths);
				
				pathRepo.then(data => {
					
					if (fs.existsSync(data[0] + "/.git")) {
						if (!config.reposPaths.some(el => el === data[0])) {
							config.reposPaths.push(data[0])
						}
						fs.writeFileSync("E:/workspace/git-owl/desktop-settings/config.json", JSON.stringify(config))
						console.log(config)
						console.log('file or directory exists');
						let app = document.querySelector("#Statistics");
					} else {
						errorMessage.classList.remove('hide');
						errorMessage.classList.add('show')
					}
				})
			})
	`)
}



app.on('ready',
    createWindow
   )

app.on('window-all-closed', () => {
	app.quit();
});

module.exports=createWindow









