import React, { useEffect } from 'react';
import PageHeader from "../../components/PageHeader";
import Nav from "../../components/Nav";
import useTranslation from "../../hooks/useTranslation";
import withLocale from '../../hocs/withLocale'
import Footer from "../../components/Footer";
import RegisterForm from "../../components/dashboard/RegisterForm";
import LoginForm from "../../components/dashboard/LoginForm";
import AlertGroup from '../../components/AlertGroup';
// Redux
import { Provider } from 'react-redux';
import store from '../../components/store';
import { loadUser } from '../../actions/auth';


const login = () => {
  const { locale, t } = useTranslation();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
      <div className="wrapper" style={{ backgroundColor: '#f5f8fd' }}>

        <Provider store={store}>

          <PageHeader />

          <Nav locale={locale} isHome={false} />

          <div className="login-content">

            <AlertGroup />

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
                .login-content {
                    padding-top: 40px;
                    padding-bottom: 70px;
                    min-height: calc(100vh - 91px);
                }
            `}</style>
      </div>
  );
};

export default withLocale(login);
