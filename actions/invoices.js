import axios from 'axios';
import {
    GET_INVOICES,
    INVOICE_ERROR
} from "./types";
import { DASHBOARD_API } from "../utils/constants";

export const getInvoices = () => async dispatch => {
  try {
    const res = await axios.get(`${DASHBOARD_API}/api/v1/invoices`);

    dispatch({
      type: GET_INVOICES,
      payload: res.data.data
    })
  } catch (err) {
    dispatch({
      type: INVOICE_ERROR
    })
  }

};