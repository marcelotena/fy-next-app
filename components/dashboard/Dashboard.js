import React from 'react';
import PropTypes from 'prop-types';
import withAuth from '../../hocs/withAuth';
import { connect } from 'react-redux';
// Custom components
import AlertGroup from '../AlertGroup';
import Sidebar from "./Sidebar";

const Dashboard = ({ user, component }) => {

  return (
      <div className="dashboard-wrapper">

        <Sidebar user={user} />

        <div className="dashboard-content">

          <AlertGroup />

          {component}

        </div>

      </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  component: PropTypes.elementType
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(withAuth(Dashboard));
