const {remote, ipcRenderer} = require('electron')
const {Menu, MenuItem} = remote;

let menu = new Menu()

menu.append(new MenuItem(
  {
    label: 'Open',
    submenu: [
      {
        label: 'Open',
        click: function () {
            ipcRenderer.send('toggle-prefs')
        }
      }
    ]
  })
)

Menu.setApplicationMenu(menu)