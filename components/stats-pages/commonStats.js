function allStats(table, spinner,tableContainer, commonStats, barDelAdd, commentForm){
    // Common stats
 const gimmeStat = require('../../backend/gimme-stat');

 require('chartist-plugin-legend');

 
 let Chartist=require('chartist');

  const data = async (pathRepo, since, until) => {
    tableContainer.append(spinner);
    let labels=[];
    let series1=[];
    let series2=[]; 
    let series3=[];
    
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
                 <td>${(item.percent*100).toFixed(2)}</td>
                 <td>${item.byExt.map(item=> `${item.name}: ${(item.percent*100).toFixed(2)}% `)}</td>`
      table.append(trd);
          
     labels.push(item.name);
     series1.push(item.deletions);
     series2.push(item.insertions);  
     series3.push((item.percent*100).toFixed(2));   

    }))
 .
    then(answer => {
      console.log(answer);
      tableContainer.append(table);
     spinner.remove();
      
    }) .then(answer=>{
    
      var ll = labels.length
       

      new Chartist.Bar('#del-add', {
        labels,
        series: [
          { "name": "Deletions", "data": series1},
          { "name": "Additions", "data": series2}
        ]
      },  {
        fullWidth: false,
        height: (ll*40+40)+'px',
        seriesBarDistance: 10,
        plugins: [
          Chartist.plugins.legend()
      ],
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 70
        }
      });

      new Chartist.Bar('#percentChanges', {
        labels,
        series: [
          { "name": "%, Changes", "data": series3}
        ]
      },  {
        fullWidth: false,
        height: (ll*40+40)+'px',
        seriesBarDistance: 10,
        plugins: [
          Chartist.plugins.legend()
      ],
        reverseData: true,
        horizontalBars: true,
     
      })
      barDelAdd.classList.remove('hide');
    barDelAdd.classList.add('show');
    }).catch(answer=>{
      tableContainer.innerHTML="No Results Found"}
    ).finally( spinner.remove());
    
  

  };


  commonStats.addEventListener('click',()=>{
    commentForm.classList.remove('show');
    commentForm.classList.add('hide');
    tableContainer.innerHTML = '';
    let pathDir = localStorage.getItem('pathF');
    
    table.innerHTML = `
      <tr> 
       <th>Name</th>
      <th>Rows Added</th>
      <th>Rows Deleted</th>
      <th>Commits</th>
      <th>%,Changes</th>
      <th>Technologies</th>
      </tr>`;



      data([pathDir]);

  })

}

 export default allStats;