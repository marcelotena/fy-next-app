import {
  CREATECUSTOMER_SUCCESS,
  CREATECUSTOMER_FAIL,
  RESET_CUSTOMERFORM_SUCCESS
} from "../actions/types";


const initialState = {
  customer: null,
  loading: true,
  success: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATECUSTOMER_SUCCESS:
      return {
        ...state,
        customer: payload,
        loading: false,
        success: true
      };
    case CREATECUSTOMER_FAIL:
    case RESET_CUSTOMERFORM_SUCCESS:
      return {
        ...state,
        customer: null,
        loading: false,
        success: false
      };
    default:
      return state;
  }
}