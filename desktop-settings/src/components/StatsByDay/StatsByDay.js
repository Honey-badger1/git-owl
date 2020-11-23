import React, { useContext, useEffect, useState } from 'react';
import LineChart from '../LineChart/LineChart';
import {ThemeContext} from '../App/App.js';
import styles from './StatsByDay.module.css';

function StatsByDay(props) {
	const stats = JSON.parse(props.stats)[1];
	const theme = useContext(ThemeContext);
	const [ isActive, setISActive ] = useState();
	
	useEffect(() => {
		window.ipcRenderer.send('get-theme');
		const listener = (event, theme) => {
			setISActive(theme);
		}
		window.ipcRenderer.on('get-theme', listener);
		return () => {
			window.ipcRenderer.removeListener('get-theme', listener);
		}
	}, []);
    return (
		stats?<div className={styles.tableContainer}>
		<LineChart stats={stats} />
			<table className={styles.table}>
			<tr style={isActive?{backgroundColor: "darkgray"}:{backgroundColor: "gray"}}> 
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Date</th>
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Rows Added</th>
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Rows Deleted</th>
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Commits</th>
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Changes</th>
			</tr>
			{stats.map((item, index) =>
				(index % 2)?<tr key={index} style={isActive?{backgroundColor: theme.dark.lightColor}:{backgroundColor: theme.light.lightColor}}>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.date}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.deletions}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.insertions}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.commits}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.changed}</td>
				</tr>:<tr key={index} style={isActive?{backgroundColor: theme.dark.darkColor}:{backgroundColor: theme.light.darkColor}}>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.date}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.deletions}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.insertions}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.commits}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.changed}</td>
				</tr>
			)}
		</table>
		</div>:<p style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>No Results Found</p>
	);
}

export default StatsByDay;