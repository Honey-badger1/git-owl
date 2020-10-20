
    const path = require('path');
            
    const TabGroup = require("electron-tabs");

  

    let tabGroup = new TabGroup();

    tabGroup.on("tab-active", (tab) => { let a=tab.getTitle();
        console.log(a);
        
        localStorage.setItem( "pathF",a)
    })
  
    let tab1 = tabGroup.addTab({
  
                 
        title: 'Main',
        src: './menu.html',
        visible: true,
        webviewAttributes: {
            nodeintegration: true
        
    }
         })
  
        
                 let button = document.querySelector("#open");
                 const {
                     dialog
                 } = require('electron').remote;
     
                ;
                 button.addEventListener('click', () => {
                   
                     let pathRepo = dialog.showOpenDialog({
                         properties: ['openDirectory']
                     }).then(data => data.filePaths);
                     console.log(pathRepo);
                    
                     
                     const gimmeStat = require('./gimme-stat');
                     console.log(gimmeStat.json({}));
                    
                     
     
                     pathRepo.then(data => {
                    
                         tabGroup.addTab({
     
                              
                                 title: data[0],
                                 src: './statistics.html',
                                 visible: true,
                                 webviewAttributes: {
                                     nodeintegration: true
                                 
                             }
                         });
                         
               
                        
                     })

     
              })
              

             
           
     
            

            

        

      


            
                 