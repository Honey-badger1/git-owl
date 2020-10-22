window.addEventListener('DOMContentLoaded', () => {


  const gimmeStat = require('../../backend/gimme-stat');
  let table = document.createElement('table');
  let tableContainer = document.querySelector('#tableContainer');
  let timeForm = document.querySelector('#timeInter');
  let commonStats=document.querySelector('#common');
  let dailyButton = document.querySelector('#daily');
  let errorMessage=document.querySelector('#error');
  let daily = false;
  let showCommentForm=document.querySelector("#commetPanel")
  let commentForm = document.querySelector('#searchComment');
  let spinner=document.createElement('div');
  spinner.innerHTML=`<div class="loadingio-spinner-rolling-98ckucmfro7"><div class="ldio-pokvddfwzc">
  <div></div>
  </div></div>`;


  showCommentForm.addEventListener('click', ()=>{
    tableContainer.innerHTML = '';
    commentForm.classList.remove('hide');
    commentForm.classList.add('show');
  })

  dailyButton.addEventListener('click', () => {
    commentForm.classList.remove('show');
    commentForm.classList.add('hide');
    daily = true;
    tableContainer.innerHTML = '';
    tableContainer.append(spinner);
    let pathDir = localStorage.getItem('pathF');
    table.innerHTML = `
    <tr> 
     <th>Date</th>
    <th>Rows Added</th>
    <th>Rows Deleted</th>
    <th>Commits</th>
    <th>Changes</th>
    </tr>`;
    



     dataDaily([pathDir]);
    
  })

  const searchComment = async (pathRepo) => {
    tableContainer.append(spinner);
    return await gimmeStat.json({
      cwd: pathRepo,
      prepull: false
    }).then((answer) => {
      return answer.json[2];
    })


  }

  const dataDaily = async (pathRepo, since, until) => {
    tableContainer.append(spinner);
    return await gimmeStat.json({
      cwd: pathRepo,
      since: since,
      until: until,
      prepull: false
    }).then((answer) => {
      return answer.json[1];
    }).
    then(answer => answer.map(item => {
      let trd = document.createElement('tr')
      trd.innerHTML = `<td>${item.date}</td>
                  <td>${item.deletions}</td>
                 <td>${item.insertions}</td>
                 <td>${item.commits}</td>
                 <td>${item.changed}</td>`
      table.append(trd);

    })).
    then(answer => {
      console.log(answer);
      spinner.remove();
      tableContainer.append(table);
    }).catch(
      errorMessage.classList.remove('hide')
      )


  };



  const data = async (pathRepo, since, until) => {
    tableContainer.append(spinner);
    return await gimmeStat.json({
      cwd: pathRepo,
      since: since,
      until: until,
      prepull: false
    }).then((answer) => {
      return answer.json[0];
    }).
    then(answer => answer.map(item => {




      let trd = document.createElement('tr')
      trd.innerHTML = `<td>${item.name}</td>
                  <td>${item.deletions}</td>
                 <td>${item.insertions}</td>
                 <td>${item.commits}</td>
                 <td>${item.byExt.map(item=> `${item.name}: ${(item.percent*100).toFixed(2)}% `)}</td>`
      table.append(trd);

    })).
    then(answer => {
      console.log(answer);
      tableContainer.append(table);
     spinner.remove();
      
    })


  };


     
  commonStats.addEventListener('click',()=>{
    commentForm.classList.remove('show');
    commentForm.classList.add('hide');
    daily=false;
    tableContainer.innerHTML = '';
    let pathDir = localStorage.getItem('pathF');
    
    table.innerHTML = `
      <tr> 
       <th>Name</th>
      <th>Rows Added</th>
      <th>Rows Deleted</th>
      <th>Commits</th>
      <th>Technologies</th>
      </tr>`;



      data([pathDir])

  })


  commentForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    tableContainer.innerHTML = '';
    let pathDir = localStorage.getItem('pathF');
    let commit = commentForm.elements["commits"].value;
    table.innerHTML = `
      <tr> 
       <th>Author</th>
      <th>Comment</th>
      <th>Date</th>
      <tr> `
    searchComment([pathDir]).
    then(answer => answer.map(item => {

      if(item.commit.toLowerCase().indexOf(commit.toLowerCase())!==-1){
      let trd = document.createElement('tr')
      trd.innerHTML = `<td>${item.name}</td>
                    <td>${item.commit}</td>
                    <td>${item.day}</td>`
      table.append(trd);
    }
    })).
    then(answer => {
      console.log(answer);
      spinner.remove();
      tableContainer.append(table);
    })

  })



  timeForm.addEventListener('submit', (e) => {
    let pathDir = localStorage.getItem('pathF');
    e.preventDefault();
    tableContainer.innerHTML = '';
    let since = timeForm.elements["since"].value;
    let until = timeForm.elements["until"].value;
    if (!daily) {
      table.innerHTML = `
      <tr> 
       <th>Name</th>
      <th>Rows Added</th>
      <th>Rows Deleted</th>
      <th>Commits</th>
      <th>Technologies</th>
      </tr>`;



      data([pathDir], since, until);


    } else {
      table.innerHTML = `
     <tr> 
      <th>Date</th>
     <th>Rows Added</th>
     <th>Rows Deleted</th>
     <th>Commits</th>
     <th>Changes</th>
     </tr>`;



      dataDaily([pathDir], since, until)

    }
  })

// Stats by stack
 let stackButton=document.querySelector("#stack");
 let chart=document.createElement('div');
 chart.innerHTML=`<div id="chart_div"></div>`
stackButton.addEventListener('click',()=>{
  let pathDir = localStorage.getItem('pathF');
  tableContainer.innerHTML = '';
  dataStack([pathDir]);

})


})