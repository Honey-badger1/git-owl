import React from 'react';
import DeletionsAndAdditionsChart from '../DeletionsAndAdditionsChart/DeletionsAndAdditionsChart';
import PercentChangesChart from '../PercentChangesChart/PercentChangesChart';

function CommonStats(props) {
	const stats = JSON.parse(props.stats)[0];
    return (
		stats?<>
		<DeletionsAndAdditionsChart stats={stats}/>
		<PercentChangesChart stats={stats}/>
		<table>
			<tr> 
				<th>Name</th>
				<th>Rows Added</th>
				<th>Rows Deleted</th>
				<th>Commits</th>
				<th>%,Changes</th>
				<th>Technologies</th>
			</tr>
			{stats.map((item) =>
				<tr key={item.name}>
					<td>{item.name}</td>
					<td>{item.deletions}</td>
					<td>{item.insertions}</td>
					<td>{item.commits}</td>
					<td>{(item.percent*100).toFixed(2)}</td>
					<td>{item.byExt.map(item=> ` ${item.name}: ${(item.percent*100).toFixed(2)}% `)}</td>
				</tr>
			)}
		</table>
		</>:<p>No Results Found</p>
	);
}

export default CommonStats;