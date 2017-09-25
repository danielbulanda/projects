import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MainReducers from './MainReducers';

export default combineReducers({
  auth: AuthReducer,
  main: MainReducers
});
