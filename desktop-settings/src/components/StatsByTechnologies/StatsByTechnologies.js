import React from 'react';
import TechnologiesChart from '../TechnologiesChart/TechnologiesChart'

function StatsByTechnologies(props) {
	const stats = JSON.parse(props.stats)[0];
	
    return (
		stats?stats.map(item => <TechnologiesChart stats={item} />):<p>No Results Found</p>
	);
}

export default StatsByTechnologies;