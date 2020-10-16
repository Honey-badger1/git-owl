window.addEventListener('DOMContentLoaded', () => {
  let button = document.querySelector("#open");
  const {
    dialog
  } = require('electron').remote;
  const gimmeStat = require('./gimme-stat');
  let table = document.createElement('table');
  let tableContainer = document.querySelector('#tableContainer');
  let timeForm = document.querySelector('#timeInter')






  const data = async (pathRepo, since, until) => {
    return await gimmeStat.json({
      cwd: pathRepo,
      since: since,
      until: until,
    }).then((answer) => {
      return answer.json;
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


  button.addEventListener('click', () => {
    tableContainer.innerHTML = '';
    let pathRepo = dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(data => data.filePaths);
    console.log(pathRepo);
    timeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      tableContainer.innerHTML = '';
      let since = timeForm.elements["since"].value;
      let until = timeForm.elements["until"].value;
      table.innerHTML = `
      <tr> 
       <th>Name</th>
      <th>Rows added</th>
      <th>Rows Deleted</th>
      <th>Commits</th>
      <th>Technologies</th>
      </tr>`;
  
      pathRepo.then(result => {
        if (result[0]) {
  
          data(result, since, until)
        }
      })
  
  
  
    })
   

  })







})