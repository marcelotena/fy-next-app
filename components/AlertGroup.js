import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import {removeAlert} from "../actions/alert";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    float: 'right'
  }
}));


const AlertGroup = ({ alerts, removeAlert }) => {
  const classes = useStyles();
  const collapseSpeed = 400;

  return (
      <div className={classes.root}>
        {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
          <Collapse in={alert.active} key={alert.id} timeout={collapseSpeed}>
            <div className="container">
              <Alert
                  severity={alert.alertType}
                  action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => removeAlert(alert.id, collapseSpeed)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
              >
                { alert.msg }
              </Alert>
            </div>
          </Collapse>
        ))}
        {alerts !== null &&
        alerts.length > 0 ? (
                <div className="container">
                  <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<CloseIcon />}
                  onClick={() => removeAlert('all', collapseSpeed)}
                  >
                  Clear all
                  </Button>
                </div>
          ) : ''}
      </div>
  )
};

AlertGroup.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, { removeAlert })(AlertGroup);
