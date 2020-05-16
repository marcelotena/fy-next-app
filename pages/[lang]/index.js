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
import store from "../store";
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



            { /*language=CSS*/ }
            <style jsx>{`
                :global(html) {
                    /* Adjust font size */
                    font-size: 100%;
                    -webkit-text-size-adjust: 100%;
                    /* Font varient */
                    font-variant-ligatures: none;
                    -webkit-font-variant-ligatures: none;
                    /* Smoothing */
                    text-rendering: optimizeLegibility;
                    -moz-osx-font-smoothing: grayscale;
                    font-smoothing: antialiased;
                    -webkit-font-smoothing: antialiased;
                    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
                }

                .wrapper {
                    overflow-x: hidden;
                }

                :global(.bg-lightgray) {
                    background: #f6f6f6;
                }

                :global(.bg-darkgray) {
                    background: #4a4a4a;
                }

                :global(p) {
                    margin-top: 0;
                }

                :global(a) {
                    cursor: pointer;
                }

                :global(section) {
                    float: left;
                    width: 100%;
                }

                :global(.Home__section-padding) {
                    padding: 50px 70px 50px 70px;
                }

                :global(.Home__section-title) {
                    color: #4a4a4a;
                    font-size: 2rem; /* 32px */
                    font-weight: 700;
                    line-height: 1.3;

                    padding-bottom: 40px;
                    margin-bottom: 30px;

                    position: relative;
                }

                :global(.Home__section-title.block-center) {
                    text-align: center;
                }

                :global(.Home__section-title::after) {
                    background: #4a90e2;
                    display: block;
                    content: '';
                    width: 130px;
                    height: 4px;

                    position: absolute;
                    left: 0;
                    bottom: 0;
                }

                :global(.Home__section-title.block-center::after) {
                    left: calc(50% - 65px);
                }

                :global(.Home__section-content) {
                    color: #4a4a4a;
                    font-size: 1rem; /* 16px */
                    font-weight: 400;
                    line-height: 1.6;
                }

                @media (max-width: 640px) {
                    :global(.Home__section-padding) {
                        padding: 50px 40px 50px 40px;
                    }
                }

            `}</style>
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
