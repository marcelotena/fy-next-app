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
import Invoices from "../../components/dashboard/Invoices";

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

          <div>

            <Invoices />

          </div>

          <Footer />

        </Provider>

        { /*language=CSS*/ }
        <style jsx>{`            
                .dashboard-content {
                    padding-top: 40px;
                    padding-bottom: 70px;
                    min-height: calc(100vh - 91px);
                }
            `}</style>
      </div>
  );
};

export default withLocale(invoices);
