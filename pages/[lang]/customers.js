import React, {useEffect} from 'react';
import useTranslation from "../../hooks/useTranslation";
import withLocale from '../../hocs/withLocale'
import store from "../../components/store";
import { loadUser } from "../../actions/auth";
//import { getCustomers } from "../../actions/customer";
import { Provider } from "react-redux";
import PageHeader from "../../components/PageHeader";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Dashboard from "../../components/dashboard/Dashboard";
import CreateCustomer from "../../components/dashboard/customer/CreateCustomer";

const customers = () => {
  const { locale, t } = useTranslation();

  useEffect(() => {
    store.dispatch(loadUser());
    //store.dispatch(getCustomers());
  }, []);

  return (
      <div className="wrapper" style={{ backgroundColor: '#f5f8fd' }}>

        <Provider store={store}>

          <PageHeader />

          <Nav locale={locale} />

          <Dashboard component={<CreateCustomer />} />

          <Footer />

        </Provider>

      </div>
  );
};

export default withLocale(customers);
