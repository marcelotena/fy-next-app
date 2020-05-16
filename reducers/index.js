import { combineReducers } from 'redux';
import invoices from "./invoices";
import alert from './alert';
import auth from './auth';

export default combineReducers({
  invoices,
  alert,
  auth
});