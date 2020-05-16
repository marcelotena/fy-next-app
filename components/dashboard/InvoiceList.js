import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { getInvoices } from '../../actions/invoices';

import InvoiceListTable from "./InvoiceListTable";
import PropTypes from "prop-types";

const InvoiceList = ({ invoices, isAuthenticated }) => {

  const renderList = () => {
    if(invoices.length > 0) {
      return <InvoiceListTable invoices={invoices} />;
    } else {
      return null;
    }
  };

  return (
      <div className="container">
        <div className="row">
          <div className="ui relaxed divided list">
            {renderList()}
          </div>
        </div>
      </div>
  );
};

InvoiceList.propTypes = {
  invoices: PropTypes.array,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    invoices: state.invoices.invoices,
    isAuthenticated: state.auth.isAuthenticated
  }
};

export default connect(mapStateToProps)(InvoiceList);