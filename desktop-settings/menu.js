


let menu = new Menu()

menu.append(new MenuItem(
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click: function () {
            ipcRenderer.send('toggle-prefs')
                    },

        
      }
    ]
  })
);




Menu.setApplicationMenu(menu)


  