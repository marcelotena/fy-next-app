import { SET_ALERT, REMOVE_ALERT, COLLAPSE_ALERT } from '../actions/types';

// @desc  Alerts will be in State as objects with: id, msg, active and alertType
const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case SET_ALERT:
      return [...state, payload];
    case COLLAPSE_ALERT:
      return state.map(alert =>
          alert.id === payload ? {...alert, active: !alert.active} : alert
      );
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}