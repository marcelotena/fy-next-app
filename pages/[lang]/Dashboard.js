import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import reducers from '../../reducers';
import PageHeader from "../../components/PageHeader";
import Nav from "../../components/Nav";
import useTranslation from "../../hooks/useTranslation";
import withLocale from '../../hocs/withLocale'
import Footer from "../../components/Footer";
import InvoiceList from "../../components/dashboard/InvoiceList";

const Dashboard = () => {
  const { locale, t } = useTranslation();
  const store = createStore(reducers, applyMiddleware(thunk));

  return (
      <div className="wrapper" style={{ backgroundColor: '#f5f8fd' }}>

        <PageHeader />

        <Nav locale={locale} isAdmin={true} />

        <Provider store={store}>

          <div className="dashboard-content">
            <InvoiceList />
          </div>

        </Provider>


        <Footer />

        { /*language=CSS*/ }
        <style jsx>{`            
                .dashboard-content {
                    padding-top: 40px;
                    padding-bottom: 70px;
                }
            `}</style>
      </div>
  );
};

export default withLocale(Dashboard);
