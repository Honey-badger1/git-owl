
import React from 'react';
import { render } from 'react-dom';
import Menu from './components/Menu/Menu';
import App from './components/App/App';
import StatisticsList from './components/StatisticsList/StatisticsList';
import { HashRouter } from 'react-router-dom';

render(
	<>
		<Menu /> 
		<HashRouter>
			<StatisticsList />
		</HashRouter>
	</>, 
	document.getElementById('root')
);