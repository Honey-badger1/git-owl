import React from 'react';
import '../../../../node_modules/electron-tabs/electron-tabs.css'
import './Tabs.css'


function Tabs(props) {
    return (
        <>
            <div className="etabs-tabgroup" >
				<div id="open"  className="etabs-buttons"><i className="fa fa-folder-open-o button" aria-hidden="true"></i></div>
				<div className="etabs-tabs"></div>
				<div className="etabs-buttons"></div>
			</div>
			<div className="etabs-views show"></div>
			<div  id="error" className='hide'>Error</div>
        </>
    );
}

export default Tabs;