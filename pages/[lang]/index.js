import React from 'react'
import Head from 'next/head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import fetch from 'isomorphic-unfetch'
import { DOMAIN_URL, FY_CUSTOM_API } from "../../utils/constants"

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

            <section className="Home__hero">
                <div className="container">

                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="Home__title">{homepage.title.rendered}</h1>
                            <div className="Home__content" dangerouslySetInnerHTML={{__html: homepage.content.rendered}}></div>
                        </div>

                        <div className="col-sm-6">
                            <div className="Home__featured-image">
                                <img src={ homepage.better_featured_image.source_url } alt={homepage.better_featured_image.alt_text}/>
                            </div>
                        </div>
                    </div>

                </div>
            </section>




            <section id="services" className="Home__services">

                <div className="Home__services__left-column">

                    <div className="Home__services__inner-content Home__section-padding">
                        {homepage.acf.servicios_destacados.map((service, index) => {
                            return (
                                <div className="Home__services__service" key={index}>
                                    <div className="row">

                                        <div className="col-md-4 col-sm-3">
                                            <div className="Home__services__icon-container" dangerouslySetInnerHTML={{__html: service.icono}}></div>
                                        </div>
                                        <div className='col-md-8 col-sm-9'>
                                            <h2 className="Home__services__service-title">{service.titulo_del_servicio}</h2>
                                            <p className="Home__services__service-content">{service.descripcion_del_servicio}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <div className="Home__services__right-column">

                    <div className="Home__services__inner-content Home__section-padding">
                        <h2 className="Home__section-title">{homepage.acf.titulo_seccion_servicios}</h2>
                        <div className="Home__section-content" dangerouslySetInnerHTML={{__html: homepage.acf.presentacion_servicios}}></div>
                    </div>

                </div>



            </section>






            <Clients homepage={homepage}/>

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

                section {
                    float: left;
                    width: 100%;
                }

                li {
                    list-style: none;
                    padding-bottom: 30px;
                }

                .archive-title {
                    font-size: 1.2rem;
                }

                li a {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    text-decoration: none;
                }

                .excerpt-text {
                    font-size: 0.9rem;
                    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
                }

                .Home__hero {
                    float: left;
                    width: 100%;
                    background-image: linear-gradient(to right, #4a90e2 27%, #9ac4ff 44%, rgba(154, 196, 255, 0) 52%), linear-gradient(to bottom, #a6cafe 7%, #9ac4ff 24%, #9ac4ff 47%, #9ac4ff 68%, #a6cafe 91%);

                    padding-top: 30px;
                    padding-bottom: 40px;
                }

                .Home__title {
                    color: white;
                    font-size: 2.8rem; /* 48px */
                    line-height: 1.15;
                    max-width: 450px;
                    margin-bottom: 20px;
                }

                .Home__content {
                    color: white;
                    font-size: 1.5rem; /* 24px */
                    font-weight: 500;
                    line-height: 1.4;
                    max-width: 500px;
                }

                .Home__featured-image {
                    position: relative;
                    width: 100%;
                    max-width: 600px;
                }

                .Home__featured-image img {
                    padding-top: 0;
                    margin-right: -70px;
                    margin-bottom: -30px;
                }

                .Home__services__left-column,
                .Home__services__right-column {
                    width: 50%;
                    float: left;
                }

                .Home__services__left-column .Home__services__inner-content,
                .Home__services__right-column .Home__services__inner-content {
                    max-width: 570px;
                    box-sizing: border-box;
                }

                .Home__services__left-column .Home__services__inner-content {
                    float: right;
                }

                .Home__services__right-column .Home__services__inner-content {
                    float: left;
                }

                .Home__services__left-column {
                    background: #4a4a4a;
                }

                .Home__services__service {
                    margin-bottom: 15px;
                }

                .Home__services__service-title {
                    color: white;
                    font-size: 1.125rem; /* 18px */
                    font-weight: 500;
                    margin-top: 20px;
                }

                .Home__services__service-content {
                    color: white;
                    font-size: 1rem; /* 16px */
                    font-weight: 400;
                    line-height: 1.5;
                }

                .Home__section-padding {
                    padding: 50px 70px 50px 70px;
                }

                .Home__section-title {
                    color: #4a4a4a;
                    font-size: 2rem; /* 32px */
                    font-weight: 700;
                    line-height: 1.3;

                    padding-bottom: 40px;
                    margin-bottom: 30px;

                    position: relative;
                }

                .Home__section-title.block-center {
                    text-align: center;
                }

                .Home__section-title::after {
                    background: #4a90e2;
                    display: block;
                    content: '';
                    width: 130px;
                    height: 4px;

                    position: absolute;
                    left: 0;
                    bottom: 0;
                }

                .Home__section-title.block-center::after {
                    left: calc(50% - 65px);
                }

                .Home__section-content {
                    color: #4a4a4a;
                    font-size: 1rem; /* 16px */
                    font-weight: 400;
                    line-height: 1.6;
                }

                @media (max-width: 1200px) {
                    .Home__featured-image {
                        margin-right: 0;
                    }
                }

                @media (max-width: 1024px) {
                    
                }

                @media (max-width: 991px) {
                    .Home__title {
                        font-size: 2.375rem; /* 38px */
                        line-height: 1.20;
                        margin-bottom: 10px;
                        margin-top: 15px;
                    }

                    .Home__content {
                        font-size: 1.125rem; /* 18px */
                        line-height: 1.5;
                        max-width: 370px;
                    }

                    .Home__featured-image img {
                        max-width: 550px;

                        padding-top: 30px;
                        margin-right: -70px;
                        margin-bottom: -100px;
                    }

                    /* Services section styles */
                    .Home__services__left-column,
                    .Home__services__right-column {
                        width: 100%;
                        float: left;
                    }

                    .Home__services__left-column .Home__services__inner-content,
                    .Home__services__right-column .Home__services__inner-content {
                        max-width: 750px;
                        box-sizing: border-box;
                    }

                    .Home__services__left-column .Home__services__inner-content,
                    .Home__services__right-column .Home__services__inner-content{
                        float: none;
                        margin: 0 auto;
                    }

                }

                @media (max-width: 767px) {
                    .Home__title {
                        text-align: center;
                        margin-left: auto;
                        margin-right: auto;
                        font-size: 1.8rem;
                        max-width: 400px;
                    }

                    .Home__content {
                        text-align: center;
                        margin-left: auto;
                        margin-right: auto;
                        font-size: 1.1rem;
                        max-width: 400px;
                    }

                    .Home__hero {
                        background-image: linear-gradient(to bottom, #4a90e2 27%, #9ac4ff 44%, rgba(154, 196, 255, 0) 52%), linear-gradient(to left, #a6cafe 7%, #9ac4ff 24%, #9ac4ff 47%, #9ac4ff 68%, #a6cafe 91%);
                    }

                    .Home__featured-image {
                        padding-top: 20px;
                        margin-right: auto;
                        margin-left: auto;
                        text-align: center;
                    }

                    .Home__featured-image img {
                        margin-bottom: -75px;
                        width: 100%;
                        max-width: 450px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .Home__services__service {
                        margin-bottom: 30px;
                    }

                    .Home__services__left-column .Home__services__inner-content,
                    .Home__services__right-column .Home__services__inner-content {
                        max-width: 540px;
                        box-sizing: content-box;
                    }
                }

                @media (max-width: 640px) {
                    .Home__section-padding {
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
