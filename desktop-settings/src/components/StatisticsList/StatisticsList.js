import React, { useState, useContext, useEffect } from 'react';
import styles from './StatisticsList.module.css';
import { Link, Route } from 'react-router-dom';
import Statistics from '../Statistics/Statistics';
import {ThemeContext} from '../App/App.js';


function StatisticsList(props) {
	const theme = useContext(ThemeContext);
	const [paths, setPaths] = useState([]);
	const [stats, setStats] = useState([]);
	const [currentTab, setCurrentTab] = useState('');
	const [ isActive, setISActive ] = useState();
	
	useEffect(() => {
		window.ipcRenderer.send('get-theme');
		window.ipcRenderer.send('get-paths');

		const themeListener = (event, theme) => {
			setISActive(theme);
		}
		const requestListener = (event, args) => {
			setStats(args);
		}
		const pathListener = (event, args) => {
			setPaths(args);
		}
		const listener = (event, theme) => {
			setISActive(theme);
		}
		window.ipcRenderer.once('get-theme', listener);
		window.ipcRenderer.once('get-paths', pathListener);
		window.ipcRenderer.on('change-theme', themeListener);
		window.ipcRenderer.on('last-statistics-request', requestListener);
		window.ipcRenderer.on('add-path', pathListener);
		return () => {
			window.ipcRenderer.removeListener('get-paths', pathListener);
			window.ipcRenderer.removeListener('get-theme', listener);
			window.ipcRenderer.removeListener('change-theme', themeListener);
			window.ipcRenderer.removeListener('last-statistics-request', requestListener);
			window.ipcRenderer.removeListener('add-path', pathListener);
		}
	}, [])

	function lastStatisticsRequest(e, path){
		window.ipcRenderer.send('last-statistics-request', path);
		setCurrentTab(path);
	}

	function closeTab(path) {
		window.ipcRenderer.send('close-tab', path);
	}

    return (
		<div 
			className={styles.statisticsContainer}
			style={isActive?{backgroundColor: theme.dark.lightColor}:{backgroundColor: theme.light.lightColor}}>
			<div 
				className={styles.tabsContainer}
				style={isActive?{backgroundColor: theme.dark.darkColor}:{backgroundColor: theme.light.darkColor}}>
				{paths.map((el) =>
					<div key={el}
					style={
						isActive?
						(currentTab !== el)?{backgroundColor: theme.dark.darkColor}:{backgroundColor: theme.dark.lightColor}:
						(currentTab !== el)?{backgroundColor: theme.light.darkColor}:{backgroundColor: theme.light.lightColor}
					}
					className={(currentTab !== el)?`${styles.tabs}`:`${styles.currentTab}`}>
						<Link 
						className={styles.links} to={'/' + el.replace(/\\/g, "/")} 
						onClick={(e) => lastStatisticsRequest(e, el)}
						style={isActive?{color: theme.dark.color}:{color: theme.light.color}}
					>{el.split('\\').reverse()[0]}</Link>
						<div className={styles.closeTabButton} onClick={(e) => closeTab(el)} />
					</div>
				)}
			</div>
			{paths.map((el) =>
				<Route path={'/' + el.replace(/\\/g, "/")}><Statistics path={el} stats={stats} /></Route>
			)}
		</div>
    );
}

export default StatisticsList;