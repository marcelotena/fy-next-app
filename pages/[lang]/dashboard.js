import React, {useEffect} from 'react';
import useTranslation from "../../hooks/useTranslation";
import withLocale from '../../hocs/withLocale'
import store from "../store";
import {loadUser} from "../../actions/auth";
import {Provider} from "react-redux";
import PageHeader from "../../components/PageHeader";
import Nav from "../../components/Nav";
import AlertGroup from "../../components/AlertGroup";
import Footer from "../../components/Footer";
import InvoiceList from "../../components/dashboard/InvoiceList";
import Dashboard from '../../components/dashboard/Dashboard';

const dashboard = () => {
  const { locale, t } = useTranslation();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
      <div className="wrapper" style={{ backgroundColor: '#f5f8fd' }}>

        <Provider store={store}>

          <PageHeader />

          <Nav locale={locale} />

          <div className="dashboard-content">

            <AlertGroup />

            <div className="container">
              <div className="row">

                <div className="col-md-12">

                  <Dashboard />

                </div>

              </div>
            </div>

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

export default withLocale(dashboard);
