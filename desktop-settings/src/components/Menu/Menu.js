import React, { useState, useContext, useEffect } from 'react';
import styles from './Menu.module.css';
import Settings from '../Settings/Settings';

import {ThemeContext} from '../App/App.js';

function Menu(props) {
	const theme = useContext(ThemeContext);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [ isActive, setISActive ] = useState();
	
	useEffect(() => {
		window.ipcRenderer.send('get-theme');
		const listener = (event, theme) => {
			setISActive(theme);
		}
		const themeListener = (event, theme) => {
			setISActive(theme);
		}
		window.ipcRenderer.once('get-theme', themeListener);
		window.ipcRenderer.on('change-theme', listener);
		return () => {
			window.ipcRenderer.removeListener('get-theme', themeListener);
			window.ipcRenderer.removeListener('change-theme', listener);
		}
	}, []);

	function chooseDirectory() {
		window.ipcRenderer.send('choose-directory');
	}
	return (<>
		<div className={styles.menuContainer} style={isActive?{backgroundColor: theme.dark.darkColor}:{backgroundColor: theme.light.darkColor}}>
			<div 
				className={`${styles.buttonContainer}`} 
				style={isActive?{backgroundColor: theme.dark.lightColor, color: theme.dark.color}:{backgroundColor: theme.light.lightColor, color: theme.light.color}}
			>
				<div id="open" onClick={(e) => {chooseDirectory(e)}}>O</div>
			</div>
			<div 
				className={`${styles.buttonContainer}`} 
				style={isActive?{backgroundColor: theme.dark.lightColor, color: theme.dark.color}:{backgroundColor: theme.light.lightColor, color: theme.light.color}}
			>
				<div id="settings" onClick={(e) => {
					setIsSettingsOpen(value => !value)
					isSettingsOpen?window.ipcRenderer.send('get-theme'):null;
				}}>S</div>
			</div>
		</div>
		{isSettingsOpen?<Settings />:null}
    </>);
}

export default Menu;