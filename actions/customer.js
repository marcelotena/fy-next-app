import axios from 'axios';
import {
  CREATECUSTOMER_SUCCESS,
  CREATECUSTOMER_FAIL,
  RESET_CUSTOMERFORM_SUCCESS
} from "./types";
import { DASHBOARD_API } from "../utils/constants";
import { setAlert } from "./alert";

// Create customer
export const createCustomer = ({ name, companyId, address, email }) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, companyId, address, email });

  try {
    const res = await axios.post(`${DASHBOARD_API}/api/v1/customers`, body, config);

    dispatch({
      type: CREATECUSTOMER_SUCCESS,
      payload: res.data.data
    });

    dispatch(setAlert(`Customer ${name} saved to database`, 'success'))

    setTimeout(() => dispatch({
      type: RESET_CUSTOMERFORM_SUCCESS,
    }), 500);
  } catch (err) {
    const errors = err.response.data.error.split(',');

    if (errors) {
      errors.map(error => dispatch(setAlert(error, 'error')));
    }

    dispatch({
      type: CREATECUSTOMER_FAIL
    });
  }
};