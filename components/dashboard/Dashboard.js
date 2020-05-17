import React from 'react';
import PropTypes from 'prop-types';
import withAuth from '../../hocs/withAuth';
import { connect } from 'react-redux';
// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// Custom components
import CreateCustomer from "./customer/CreateCustomer";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Dashboard = ({ user }) => {
  const classes = useStyles();

  return (
      <div>
        <h1>Dashboard</h1>

        <div className="row">

          <div className="col-md-3">
            <Avatar alt={user.name} src={user.avatar} className={classes.large} />
            <p>{user.name} <span>({user.role})</span></p>
            <div>{user.email}</div>
          </div>

          <div className="col-md-9">

            <CreateCustomer />

          </div>

        </div>


      </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(withAuth(Dashboard));
