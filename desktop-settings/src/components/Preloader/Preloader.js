import React from 'react';
import styles from './Preloader.module.css';

function Preloader(props) {
	return (<div className={styles.preloaderContainer}>
		<div className={`${styles.circleContainer} ${styles.outer}`}>
			<div className={styles.outerCircle}></div>
		</div>
		<div className={`${styles.circleContainer} ${styles.middle}`}>
			<div className={styles.middleCircle}></div>
		</div>
		<div className={`${styles.circleContainer} ${styles.inner}`}>
			<div className={styles.innerCircle}></div>
		</div>
    </div>);
}

export default Preloader;