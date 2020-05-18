import React from 'react';
import PropTypes from 'prop-types';
import withAuth from '../../hocs/withAuth';
import { connect } from 'react-redux';
// Custom components
import AlertGroup from '../AlertGroup';
import CreateCustomer from "./customer/CreateCustomer";
import Sidebar from "./Sidebar";

const Dashboard = ({ user }) => {

  return (
      <div className="dashboard-wrapper">

        <div className="dashboard-sidebar hidden-sm hidden-xs bg-darkgray">
          <Sidebar user={user} />
        </div>

        <div className="dashboard-content">

          <AlertGroup />

          <CreateCustomer />

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
