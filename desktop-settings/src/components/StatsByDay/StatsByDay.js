import React from 'react';
import LineChart from '../LineChart/LineChart'


function StatsByDay(props) {
    const stats = JSON.parse(props.stats)[1];
    return (
		stats?<>
		<LineChart stats={stats} />
			<table>
			<tr> 
				<th>Date</th>
				<th>Rows Added</th>
				<th>Rows Deleted</th>
				<th>Commits</th>
				<th>Changes</th>
			</tr>
			{stats.map((item) =>
				<tr key={item.name}>
					<td>{item.date}</td>
					<td>{item.deletions}</td>
					<td>{item.insertions}</td>
					<td>{item.commits}</td>
					<td>{item.changed}</td>
				</tr>
			)}
		</table>
		</>:<p>No Results Found</p>
	);
}

export default StatsByDay;