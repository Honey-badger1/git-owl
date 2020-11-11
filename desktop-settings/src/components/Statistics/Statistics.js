import React, { useState } from 'react';
import styles from './Statistics.module.css';
import { data } from '../../../../components/stats-pages/preload'


function Statistics(props) {
	const [ since, setSince ] = useState('');
	const [ until, setUntil ] = useState('');
	
	function handleChange(str, ev) {
		if (!ev.target['validity'].valid) return;
		const unt = ev.target['value'];
		if (str === 'since') {
			setSince(unt);	
		} else {
			setUntil(unt);
		}
		console.log(since, '---', until)
	}

	function submitTimeInterForm(e){
		data(props.path, since, until)
		e.preventDefault();
	}
    return (<>
	
	<button className="share" title="Publsh your stats on GitOwl"><img src="../desktop-settings/img/owl-send.png"/></button> 
   <div id="path">{props.path}</div>

   <form id="timeInter">
      <input id="since" type="datetime-local" name="since" value={(since || '').toString()} onChange={(e)=> handleChange('since', e)}/>
      <input id="until" type="datetime-local" name="until" value={(until || '').toString()} onChange={(e)=> handleChange('until', e)}/>
      <button type="submit" onClick={(e) => submitTimeInterForm(e)}>Add Period</button>
      <button type="reset">Clear Period</button>

   </form>

   <div className='btn-group'>

      <button id="common" className="btn btn-info shadow-none tab">Common Stats</button>
      <button id="stack" className="btn btn-info shadow-none tab">Stats by Technologies</button>
      <button id="daily" className="btn btn-info shadow-none tab">Stats by Day</button>
      <button id="commetPanel" className="btn btn-info shadow-none tab">Stats by Commits</button>

   </div>



   <form id="searchComment" className="hide">
      <input type="search" name='commits' placeholder="Search comment" />
      <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
   </form>

   <div id="statsContainer">
   </div>
      
      <div id="tableContainer">

         <div id="error" className='hide'>Error</div>


     
   </div>
	</>);
}

export default Statistics;