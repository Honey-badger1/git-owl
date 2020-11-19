let setBtn=document.querySelector('#sets');
let setContent=document.querySelector('#settings');
setContent.style.display='none';
let body=document.querySelector('body');
let day=document.querySelector('#day');
let night=document.querySelector('#night');
let redAlert=document.querySelector('#red');
let blackAlert=document.querySelector('#black');


setBtn.addEventListener('click', ()=>{
    setContent.style.display='block';

    
})

document.body.addEventListener('change', function (e) {
    let target = e.target;
    
    switch (target.id) {
        case 'night':
            localStorage.setItem('theme', 'night');
            body.style.backgroundColor='rgba(1, 1, 32, 0.7)'
            break;
        case 'day':
            localStorage.setItem('theme', 'day')
            body.style.backgroundColor='rgba(36, 126, 201, 0.7)'
            break;
    }
   
});
document.body.addEventListener('change', function (e) {
    let target = e.target;
    
    switch (target.id) {
        case 'black':
            localStorage.setItem('alColor', 'black')
            break;
        case 'red':
            localStorage.setItem('alColor', 'red')
            break;
    }
   
});