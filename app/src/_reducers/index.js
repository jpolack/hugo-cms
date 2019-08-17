import { combineReducers } from 'redux';
import authReducer from './auth';
import loadReducer from './load';

const store = combineReducers({
  authenticationState: authReducer,
  loadState: loadReducer,
});

export default store;
