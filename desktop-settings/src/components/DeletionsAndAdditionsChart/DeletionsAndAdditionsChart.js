import React, { useState } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import 'chartist-plugin-legend';

function DeletionsAndAdditionsChart(props) {
	const labels = [];
    const series1 = [];
    const series2 = [];
	props.stats.map((item) => {
		labels.push(item.name);
        series1.push(item.deletions);
        series2.push(item.insertions);
	});
    return (
		<div  id="del-add">
			<ChartistGraph
			data={{
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
			}} 
			options={{
				fullWidth: false,
				height: (labels.length * 40 + 40) + 'px',
				seriesBarDistance: 10,
				plugins: [
					Chartist.plugins.legend()
				],
				reverseData: true,
				horizontalBars: true,
				axisY: {
					offset: 120
				}
			}}
			type={'Bar'}/>
		</div>);
}

export default DeletionsAndAdditionsChart;