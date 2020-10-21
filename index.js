    const path = require('path');
            
    const TabGroup = require("electron-tabs");
    const fs=require('fs');
    let errorMessage=document.querySelector('#error');
  

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
                
                     pathRepo.then(data => {
                      
                           if (fs.existsSync(`${data[0]}/.git`)){
                            console.log('file or directory exists');    

                            tabGroup.addTab({
                                title: data[0],
                                src: './statistics.html',
                                visible: true,
                                webviewAttributes: {
                                    nodeintegration: true
                                
                            }
                        })
                        }
                        else {
                          
                            errorMessage.classList.remove('hide');
                            errorMessage.classList.add('show')
                          
                        }
                    
               
                        
                     })

     
              })
              

             
           
     
            

            

        

      


            
                 