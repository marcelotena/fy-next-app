import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT, COLLAPSE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();
  const active = true;

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, active, id }
  });
};

export const removeAlert = (id, collapseSpeed) => dispatch => {

  dispatch({
    type: COLLAPSE_ALERT,
    payload: id
  });

  setTimeout(() => dispatch({
              type: REMOVE_ALERT,
              payload: id
            }), collapseSpeed);

};