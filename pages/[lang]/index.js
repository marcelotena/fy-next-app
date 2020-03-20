import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import fetch from 'isomorphic-unfetch'
import {DOMAIN_URL, FY_CUSTOM_API} from "../../utils/constants"
import Swiper from 'react-id-swiper'
import Modal from '../../components/Modal'

import withLocale from '../../hocs/withLocale'
import useTranslation from '../../hooks/useTranslation'
import { defaultLocale } from "../../translations/config"

const params = {
    direction: 'horizontal',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    slidesPerView: 5,
    slidesPerColumn: 3,
    slidesPerGroup: 5,
    spaceBetween: 15,
    breakpoints: {
        1024: {
            slidesPerView: 5,
            slidesPerColumn: 3,
            slidesPerGroup: 5
        },
        768: {
            slidesPerView: 3,
            slidesPerColumn: 3,
            slidesPerGroup: 3
        },
        640: {
            slidesPerView: 3,
            slidesPerColumn: 3,
            slidesPerGroup: 3
        },
        320: {
            slidesPerView: 2,
            slidesPerColumn: 4,
            slidesPerGroup: 2
        }
    }
}





const Home = ({ homepage }) => {

    const { locale, t } = useTranslation()

    /* Form variables and functions */
    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    })

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        message: '',
        privacy: false,
        language: `${locale}`,
        message_ok: `${t('message_sent')}`,
        message_error: `${t('message_error')}`
    })

    const handleResponse = (status, msg) => {
        if (status === 200) {
            setStatus({
                submitted: true,
                submitting: false,
                info: { error: false, msg: msg }
            })
            setInputs({
                name: '',
                email: '',
                message: '',
                privacy: false,
                language: `${locale}`,
                message_ok: `${t('message_sent')}`,
                message_error: `${t('message_error')}`
            })
        } else {
            setStatus({
                info: { error: true, msg: msg }
            })
        }
    }

    const handleOnChange = e => {
        e.persist()
        setInputs(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null }
        })
    }

    const handleCheckboxOnChange = e => {
        e.persist()
        setInputs(prev => ({
            ...prev,
            [e.target.id]: e.target.checked
        }))
        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null }
        })
    }

    const handleOnSubmit = async e => {
        e.preventDefault()
        setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
        const res = await fetch('../api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        const text = await res.text()
        handleResponse(res.status, text)
    }


    return (
        <div className="wrapper">
            <Head>
                <title>{`Fast and Yours - ${t('homepage')}`}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1, minimum-scale=1" />
                <link rel="icon" href="/favicon.ico" />
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




            <section id="clients" className="Home__clients Home__section-padding bg-lightgray">

                <div className="container">

                    <div className="row">
                        <div className="col-sm-12">

                            <h2 className="Home__section-title block-center">{homepage.acf.titulo_seccion_clientes}</h2>

                        </div>
                    </div>



                    <div className="Home__clients__slider">

                        <Swiper {...params}>

                            {homepage.acf.clientes.map((client, index2) => {
                                return (
                                    <img className="Home__clients__slider-item" src={client.logotipo.url} alt={client.nombre} title={client.nombre} key={index2} />
                                )
                            })}

                        </Swiper>

                    </div>


                </div>

            </section>







            <section id="contact" className="Home__contact bg-darkgray">

                <div className="container">
                    <div className="row">

                        <div className="col-sm-12">

                            <div className="Home__section-padding">
                                <h2 className="Home__section-title block-center">{homepage.acf.titulo_seccion_contacto}</h2>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="container Home__section-padding">
                    <div className="row">

                        <div className="col-md-6">

                            <form onSubmit={handleOnSubmit}>
                                <input type="text" hidden readOnly value={inputs.language}/>
                                <input type="text" hidden readOnly value={inputs.message_ok}/>
                                <input type="text" hidden readOnly value={inputs.message_error}/>

                                <label htmlFor="name">{t('name_tag')}</label>
                                <input
                                    id="name"
                                    type="text"
                                    onChange={handleOnChange}
                                    required
                                    value={inputs.name}
                                />
                                <label htmlFor="email">{t('email_tag')}</label>
                                <input
                                    id="email"
                                    type="email"
                                    onChange={handleOnChange}
                                    required
                                    value={inputs.email}
                                />
                                <label htmlFor="message">{t('message_tag')}</label>
                                <textarea
                                    id="message"
                                    onChange={handleOnChange}
                                    required
                                    value={inputs.message}
                                />
                                <label htmlFor="privacy" className="privacy-label">
                                    <input
                                        id="privacy"
                                        type="checkbox"
                                        onChange={handleCheckboxOnChange}
                                        required
                                        value={inputs.privacy}
                                    />
                                    <div className="privacy-wrapper">
                                        <span dangerouslySetInnerHTML={{__html: homepage.acf.etiqueta_privacidad}}></span><Modal linkText={t('privacypolicy_title')} title={t('legaltext_title')} content={t('legalnotice')} closetext={t('close')} />*
                                    </div>
                                </label>

                                <div className="submit-btn-container">
                                    <button type="submit" disabled={status.submitting} className="submit-contact-btn">
                                        {!status.submitting
                                            ? !status.submitted
                                                ? t('submit')
                                                : t('submitted')
                                            : t('submitting')}
                                    </button>
                                </div>

                            </form>

                            {status.info.error && (
                                <div className="error">Error: {status.info.msg}</div>
                            )}
                            {!status.info.error && status.info.msg && (
                                <div className="success">{status.info.msg}</div>
                            )}


                        </div>

                        <div className="col-md-6">

                            <div className="Home__contact__content" dangerouslySetInnerHTML={{__html: homepage.acf.informacion_tratamiento_datos}}></div>

                        </div>

                    </div>
                </div>



            </section>



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
                    padding-bottom: 15px;
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
                    position: absolute;
                    right: -70px;
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

                .Home__clients {
                    box-sizing: border-box;
                }

                :global(.swiper-slide) {
                    margin-top: 0!important;
                    margin-right: 15px;
                    margin-bottom: 15px;
                }

                .Home__clients__slider {
                    position: relative;
                }

                .Home__clients__slider-item {
                    max-width: 260px;
                }

                :global(.swiper-container) {
                    padding-bottom: 30px;
                    padding-top: 70px;
                }

                :global(.swiper-wrapper) {
                    padding-bottom: 30px;
                }

                :global(.swiper-button-next) {
                    background: url('/img/next-active.png') no-repeat;
                    background-size: contain;
                    width: 40px;
                    height: 40px;
                    top: 30px;
                    right: 45%;
                }

                :global(.swiper-button-prev) {
                    background: url('/img/prev-active.png') no-repeat;
                    background-size: contain;
                    width: 40px;
                    height: 40px;
                    top: 30px;
                    left: 45%;
                }

                :global(.swiper-button-next:after) {
                    display: none;
                }

                :global(.swiper-button-prev:after) {
                    display: none;
                }

                :global(.swiper-pagination-bullet) {
                    width: 20px;
                    height: 20px;
                }

                :global(.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet) {
                    margin: 0 6px;
                }

                :global(.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction) {
                    bottom: 0;
                }


                .Home__contact {
                    padding-bottom: 70px;
                }

                /* Form styles */
                form {
                    float: left;
                    width: 100%;
                }
                label {
                    float: left;
                    width: 100%;
                    margin-bottom: 5px;

                    color: #666666;
                    font-size: 1rem;
                    font-weight: 500;
                    text-align: left;
                    line-height: 1.3;
                }

                label.privacy-label {
                    font-size: 0.85rem;
                }

                label.privacy-label .privacy-wrapper {
                    float: left;
                    width: calc(100% - 45px);
                    margin-bottom: 30px;
                }

                :global(.privacy-wrapper p) {
                    display: inline;
                }

                input,
                button,
                textarea,
                .error,
                .success {
                    float: left;
                    width: 100%;
                    box-sizing: border-box;

                    margin: 0;
                    margin-bottom: 15px;
                    border: 1px solid #d1d1d1;
                    border-radius: 3px;
                    padding: 0.5em;
                    vertical-align: middle;
                    white-space: normal;
                    background: none;
                    line-height: 1;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: all 0.2s ease;
                }
                input[type=checkbox] {
                    float: left;
                    width: 15px;
                    margin-right: 5px;
                    margin-bottom: 3px;
                }
                button {
                    padding: 0.65em 1em;
                    background: #4a90e2;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    text-transform: uppercase;
                    line-height: 1.3;
                }

                .submit-contact-btn {
                    float: right;
                    width: 100%;
                    max-width: 200px;
                }

                textarea {
                    height: 4em;
                    max-width: 622px;
                }
                input:focus,
                textarea:focus,
                button:focus {
                    outline: 0;
                    border-color: #4a90e2;
                }

                button:hover {
                    background: rgba(0, 118, 255, 0.8);
                }

                button:focus {
                    box-shadow: 0 0 0 2px rgba(0, 118, 255, 0.5);
                }

                :global(
          .bg-darkgray label,
          .bg-darkgray,
          .bg-darkgray .Home__section-title,
          .bg-darkgray input,
          .bg-darkgray textarea
          ) {
                    color: #ffffff;
                }

                :global(.bg-darkgray a) {
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: 600;
                }

                :global(.bg-darkgray button) {
                    background: #ffffff;
                    color: #4a4a4a;
                }

                :global(.bg-darkgray button:hover) {
                    background: #eeeeee;
                }

                :global(.bg-darkgray button:focus) {
                    background: #eeeeee;
                }
                button:disabled {
                    pointer-events: none;
                    background: #999;
                }

                .error,
                .success {
                    padding: 0.65em 1em;
                    color: #fff;
                    border: none;
                    cursor: default;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    line-height: 1.5;
                    text-align: center;
                }

                .error {
                    background: #ee0000;
                }
                .success {
                    background: #4a90e2;
                }
                /* End Form styles */


                .Home__contact__content {
                    float: left;
                    width: 100%;
                    line-height: 1.5;
                    margin-top: 25px;
                }


                @media (max-width: 1200px) {
                    .Home__featured-image {
                        margin-right: 0;
                    }
                }

                @media (max-width: 1024px) {
                    :global(.swiper-button-next) {
                        right: 0;
                    }

                    :global(.swiper-button-prev) {
                        left: 0;
                    }
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

                    .Home__featured-image {
                        padding-top: 30px;
                    }

                    .Home__featured-image img {
                        width: 100%;
                        max-width: 450px;
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

                    .Home__contact__content {
                        margin-top: 50px;
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
                        position: relative;
                        right: 0;
                        margin-bottom: -75px;
                        width: 100%;
                        max-width: 450px;
                    }

                    .Home__services__service {
                        margin-bottom: 30px;
                    }

                    .Home__services__left-column .Home__services__inner-content,
                    .Home__services__right-column .Home__services__inner-content {
                        max-width: 540px;
                        box-sizing: content-box;
                    }

                    .Home__contact__section-padding {
                        padding-left: 50px;
                        padding-right: 50px;
                    }
                }

                @media (max-width: 640px) {
                    :global(.swiper-button-next) {
                        right: 0;
                    }

                    :global(.swiper-button-prev) {
                        left: 0;
                    }

                    .submit-contact-btn {
                        float: none;
                    }

                    .submit-btn-container {
                        text-align: center;
                    }

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
