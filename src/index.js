import React from 'react';
import ReactDOM from 'react-dom';
import {GitService} from './services/';
import App from './components/app';
import ErrorBoundry from './components/error-boundary';
import GitServiceContext from './components/git-service-context';
import {Provider} from 'react-redux';
import store from './store';



const gitService=new GitService(); 
ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>

      <GitServiceContext.Provider value={gitService} >
 
        <App />
  
      </GitServiceContext.Provider>


    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);

