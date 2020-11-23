
import React, { createContext } from 'react';
import Menu from '../Menu/Menu';
import StatisticsList from '../StatisticsList/StatisticsList';
import { HashRouter } from 'react-router-dom';

export const ThemeContext = createContext();
function App () {
	const context = {
		dark: {
			darkColor: "#161616",
			lightColor: "#1c1c1c",
			color: "white"
		},
		light: {
			darkColor: "lightgray",
			lightColor: "white",
			color: "black"
		},
	}
	return (
		<ThemeContext.Provider value={context}>
			<Menu /> 
			<HashRouter>
				<StatisticsList />
			</HashRouter>
		</ThemeContext.Provider>
	);
}

export default App;