import { combineReducers } from 'redux';
import invoicesReducer from "./invoicesReducer";

export default combineReducers({
  invoices: invoicesReducer
});