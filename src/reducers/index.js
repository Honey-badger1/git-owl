
import * as redux from 'redux';

import  commitsReducer  from './report-reducer';

const rootReducer = redux.combineReducers({

  commitsReducer,
})

export default rootReducer;