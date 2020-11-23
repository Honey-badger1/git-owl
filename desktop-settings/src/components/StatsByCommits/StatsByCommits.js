import React, { useState, useEffect, useContext } from 'react';
import {ThemeContext} from '../App/App.js';
import styles from './StatsByCommits.module.css';

function StatsByCommits(props) {
	const stats = JSON.parse(props.stats)[2];
	const [inputValue, setValue] = useState('');
	const [searchHeandler, setSearchHeandler] = useState(false);
	const [sortedArray, setArray] = useState([]);
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
	function searchCommits(e) {
		const arr = [];
		stats.map(item => {
			if (item.commit.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
				arr.push(item);
			}
		});
		setSearchHeandler(true);
		setArray(arr);
		e.preventDefault();
	}

    return (
		stats?<>
			<form className={styles.form} id="searchComment" onSubmit={(e) => searchCommits(e)}>
				<input  className={styles.formElement} type="search" name='commits' placeholder="Search comment" onChange={(e) => setValue(e.target['value'])}/>
				<button  className={styles.formElement} type="submit"><i className="fa fa-search" aria-hidden="true" onClick={(e) => searchCommits(e)}></i></button>
			</form>
			<div className={styles.tableContainer}>
				{searchHeandler?<table className={styles.table}>
					{sortedArray.length?
						<tr style={isActive?{backgroundColor: "darkgray"}:{backgroundColor: "gray"}}> 
							<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Author</th>
							<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Comment</th>
							<th className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>Date</th>
						</tr>:
						<p style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>No Results Found</p>}
					{sortedArray.map((item, index) =>
						(index % 2)?<tr key={index} style={isActive?{backgroundColor: theme.dark.lightColor}:{backgroundColor: theme.light.lightColor}}>
							<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.name}</td>
							<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.commit}</td>
							<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.day}</td>
						</tr>:<tr key={index} style={isActive?{backgroundColor: theme.dark.darkColor}:{backgroundColor: theme.light.darkColor}}>
							<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.name}</td>
							<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.commit}</td>
							<td className={styles.t} style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>{item.day}</td>
						</tr>
					)}
				</table>:null}
			</div>
		</>:<p style={isActive?{color: theme.dark.color}:{color: theme.light.color}}>No Results Found</p>
	);
}

export default StatsByCommits;