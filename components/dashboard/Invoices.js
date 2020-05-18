import React from 'react';
import PropTypes from 'prop-types';
import withAuth from '../../hocs/withAuth';
import { connect } from 'react-redux';
// Custom components
import AlertGroup from '../AlertGroup';
import Sidebar from "./Sidebar";
import InvoiceList from "./InvoiceList";

const Invoices = ({ user }) => {

  return (
      <div className="dashboard-wrapper">

        <div className="dashboard-sidebar hidden-sm hidden-xs bg-darkgray">
          <Sidebar user={user} />
        </div>

        <div className="dashboard-content">

          <AlertGroup />

          <InvoiceList />

        </div>

      </div>
  );
};

Invoices.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(withAuth(Invoices));
