import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { fetchInvoices } from '../../actions';

import InvoiceListTable from "./InvoiceListTable";

const InvoiceList = ({ fetchInvoices }) => {

  useEffect(() => {
    fetchInvoices()
  }, []);

  const renderList = (invoices) => {
    return <InvoiceListTable invoices={[]} />;
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

const mapStateToProps = (state) => {
  return { invoices: state.invoices}
};

export default connect(mapStateToProps, { fetchInvoices })(InvoiceList);