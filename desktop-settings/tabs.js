    const path = require("path");
    const TabGroup = require("electron-tabs");
    const fs = require('fs');
    const dragula = require("dragula");
    const {remote, ipcRenderer} = require('electron')
    const {Menu, MenuItem} = remote;
    let setMain=document.querySelector('#mainSettings')

    const hide=(elem)=>{
        elem.classList.remove('show')
        elem.classList.add('hide');

    }
    
    const show=(elem)=>{
        elem.classList.remove('hide')
        elem.classList.add('show');

    }
    let errorMessage = document.querySelector('#error');

    let views=document.querySelector('#views');
    
    

    let tabGroup = new TabGroup({
        ready: function (tabGroup) {
          dragula([tabGroup.tabContainer], {
            direction: "horizontal"
          });
        }
      });

    tabGroup.on("tab-active", (tab) => {
        let a = tab.getTitle();
        console.log(a);

        localStorage.setItem("pathF", a);
        if(localStorage.getItem("pathF")=='Main'){
          hide(views);
          show(setMain);        
            
        }else{
           show(views);
           hide(setMain);
        }
    })

    let tab1 = tabGroup.addTab({


        title: 'Main',
        src: './menu.html',
        visible: true,
        webviewAttributes: {
            nodeintegration: true

        }
    })
    
    tab1.activate();



    let openBtnClick=()=>{
        let pathRepo = dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(data => data.filePaths);
        console.log(pathRepo);

        pathRepo.then(data => {

            if (fs.existsSync(`${data[0]}/.git`)) {
                console.log('file or directory exists');

                tabGroup.addTab({
                    title: data[0],
                    src: '../components/stats-pages/statistics.html',
                    visible: true,
                    webviewAttributes: {
                        nodeintegration: true

                    }
                })
            } 
        })
     }
        let button = document.querySelector("#open");
    const {
        dialog
    } = require('electron').remote;

    
    button.addEventListener('click', openBtnClick)

    
    let menu = new Menu()
    
    menu.append(new MenuItem(
      {
        label: 'File',
        submenu: [
          {
            label: 'Open',
            click: openBtnClick,
    
            
          }
        ]
      })
    );
    Menu.setApplicationMenu(menu);


let openTab=document.querySelector('#openTab');
openTab.addEventListener('click', openBtnClick)
    

    