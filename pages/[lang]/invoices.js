import React, {useEffect} from 'react';
import useTranslation from "../../hooks/useTranslation";
import withLocale from '../../hocs/withLocale'
import store from "../../components/store";
import {loadUser} from "../../actions/auth";
import {Provider} from "react-redux";
import PageHeader from "../../components/PageHeader";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import {getInvoices} from "../../actions/invoices";
import Dashboard from "../../components/dashboard/Dashboard";
import InvoiceList from "../../components/dashboard/InvoiceList";

const invoices = () => {
  const { locale, t } = useTranslation();

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getInvoices());
  }, []);

  return (
      <div className="wrapper" style={{ backgroundColor: '#f5f8fd' }}>

        <Provider store={store}>

          <PageHeader />

          <Nav locale={locale} />

          <Dashboard component={<InvoiceList />} />

          <Footer />

        </Provider>

      </div>
  );
};

export default withLocale(invoices);
