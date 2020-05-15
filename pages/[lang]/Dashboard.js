import React from 'react';
import PageHeader from "../../components/PageHeader";
import Nav from "../../components/Nav";
import useTranslation from "../../hooks/useTranslation";
import withLocale from '../../hocs/withLocale'
import Footer from "../../components/Footer";
import RegisterForm from "../../components/dashboard/RegisterForm";
import LoginForm from "../../components/dashboard/LoginForm";
import Alert from '../../components/Alert';
// Redux
import { Provider } from 'react-redux';
import store from '../store';

const Dashboard = () => {
  const { locale, t } = useTranslation();

  return (
      <div className="wrapper" style={{ backgroundColor: '#f5f8fd' }}>

        <Provider store={store}>

          <PageHeader />

          <Alert />

          <Nav locale={locale} isAdmin={true} />

          <div className="dashboard-content">

            <div className="container">
              <div className="row">

                <div className="col-md-6">
                  <RegisterForm />
                </div>

                <div className="col-md-6">
                  <LoginForm />
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
                }
            `}</style>
      </div>
  );
};

export default withLocale(Dashboard);
