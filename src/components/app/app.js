import React from 'react';
import './app.css';
import {ReportPage} from '../pages';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App(){
 

  return (

    <Router >
      <Switch>
      <Route exact path="/" component={ReportPage}/>
      </Switch>
    </Router>
  
  );
 

    

}


export default App;

