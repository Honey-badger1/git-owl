import { ipcRenderer } from 'electron';
import React from 'react';
import styles from './Menu.module.css';

function Menu(props) {

	function chooseDirectory() {
		ipcRenderer.send('choose-directory')
	}

	return (
		<div className={styles.menuContainer}>
			<div className={`${styles.buttonContainer}`}>
				<div id="open" onClick={(e) => {chooseDirectory(e)}}>O</div>
			</div>
			<div className={`${styles.buttonContainer}`}>
				<div id="settings">S</div>
			</div>
		</div>
    );
}

export default Menu;