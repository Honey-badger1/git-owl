import React from 'react';
import styles from './Menu.module.css';

function Menu(props) {
    return (
		<div className={styles.menuContainer}>
			<div className={styles.buttonContainer}>
				<button id="open">Open Repo</button>
			</div>
			<div className={styles.buttonContainer}>
				<button id="settings">Settings</button>
			</div>
		</div>
    );
}

export default Menu;