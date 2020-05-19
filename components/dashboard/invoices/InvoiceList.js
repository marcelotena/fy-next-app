import React from "react";
import { connect } from 'react-redux';

import InvoiceListTable from "./InvoiceListTable";
import PropTypes from "prop-types";

const InvoiceList = ({ invoices }) => {

  const renderList = () => {
    if(invoices.length > 0) {
      return <InvoiceListTable invoices={invoices} />;
    } else {
      return null;
    }
  };

  return (
      <div className="ui relaxed divided list">
        {renderList()}
      </div>
  );
};

InvoiceList.propTypes = {
  invoices: PropTypes.array
};

const mapStateToProps = state => {
  return {
    invoices: state.invoices.invoices
  }
};

export default connect(mapStateToProps)(InvoiceList);