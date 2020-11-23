import React, { useState } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import 'chartist-plugin-legend';

function LineChart(props) {
	const labelDate = [];
	const seriesChanged = [];
	const nl = [];
	const newSeries = [];

	props.stats.map(item => {
		labelDate.push(item.date.slice(4, ));
		seriesChanged.push(item.changed);
	});

	if (labelDate.length > 15) {
		let step = Math.round((labelDate.length / 15));
		for (let i = 0; i <= labelDate.length; i += step) {
			nl.push(labelDate[i]);
			newSeries.push(seriesChanged[i]);
		}
	}

    return (
		<div  id="lineChart">
			<ChartistGraph
			data={{
	            labels: nl.length?nl:labelDate,
	            series:  [{
	              "name": "Changes",
	              "data": newSeries.length?newSeries:seriesChanged
	            }]}} 
			options={{
				height: 400,
	            plugins: [
	              Chartist.plugins.legend()
	            ],
	            axisX: {
	              offset: 100
	            }
	          }}
			type={'Line'}/>
		</div>);
}

export default LineChart;