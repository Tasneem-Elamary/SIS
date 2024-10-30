import { combineReducers } from 'redux';
import fetchReducer from './fetch.reducer';
import statusReducer from './status.reducer';
// import listingDataReducser from './user.reducer';
import reportingReducer from './report.reducer';
import  useReducer  from './user.reducer';


console.log(useReducer)

export default combineReducers({

  fetch: fetchReducer,
  status: statusReducer,
  reporting: reportingReducer,
  user: useReducer
 
});
