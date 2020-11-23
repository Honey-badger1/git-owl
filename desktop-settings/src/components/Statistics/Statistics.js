import React, { useEffect, useState } from 'react';
import CommonStats from '../CommonStats/CommonStats'
import StatsByTechnologies from '../StatsByTechnologies/StatsByTechnologies'
import StatsByDay from '../StatsByDay/StatsByDay'
import StatsByCommits from '../StatsByCommits/StatsByCommits'
import Preloader from '../Preloader/Preloader'
import styles from './Statistics.module.css';

function Statistics(props) {
	const [ since, setSince ] = useState('');
	const [ until, setUntil ] = useState('');
	const [ stats, setStats ] = useState();
	const [ isLoaded, setIsLoaded ] = useState(true);
	const [ statsType, setStatsType ] = useState('');
	useEffect(() => {
		const listener = (event, args) => {
			setStats(args);
			setIsLoaded(true);
		}
		window.ipcRenderer.on('get-statistics', listener);
		return () => {
			window.ipcRenderer.removeListener('get-statistics', listener);
		}
	}, []);
	function handleChange(str, ev) {
		if (!ev.target['validity'].valid) return;
		if (str === 'since') {
			setSince(ev.target['value']);	
		} else {
			setUntil(ev.target['value']);
		}
	}

	function submitTimeInterForm(e){
		setIsLoaded(false);
		window.ipcRenderer.send('get-statistics', props.path, since, until);
		e.preventDefault();
	}

	return (
		<div className={styles.statisticsContainer}>
			<div className={styles.contentContainer}>
				<form className={styles.form} id="timeInter" onSubmit={(e) => e.preventDefault()}>
					<input className={styles.formElement} id="since" type="datetime-local" name="since" value={(since || '').toString()} onChange={(e)=> handleChange('since', e)}/>
					<input className={styles.formElement} id="until" type="datetime-local" name="until" value={(until || '').toString()} onChange={(e)=> handleChange('until', e)}/>
					<button className={styles.formElement} type="submit" onClick={(e) => submitTimeInterForm(e)}>Add Period</button>
					<button className={styles.formElement} type="reset">Clear Period</button>
				</form>
				{isLoaded?<div>
					<div className={styles.btnGroup}>
						<button id="common" onClick={() => setStatsType(<CommonStats stats={stats || JSON.stringify(props.stats) || []} />)} className={styles.btn}>Common Stats</button>
						<button id="stack" onClick={() => setStatsType(<StatsByTechnologies stats={stats || JSON.stringify(props.stats) || []} />)} className={styles.btn}>Stats by Technologies</button>
						<button id="daily" onClick={() => setStatsType(<StatsByDay stats={stats || JSON.stringify(props.stats) || []} />)} className={styles.btn}>Stats by Day</button>
						<button id="commetPanel" onClick={() => setStatsType(<StatsByCommits stats={stats || JSON.stringify(props.stats) || []} />)} className={styles.btn}>Stats by Commits</button>
					</div>
					{statsType}
				</div>:<Preloader />}
			</div>
		</div>
	);
}

export default Statistics;