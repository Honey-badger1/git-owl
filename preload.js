window.addEventListener('DOMContentLoaded', () => {


  const gimmeStat = require('./gimme-stat');
  let table = document.createElement('table');
  let tableContainer = document.querySelector('#tableContainer');
  let timeForm = document.querySelector('#timeInter');
  let dailyButton = document.querySelector('#daily');
  let daily = false
  let commentForm = document.querySelector('#searchComment');

  directory = document.getElementById('path');


  dailyButton.addEventListener('click', () => {
    daily = true
  })

  const searchComment = async (pathRepo) => {
    return await gimmeStat.json({
      cwd: pathRepo,
      prepull: false
    }).then((answer) => {
      return answer.json[2];
    })


  }

  const dataDaily = async (pathRepo, since, until) => {
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

      tableContainer.append(table)
    })


  };



  const data = async (pathRepo, since, until) => {
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

      tableContainer.append(table)
    })


  };

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

      tableContainer.append(table)
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



})