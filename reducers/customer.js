import {
  CREATECUSTOMER_SUCCESS,
  CREATECUSTOMER_FAIL
} from "../actions/types";


const initialState = {
  customer: null,
  loading: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATECUSTOMER_SUCCESS:
      return {
        ...state,
        customer: payload,
        loading: false
      };
    case CREATECUSTOMER_FAIL:
      return {
        ...state,
        customer: null,
        loading: false
      };
    default:
      return state;
  }
}