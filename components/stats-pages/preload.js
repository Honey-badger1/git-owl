window.addEventListener('DOMContentLoaded', () => {
  const gimmeStat = require('../../backend/gimme-stat');
  const fs = require('fs');
  let table = document.createElement('table');
  let tableContainer = document.querySelector('#tableContainer');
  let statsContainer = document.querySelector('#statsContainer');
  let spinner = document.createElement('div');
  require('chartist-plugin-legend');
  let pathDir = ''
  spinner.innerHTML = `<div class="loadingio-spinner-rolling-98ckucmfro7"><div class="ldio-pokvddfwzc">
  <div></div>
  </div></div>`;
  let Chartist = require('chartist');
  let since='';
  let until='';

  let preLoad = () => {
    statsContainer.innerHTML = '';
    tableContainer.innerHTML = '';
    pathDir = localStorage.getItem('pathF');
    commentForm.classList.remove('show');
    commentForm.classList.add('hide');
    tableContainer.append(spinner);
  }


  // Common stats

  let commonStats = document.querySelector('#common');

  const data = async (pathRepo, since, until) => {
    let labels = [];
    let series1 = [];
    let series2 = [];
    let series3 = [];

    return await gimmeStat.json({
      cwd: pathRepo,
      since: since,
      until: until,
      prepull: false
    }).then((answer) => {
      return answer.json[0];
    }).
    then(answer => answer.map(item => {
        let delAddChart = document.createElement('div');
        delAddChart.innerHTML = `<div class="ct-chart" id="del-add"></div> `
        statsContainer.prepend(delAddChart);

        let percentChart = document.createElement('div');
        percentChart.innerHTML = `
          <div class="ct-chart" id="percentChanges"></div> `
        statsContainer.prepend(percentChart);

        let trd = document.createElement('tr')
        trd.innerHTML = `<td>${item.name}</td>
                  <td>${item.deletions}</td>
                 <td>${item.insertions}</td>
                 <td>${item.commits}</td>
                 <td>${(item.percent*100).toFixed(2)}</td>
                 <td>${item.byExt.map(item=> ` ${item.name}: ${(item.percent*100).toFixed(2)}% `)}</td>`
        table.append(trd);

        labels.push(item.name);
        series1.push(item.deletions);
        series2.push(item.insertions);
        series3.push((item.percent * 100).toFixed(2));

      }))
      .
    then(answer => {
      tableContainer.append(table);
      spinner.remove()
    }).then(answer => {

      let ll = labels.length;

      new Chartist.Bar('#del-add', {
        labels,
        series: [{
            "name": "Deletions",
            "data": series1
          },
          {
            "name": "Additions",
            "data": series2
          }
        ]
      }, {
        fullWidth: false,
        height: (ll * 40 + 40) + 'px',
        seriesBarDistance: 10,
        plugins: [
          Chartist.plugins.legend()
        ],
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 120
        }
      });

      new Chartist.Bar('#percentChanges', {
        labels,
        series: [{
          "name": "%, Changes",
          "data": series3
        }]
      }, {
        fullWidth: false,
        height: (ll * 40 + 40) + 'px',
        seriesBarDistance: 10,
        plugins: [
          Chartist.plugins.legend()
        ],
        reverseData: true,
        axisY: {
          offset: 120
        },
        horizontalBars: true,

      })

    }).catch(answer => {
      tableContainer.innerHTML = "No Results Found"
    })


  };

  commonStats.addEventListener('click', () => {
    daily = false;
    preLoad();

    table.innerHTML = `
      <tr> 
       <th>Name</th>
      <th>Rows Added</th>
      <th>Rows Deleted</th>
      <th>Commits</th>
      <th>%,Changes</th>
      <th>Technologies</th>
      </tr>`;

    data([pathDir], since, until)

  })

  //Daily Stats


  let dailyButton = document.querySelector('#daily');
  let daily = false;

  const dataDaily = async (pathRepo, since, until) => {
    let labelDate = [];
    let seriesChanged = [];
    let dailyChart = document.createElement('div');
    dailyChart.innerHTML = `
        <div class="ct-chart" id="lineChart"></div>`
    statsContainer.prepend(dailyChart);

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
      labelDate.push(item.date.slice(4, ));
      seriesChanged.push(item.changed);

    })).
    then(answer => {
        tableContainer.append(table);
        spinner.remove()
      }).then(answer => {
        if (labelDate.length > 15) {
          let nl = [];
          let newSeries = [];
          let step = Math.round((labelDate.length / 15));
          for (let i = 0; i <= labelDate.length; i += step) {
            nl.push(labelDate[i]);
            newSeries.push(seriesChanged[i])
          }
          new Chartist.Line('#lineChart', {
            labels: nl,
            series:  [{
              "name": "Changes",
              "data": newSeries
            }]}, {
            height: 400,
            axisX: {
              offset: 100
            },
            plugins: [
              Chartist.plugins.legend()
            ],
          })
        } else {
          new Chartist.Line('#lineChart', {
            labels: labelDate,
            series: [{
              "name": "Changes",
              "data": seriesChanged
            }]
          }, {
            height: 400,
            plugins: [
              Chartist.plugins.legend()
            ],
            axisX: {
              offset: 100
            }
          })
        }
      })
      .catch(answer => {
        tableContainer.innerHTML = "No results Found"
      })
  };
  dailyButton.addEventListener('click', () => {
    preLoad();
    daily = true;

    table.innerHTML = `
  <tr> 
   <th>Date</th>
  <th>Rows Added</th>
  <th>Rows Deleted</th>
  <th>Commits</th>
  <th>Changes</th>
  </tr>`;
    dataDaily([pathDir], since, until);

  });


  //Comments Stats

  let showCommentForm = document.querySelector("#commetPanel");
  let commentForm = document.querySelector('#searchComment');

  const searchComment = async (pathRepo,since,until) => {
    tableContainer.append(spinner);
    return await gimmeStat.json({
      cwd: pathRepo,
      since: since,
      until: until,
      prepull: false
    }).then((answer) => {
      return answer.json[2];
    })

  }

  showCommentForm.addEventListener('click', () => {
    statsContainer.innerHTML = '';
    tableContainer.innerHTML = '';
    commentForm.classList.remove('hide');
    commentForm.classList.add('show');
  })

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    tableContainer.innerHTML = '';
    let checklenArr = [];
    let pathDir = localStorage.getItem('pathF');
    let commit = commentForm.elements["commits"].value;
    table.innerHTML = `
    <tr> 
     <th>Author</th>
    <th>Comment</th>
    <th>Date</th>
    <tr> `
    searchComment([pathDir],since,until).
    then(answer => answer.map(item => {

      if (item.commit.toLowerCase().indexOf(commit.toLowerCase()) !== -1) {
        let trd = document.createElement('tr')
        trd.innerHTML = `<td>${item.name}</td>
                  <td>${item.commit}</td>
                  <td>${item.day}</td>`
        table.append(trd);
        checklenArr.push(item.name)
      }
    })).
    then(answer => {
      spinner.remove();
      if (checklenArr.length === 0) {
        tableContainer.innerHTML = "No Results Found"
      } else {
        tableContainer.append(table);
      }
    })

  })


  //Tme Interval


  let timeForm = document.querySelector('#timeInter');

  timeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    since = timeForm.elements["since"].value;
    until = timeForm.elements["until"].value;
    
  })
  timeForm.addEventListener('reset', () => {
    since = '';
    until = '';
    
  })


  // Stats by stack

  let stackButton = document.querySelector("#stack");

  dataStack = async (pathRepo, since, until) => {
    let stackLabels = [];
    let stackSeries = [];
    return await gimmeStat.json({
      cwd: pathRepo,
      since: since,
      until: until,
      prepull: false
    }).then((answer) => {
      return answer.json[0];
    }).
    then(answer => answer.map(item => {

      stackLabels = [];
      stackSeries = [];
      stackLabels.push(item.name);
      stackSeries.push((item.percent * 100).toFixed(2));

      item.byExt.map(item => {

        stackLabels.push(item.name)
        stackSeries.push((item.percent * 100).toFixed(2))
      });

      let charted = async (name) => {
        let stackChartContainer = document.createElement('div');
        stackChartContainer.innerHTML += `<div class="ct-chart" id=${name.replace(/\s/g, '')}></div>`
        tableContainer.append(stackChartContainer);
        let ll = stackLabels.length;

        await new Chartist.Bar(`#${name.replace(/\s/g, '')}`, {

          labels: stackLabels,
          series: [stackSeries]
        }, {
          height: (ll * 40 + 40) + 'px',
          seriesBarDistance: 10,
          reverseData: true,
          horizontalBars: true,
          axisY: {
            offset: 120
          }
        })
      }
      charted(item.name);
    })).then(answer => {
      spinner.remove();

    })
  }

  stackButton.addEventListener('click', () => {
    preLoad();
    dataStack([pathDir],since,until);

  })


  //Publish

let publishBtn=document.querySelector('.share');

const path = require('path');

let baseDir = path.join(__dirname, '/../../gitOwlStats/');
publishBtn.addEventListener('click', ()=>{
 pathDir=localStorage.getItem('pathF');
 let fileName=pathDir.slice((pathDir.lastIndexOf('\\')+1),).replace(/-/gi,'')
 const dataPub = async (path,since,until) => {
  return await gimmeStat.json({
    cwd: path,
    since: since,
    until:until,
   
  }).then(answer=>answer.json.pop())
  .then(answer=> fs.writeFileSync(`${baseDir}${fileName}`, JSON.stringify(answer)))
}
dataPub([pathDir]);

})

})

