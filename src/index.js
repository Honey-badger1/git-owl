import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {GitService} from './services/';
import App from './components/app';
import GitServiceContext from './components/git-service-context';
import {Provider} from 'react-redux';
import store from './store';



const gitService=new GitService(); 
ReactDOM.render(
  <Provider store={store}>
    
    <GitServiceContext.Provider value={gitService} >
 
       <App />
  
    </GitServiceContext.Provider>

  </Provider>,
  document.getElementById('root')
);

