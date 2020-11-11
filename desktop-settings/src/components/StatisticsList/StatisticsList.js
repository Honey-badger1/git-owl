import React from 'react';
import styles from './StatisticsList.module.css';
import { reposPaths } from '../../../config.json'
import { Link, Route } from 'react-router-dom'
import Statistics from '../Statistics/Statistics'


function App(props) {
	console.log(reposPaths.map(el => el.replace(/\\/, "/")))
    return (
        <div className={styles.statisticsContainer}>
			<ul>
				{reposPaths.map((el, index) =>
					<li key={el}>
						<Link to={'/' + el.replace(/\\/g, "/")}>{el}</Link>
					</li>
				)}
			</ul>
			{reposPaths.map((el, index) =>
				<Route path={'/' + el.replace(/\\/g, "/")}><Statistics path={el} /></Route>
			)}
		</div>
    );
}

export default App;