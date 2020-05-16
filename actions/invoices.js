import axios from 'axios';
import {
  GET_INVOICES,
  INVOICE_ERROR, REGISTER_FAIL
} from "./types";
import { DASHBOARD_API } from "../utils/constants";
import setAuthToken from "../utils/setAuthToken";
import {setAlert} from "./alert";
import {loadUser} from "./auth";

export const getInvoices = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    await loadUser();
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${DASHBOARD_API}/api/v1/invoices`);

    dispatch({
      type: GET_INVOICES,
      payload: res.data.data
    })
  } catch (err) {
    const errors = err.response.data.error.split(',');

    if (errors) {
      errors.map(error => dispatch(setAlert(error, 'error')));
    }

    dispatch({
      type: INVOICE_ERROR
    });
  }

};