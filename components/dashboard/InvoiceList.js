import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchInvoices } from '../../actions';

import InvoiceListTable from "./InvoiceListTable";

class InvoiceList extends Component {

  componentDidMount() {
    this.props.fetchInvoices();
  }

  renderList() {
    return <InvoiceListTable invoices={this.props.invoices} />;
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="ui relaxed divided list">
              {this.renderList()}
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { invoices: state.invoices}
};

export default connect(mapStateToProps, { fetchInvoices })(InvoiceList);