import React, { useState } from 'react';
import styles from './App.module.css';
import { reposPaths, url } from '../../../config.json'


function App(props) {
	console.log(reposPaths, '---', url)
    const [counter, setCounter] = useState(0)
    return (
        <div id="App" className={styles.hidden}>
            <div>
                {counter}
            </div>
            <button onClick={() => setCounter(counter + 1)}>Testing</button>
        </div>
    );
}

export default App;