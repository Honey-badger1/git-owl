import React, { useState } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import 'chartist-plugin-legend';

function PercentChangesChart(props) {
	const labels = [];
    const series = [];
	props.stats.map((item) => {
		labels.push(item.name);
        series.push((item.percent * 100).toFixed(2));
	});
    return (
		<div  id="percentChanges">
			<ChartistGraph
			data={{
			    labels,
			    series: [{
			        "name": "%, Changes",
			        "data": series
			      }]
			}} 
			options={{
				fullWidth: false,
				height: (labels.length * 40 + 40) + 'px',
				seriesBarDistance: 10,
				plugins: [
					Chartist.plugins.legend()
				],
				reverseData: true,
				axisY: {
					offset: 120
				},
				horizontalBars: true,
			}}
			type={'Bar'}/>
		</div>);
}

export default PercentChangesChart;