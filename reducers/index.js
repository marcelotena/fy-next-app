import { combineReducers } from 'redux';
import invoicesReducer from "./invoicesReducer";
import alert from './alert';
import auth from './auth';

export default combineReducers({
  invoices: invoicesReducer,
  alert,
  auth
});