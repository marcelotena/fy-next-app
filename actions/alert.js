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

export const removeAlert = (id, collapseSpeed) => (dispatch, getState) => {

  if(id === 'all') {

    // Remove all alerts
    const items = getState().alert;

    const removeAlertsDelayed = (i, alerts, cb) => {
      if (cb) {
        if (i >= alerts.length) return cb();
      } else {
        if (i >= alerts.length) return null;
      }

      dispatch({
        type: COLLAPSE_ALERT,
        payload: alerts[i].id
      });

      setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: alerts[i].id
      }), collapseSpeed);

      setTimeout(removeAlertsDelayed, 250, i+1, alerts, cb);
    };

    removeAlertsDelayed(0, items);

  } else {

    // Remove single alert
    dispatch({
      type: COLLAPSE_ALERT,
      payload: id
    });

    setTimeout(() => dispatch({
      type: REMOVE_ALERT,
      payload: id
    }), collapseSpeed);

  }



};