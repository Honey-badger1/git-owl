import React, { useState } from 'react';
import CommonStats from '../CommonStats/CommonStats'
import StatsByTechnologies from '../StatsByTechnologies/StatsByTechnologies'
import StatsByDay from '../StatsByDay/StatsByDay'
import StatsByCommits from '../StatsByCommits/StatsByCommits'

import styles from './Statistics.module.css';

function Statistics(props) {
	const [ since, setSince ] = useState('');
	const [ until, setUntil ] = useState('');
	const [ stats, setStats ] = useState();
	const [ statsType, setStatsType ] = useState('');
	function handleChange(str, ev) {
		if (!ev.target['validity'].valid) return;
		if (str === 'since') {
			setSince(ev.target['value']);	
		} else {
			setUntil(ev.target['value']);
		}
	}

	function submitTimeInterForm(e){
		window.ipcRenderer.on('get-statistics', (event, args) => {
			setStats(args);
		});
		window.ipcRenderer.send('get-statistics', props.path, since, until);
		e.preventDefault();
	}

	return (
		<div className={styles.statisticsContainer}>
			<button className="share" title="Publsh your stats on GitOwl"><img src="../desktop-settings/img/owl-send.png"/></button> 
			<div id="path">{props.path}</div>
			<form id="timeInter" onSubmit={(e) => e.preventDefault()}>
				<input id="since" type="datetime-local" name="since" value={(since || '').toString()} onChange={(e)=> handleChange('since', e)}/>
				<input id="until" type="datetime-local" name="until" value={(until || '').toString()} onChange={(e)=> handleChange('until', e)}/>
				<button type="submit" onClick={(e) => submitTimeInterForm(e)}>Add Period</button>
				<button type="reset">Clear Period</button>
			</form>
			<div className='btn-group'>
				<button id="common" onClick={() => setStatsType(<CommonStats stats={stats || JSON.stringify(props.stats) || []} />)} className="btn btn-info shadow-none tab">Common Stats</button>
				<button id="stack" onClick={() => setStatsType(<StatsByTechnologies stats={stats || JSON.stringify(props.stats) || []} />)} className="btn btn-info shadow-none tab">Stats by Technologies</button>
				<button id="daily" onClick={() => setStatsType(<StatsByDay stats={stats || JSON.stringify(props.stats) || []} />)} className="btn btn-info shadow-none tab">Stats by Day</button>
				<button id="commetPanel" onClick={() => setStatsType(<StatsByCommits stats={stats || JSON.stringify(props.stats) || []} />)} className="btn btn-info shadow-none tab">Stats by Commits</button>
			</div>
			{statsType}
		</div>
	);
}

export default Statistics;