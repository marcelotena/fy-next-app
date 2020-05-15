import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close';
import {collapseAlert, removeAlert} from "../actions/alert";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


const AlertGroup = ({ alerts, removeAlert, collapseAlert }) => {
  const classes = useStyles();
  const collapseSpeed = 400;

  const collapseAndRemove = id => {
    collapseAlert(id);
    setTimeout(() => removeAlert(id), collapseSpeed);
  };

  return (
      <div className={classes.root}>
        {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
          <Zoom in={alert.active} key={alert.id} timeout={collapseSpeed}>
            <div className="container">
              <Alert
                  severity={alert.alertType}
                  action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => collapseAndRemove(alert.id)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
              >
                { alert.msg }
              </Alert>
            </div>
          </Zoom>
        ))}
      </div>
  )
};

AlertGroup.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, { removeAlert, collapseAlert })(AlertGroup);
