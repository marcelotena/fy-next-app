import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { getInvoices } from '../../actions/invoices';

import InvoiceListTable from "./InvoiceListTable";
import PropTypes from "prop-types";

const InvoiceList = ({ getInvoices, invoices, isAuthenticated }) => {

  useEffect(() => {
    if(isAuthenticated) {
      getInvoices();
    }
  }, []);

  const renderList = () => {
    return <InvoiceListTable invoices={invoices} />;
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
  getInvoices: PropTypes.func.isRequired,
  invoices: PropTypes.array,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    invoices: state.invoices,
    isAuthenticated: state.auth.isAuthenticated
  }
};

export default connect(mapStateToProps, { getInvoices })(InvoiceList);