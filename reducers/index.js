import { combineReducers } from 'redux';
import invoices from "./invoices";
import alert from './alert';
import auth from './auth';
import customer from './customer';

export default combineReducers({
  invoices,
  alert,
  auth,
  customer
});