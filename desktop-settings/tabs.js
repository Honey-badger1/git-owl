    const path = require("path");
    const TabGroup = require("electron-tabs");
    const fs = require('fs');
    const dragula = require("dragula");
    let setMain=document.querySelector('#mainSettings');
    let setContent=document.querySelector('#settings');

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
          hide(setMain);
           show(views);
           
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
                    src: '../asset/stats-pages/statistics.html',
                    visible: true,
                    webviewAttributes: {
                        nodeintegration: true

                    }
                });
                setContent.style.display='none'; 
            } 
            else if (fs.existsSync(`${data[0]}`)) {
              errorMessage.style.backgroundColor=localStorage.getItem('alColor')
              show(errorMessage)
              setTimeout(function(){hide(errorMessage)},3000)
              
            }
        })
     }
        let button = document.querySelector("#open");
    const {
        dialog
    } = require('electron').remote;

    
    button.addEventListener('click', openBtnClick)


   


let openTab=document.querySelector('#openTab');
openTab.addEventListener('click', openBtnClick)
module.exports=openBtnClick;

    