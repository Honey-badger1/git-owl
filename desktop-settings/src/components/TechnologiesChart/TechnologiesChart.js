import React, { useState } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import 'chartist-plugin-legend';

function TechnologiesChart(props) {
	const stackLabels = [props.stats.name];
    const stackSeries = [(props.stats.percent * 100).toFixed(2)];

	props.stats.byExt.map(item => {
		stackLabels.push(item.name);
		stackSeries.push((item.percent * 100).toFixed(2));
	});

    return (
		<div  id={`${props.stats.name.replace(/\s/g, '')}`}>
			<ChartistGraph
			data={{
				labels: stackLabels,
				series: [stackSeries]
			  }} 
			options={{
				height: (stackLabels.length * 40 + 40) + 'px',
				seriesBarDistance: 10,
				reverseData: true,
				horizontalBars: true,
				axisY: {
				  offset: 120
				}
			  }}
			type={'Bar'}/>
		</div>);
}

export default TechnologiesChart;