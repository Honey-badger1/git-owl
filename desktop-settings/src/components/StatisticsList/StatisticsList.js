import React, { useState} from 'react';
import styles from './StatisticsList.module.css';
import { reposPaths } from '../../../config/config.json'
import { Link, Route } from 'react-router-dom'
import Statistics from '../Statistics/Statistics'


function StatisticsList(props) {
	const [paths, setPaths] = useState([]);
	const [stats, setStats] = useState([]);
	const [currentTab, setCurrentTab] = useState('');

	function lastStatisticsRequest(e, path){
		window.ipcRenderer.on('last-statistics-request', (event, args) => {
			setStats(args);
		});
		window.ipcRenderer.send('last-statistics-request', path);
		setCurrentTab(path);
	}

	window.ipcRenderer.on('add-path', (event, args) => {
		setPaths(args);
	});

	function closeTab(path) {
		window.ipcRenderer.send('close-tab', path);
	}

	const checkPaths = () => (paths && paths.length)?paths:reposPaths;
    return (
        <div className={styles.statisticsContainer}>
			<div className={styles.tabsContainer}>
				{checkPaths().map((el) =>
					<div className={(currentTab !== el)?`${styles.tabs}`:`${styles.currentTab}`} key={el}>
						<Link className={styles.links} to={'/' + el.replace(/\\/g, "/")} onClick={(e) => lastStatisticsRequest(e, el)}>{el.split('\\').reverse()[0]}</Link>
						<div className={styles.closeTabButton} onClick={(e) => closeTab(el)}></div>
					</div>
				)}
			</div>
			{checkPaths().map((el) =>
				<Route path={'/' + el.replace(/\\/g, "/")}><Statistics path={el} stats={stats} /></Route>
			)}
		</div>
    );
}

export default StatisticsList;