import { ipcRenderer } from 'electron';
import React from 'react';
import styles from './Menu.module.css';

function Menu(props) {

	function chooseDirectory() {
		console.log('12')
		ipcRenderer.send('choose-directory')
	}

	return (
		<div className={styles.menuContainer}>
			<div className={styles.buttonContainer}>
				<button id="open" onClick={(e) => {chooseDirectory(e)}}>O</button>
			</div>
			<div className={styles.buttonContainer}>
				<button id="settings">S</button>
			</div>
		</div>
    );
}

export default Menu;