import React from 'react'
import Head from 'next/head'
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



const Home = ({ homepage }) => {

    const { locale, t } = useTranslation()


    return (
        <div className="wrapper">
            <Head>
                <title>{`Fast and Yours`}</title>
                <meta name="description" content={`${t('homepage')}`} />
                <meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1, minimum-scale=1" />

                <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
                <link rel="icon" type="image/png" href="/favicon/speeddial-160px.png" />
                <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
                <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon-precomposed" href="/favicon/apple-touch-icon-57x57.png" />

                <link rel="preload" as="style" href="/css/swiper.min.css" />
                <link rel="preload" as="style" href="/css/bootstrap.min.css" />

                <link rel="stylesheet" href="/css/swiper.min.css" />
                <link rel="stylesheet" href="/css/bootstrap.min.css" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap" rel="stylesheet" />
            </Head>

            <Nav locale={locale} />



            <Hero homepage={homepage} />

            <Services homepage={homepage} />

            <Clients homepage={homepage} />

            <Contact homepage={homepage} />




            <Footer />



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

    // Get WordPress current page that is set as front-page
    const homepageResponse = await fetch(`${DOMAIN_URL}${locale}${FY_CUSTOM_API}/frontpage`)
    const homepage = await homepageResponse.json()

    return { homepage }
}

export default withLocale(Home)
