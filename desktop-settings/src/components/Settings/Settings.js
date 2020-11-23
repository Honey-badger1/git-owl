import React, { useContext, useEffect, useState } from 'react';
import styles from './Settings.module.css';
import {ThemeContext} from '../App/App';

function Settings(props) {
	const [ isActive, setISActive ] = useState();
	const theme = useContext(ThemeContext);
	
	useEffect(() => {
		window.ipcRenderer.send('get-theme');
		const listener = (event, theme) => {
			setISActive(theme);
		}
		window.ipcRenderer.on('get-theme', listener);
		window.ipcRenderer.on('change-theme', listener);
		
		return () => {
			window.ipcRenderer.removeListener('get-theme', listener);
			window.ipcRenderer.removeListener('change-theme', listener);
		}
	});

	function changeTheme() {
		window.ipcRenderer.send('change-theme', isActive);
	}

	return (
		<div className={styles.settings} style={isActive?{backgroundColor: theme.dark.darkColor}:{backgroundColor: theme.light.darkColor}}>
			<p>Dark Theme</p>
			<div className={styles.toggle}>
				<div className={isActive?styles.activeToggleButton:styles.toggleButton} onClick={(e) => changeTheme()}>
				</div>
			</div>
		</div>
    );
}

export default Settings;