import React, {useEffect} from 'react';
import useTranslation from "../../hooks/useTranslation";
import withLocale from '../../hocs/withLocale'
import store from "../../components/store";
import { loadUser } from "../../actions/auth";
//import { getIssuers } from "../../actions/issuer";
import { Provider } from "react-redux";
import PageHeader from "../../components/PageHeader";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Dashboard from "../../components/dashboard/Dashboard";
import Issuers from "../../components/dashboard/issuer/Issuers";

const issuers = () => {
  const { locale, t } = useTranslation();

  useEffect(() => {
    store.dispatch(loadUser());
    //store.dispatch(getIssuers());
  }, []);

  return (
      <div className="wrapper" style={{ backgroundColor: '#f5f8fd' }}>

        <Provider store={store}>

          <PageHeader />

          <Nav locale={locale} />

          <Dashboard component={<Issuers />} />

          <Footer />

        </Provider>

      </div>
  );
};

export default withLocale(issuers);
