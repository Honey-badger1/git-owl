
const path = require('path');
const url = require('url');
const fs = require('fs');

const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const gimmeStat = require('../backend/gimme-stat');

const data = async (pathRepo, since, until) => {

	return await gimmeStat.json({
		cwd: pathRepo,
		since: since,
		until: until,
		prepull: false
	}).then((answer) => {
		return answer.json;
	})
}

function createWindow() {
    let win = new BrowserWindow({
        width: 700,
        height: 500,
        icon: `${__dirname}/img/owl.png`,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            webviewTag: true,
            preload: `${__dirname}/preload.js`,
        },

    });

    ipcMain.on('last-statistics-request', (event, path) => {
        let config = fs.readFileSync(`${__dirname}/config/config.json`, { encoding: 'utf8' });
        config = JSON.parse(config);
        const index = config.lastStatisticsRequest.map((el) => el.path).indexOf(path);
        event.reply('last-statistics-request', (index >= 0) ? config.lastStatisticsRequest[index].statistics : []);
    });

    ipcMain.on('get-statistics', async (event, path, since, until) => {
        const result = await data(path, since, until);
        let config = fs.readFileSync(`${__dirname}/config/config.json`, { encoding: 'utf8' });
        config = JSON.parse(config);
        !config.lastStatisticsRequest.some((el) => el.path === path)
            ? config.lastStatisticsRequest.push({ path, statistics: result })
            : config.lastStatisticsRequest = config.lastStatisticsRequest.map((el) => {
                if (el.path === path) {
                    return { path, statistics: result };
                }
                return el;
            });
        fs.writeFileSync(`${__dirname}/config/config.json`, JSON.stringify(config));
        event.reply('get-statistics', JSON.stringify(result));
    });

    ipcMain.on('choose-directory', async (event) => {
		let config = fs.readFileSync(`${__dirname}/config/config.json`, { encoding: 'utf8' });
		config = JSON.parse(config);
        const { dialog } = require('electron');

        const pathRepo = dialog.showOpenDialog({
            properties: ['openDirectory'],
        }).then((data) => data.filePaths);

        pathRepo.then((data) => {
            if (fs.existsSync(`${data[0]}/.git`)) {
                if (!config.reposPaths.some((el) => el === data[0])) {
					config.reposPaths.push(data[0]);
					fs.writeFileSync(`${__dirname}/config/config.json`, JSON.stringify(config));
                    event.reply('add-path', config.reposPaths);
                }
            }
        });
    });

	ipcMain.on('close-tab', (event, path) => {
		let config = fs.readFileSync(`${__dirname}/config/config.json`, { encoding: 'utf8' });
		config = JSON.parse(config);
		config.lastStatisticsRequest = config.lastStatisticsRequest.filter(el => el.path !== path);
		config.reposPaths = config.reposPaths.filter(el => el !== path);
        fs.writeFileSync(`${__dirname}/config/config.json`, JSON.stringify(config));
		event.reply('add-path', config.reposPaths);
	});

	ipcMain.on('change-theme', (event, theme) => {
		let config = fs.readFileSync(`${__dirname}/config/config.json`, { encoding: 'utf8' });
		config = JSON.parse(config);
		config.darkTheme = (theme === null)?config.darkTheme:!config.darkTheme;
        fs.writeFileSync(`${__dirname}/config/config.json`, JSON.stringify(config));
		event.reply('change-theme', config.darkTheme);
	});

	ipcMain.on('get-theme', (event) => {
		let config = fs.readFileSync(`${__dirname}/config/config.json`, { encoding: 'utf8' });
		config = JSON.parse(config);
		event.reply('get-theme', config.darkTheme);
	});

	ipcMain.on('get-paths', (event) => {
		let config = fs.readFileSync(`${__dirname}/config/config.json`, { encoding: 'utf8' });
		config = JSON.parse(config);
		event.reply('get-paths', config.reposPaths);
	});

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../dist/index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

module.exports = createWindow;