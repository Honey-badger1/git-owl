import React from 'react';
import TechnologiesChart from '../TechnologiesChart/TechnologiesChart'

function StatsByTechnologies(props) {
	const stats = JSON.parse(props.stats)[0];
    return (
		stats.map(item => <TechnologiesChart stats={item} />)
	);
}

export default StatsByTechnologies;