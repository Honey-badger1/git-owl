import React, { useState, useEffect, useContext } from 'react';
import DeletionsAndAdditionsChart from '../DeletionsAndAdditionsChart/DeletionsAndAdditionsChart';
import PercentChangesChart from '../PercentChangesChart/PercentChangesChart';
import styles from './CommonStats.module.css';
import {ThemeContext} from '../App/App.js';

function CommonStats(props) {
	const stats = JSON.parse(props.stats)[0];
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
		<DeletionsAndAdditionsChart stats={stats}/>
		<PercentChangesChart stats={stats}/>
		<table className={styles.table}>
			<tr style={isActive?{backgroundColor: "darkgray"}:{backgroundColor: "gray"}}> 
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Name</th>
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Rows Added</th>
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Rows Deleted</th>
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Commits</th>
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>%,Changes</th>
				<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Technologies</th>
			</tr>
			{stats.map((item, index) =>
				(index % 2)?<tr key={index} style={isActive?{backgroundColor: theme.dark.lightColor}:{backgroundColor: theme.light.lightColor}}>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.name}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.deletions}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.insertions}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.commits}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{(item.percent*100).toFixed(2)}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.byExt.map(item=> ` ${item.name}: ${(item.percent*100).toFixed(2)}% `)}</td>
				</tr>:<tr key={index} style={isActive?{backgroundColor: theme.dark.darkColor}:{backgroundColor: theme.light.darkColor}}>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.name}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.deletions}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.insertions}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.commits}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{(item.percent*100).toFixed(2)}</td>
					<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.byExt.map(item=> ` ${item.name}: ${(item.percent*100).toFixed(2)}% `)}</td>
				</tr>
			)}
		</table>
		</div>:<p style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>No Results Found</p>
	);
}

export default CommonStats;