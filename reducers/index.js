import { combineReducers } from 'redux';
import invoicesReducer from "./invoicesReducer";
import alert from './alert';

export default combineReducers({
  invoices: invoicesReducer,
  alert
});