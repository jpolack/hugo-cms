import { createStore, combineReducers } from 'redux';
import authReducer from './auth';
import loadReducer from './load';

const createApplicationStore = () => createStore(combineReducers({
  authenticationState: authReducer,
  loadState: loadReducer,
}));

export default createApplicationStore;
