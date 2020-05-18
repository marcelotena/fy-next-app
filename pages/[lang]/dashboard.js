import React, {useEffect} from 'react';
import useTranslation from "../../hooks/useTranslation";
import withLocale from '../../hocs/withLocale'
import store from "../../components/store";
import {loadUser} from "../../actions/auth";
import {Provider} from "react-redux";
import PageHeader from "../../components/PageHeader";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
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

          <div>

            <Dashboard />

          </div>

          <Footer />

        </Provider>

        { /*language=CSS*/ }
        <style jsx>{`   
                :global(h1) {
                    margin-top: 0;
                }
            `}</style>
      </div>
  );
};

export default withLocale(dashboard);
