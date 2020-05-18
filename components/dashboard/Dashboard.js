import React, {Fragment} from 'react';
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

        { /* language=CSS */ }
        <style jsx>{`
          .dashboard-wrapper {
            display: flex;
            justify-content: space-between;
          }
        
          .dashboard-sidebar {
            width: 320px;
            height: calc(100vh - 91px);
            z-index: 4;
            overflow: auto;
            position: relative;
            padding-top: 10px;
            padding-bottom: 30px;
            transition-duration: .2s, .2s, .35s;
            transition-property: top, bottom, width;
            transition-timing-function: linear, linear, ease;
          }
          
          .sidebar-bg {
            background: #4a4a4a;
          }
          
          .dashboard-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            
            width: calc(100% - 320px);
            padding: 30px;
          }
            `}</style>
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
