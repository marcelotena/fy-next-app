import {
  GET_INVOICES,
  INVOICE_ERROR
} from "../actions/types";

const initialState = {
  invoices: [],
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_INVOICES:
      return {
        ...state,
        loading: false,
        invoices: payload
      };
    case INVOICE_ERROR:
      return {
        ...state,
        loading: false,
        invoices: []
      };
    default:
      return state;
  }
};