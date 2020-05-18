import React, {useEffect} from 'react'
import PageHeader from "../../components/PageHeader";
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import fetch from 'isomorphic-unfetch'
import { DOMAIN_URL, FY_CUSTOM_API } from "../../utils/constants"

import Hero from "../../components/home/Hero"
import Services from "../../components/home/Services"
import Clients from "../../components/home/Clients"
import Contact from '../../components/home/Contact'

import withLocale from '../../hocs/withLocale'
import useTranslation from '../../hooks/useTranslation'
import { defaultLocale } from "../../translations/config"
import Cookies from "js-cookie";
import {GApageView, initGA} from "../index";
import store from "../../components/store";
import {Provider} from "react-redux";
import {loadUser} from "../../actions/auth";



const Home = ({ homepage }) => {

    const { locale, t } = useTranslation();

    useEffect(() => {
      store.dispatch(loadUser());
    }, []);

    return (
        <div className="wrapper">
          <PageHeader />

          <Provider store={store}>

            <Nav locale={locale} isHome={true} />


            <Hero homepage={homepage} />

            <Services homepage={homepage} />

            <Clients homepage={homepage} />

            <Contact homepage={homepage} />



            <Footer />


          </Provider>

        </div>
    );

}



Home.getInitialProps = async (ctx) => {

    // Locale
    let locale;

    if (ctx.query.lang === defaultLocale) {
        locale = '';
    } else {
        locale = `/${ctx.query.lang}`;
    }

    let cookieConsentValue = Cookies.get('CookieConsent')

    if( cookieConsentValue ) {
      // Cookie consent is true, record pageView
      if (!window.ga) {
        initGA()
      }

      GApageView(window.location.pathname + window.location.search);

    } else {
      // CookieConsent not defined or false
    }

    // Get WordPress current page that is set as front-page
    const homepageResponse = await fetch(`${DOMAIN_URL}${locale}${FY_CUSTOM_API}/frontpage`)
    const homepage = await homepageResponse.json()

    return { homepage }
}

export default withLocale(Home)
