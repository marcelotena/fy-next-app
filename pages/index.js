import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import fetch from 'isomorphic-unfetch'
import {WP_REST_API, FY_CUSTOM_API} from "../utils/constants"
import Link from 'next/link'
import { Container, Row, Col } from 'react-grid-system'
import Swiper from 'react-id-swiper'


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



const Home = ({ primarymenu, homepage, homepagefeaturedimage, invoices, logo }) => {


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
        privacy: ''
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
                privacy: ''
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

    const handleOnSubmit = async e => {
        e.preventDefault()
        setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
        const res = await fetch('/api/send', {
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
                <title>Home</title>
                <link rel='icon' href='/favicon.ico' />
                <link rel='stylesheet' href='/css/swiper.min.css' />
            </Head>

            <Nav logo={logo.guid.rendered} menu={primarymenu.data.items} />

            <section className='Home__hero'>
                <Container>

                    <Row>
                        <Col md={6}>
                            <h1 className='Home__title'>{homepage.title.rendered}</h1>
                            <div className='Home__content' dangerouslySetInnerHTML={{__html: homepage.content.rendered}}></div>
                        </Col>

                        <Col md={6}>
                            <div className="Home__featured-image">
                                <img src={homepagefeaturedimage.media_details.sizes.full.source_url} alt={homepagefeaturedimage.alt_text}/>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>




            <section className='Home__services'>

                <div className="Home__services__left-column">

                    <div className="Home__services__inner-content Home__section-padding">
                        {homepage.acf.servicios_destacados.map((service, index) => {
                            return (
                                <div className="Home__services__service" key={index}>
                                    <Row>

                                        <Col sm={4}>
                                            <div className="Home__services__icon-container" dangerouslySetInnerHTML={{__html: service.icono}}></div>
                                        </Col>
                                        <Col sm={8}>
                                            <h2 className="Home__services__service-title">{service.titulo_del_servicio}</h2>
                                            <p className="Home__services__service-content">{service.descripcion_del_servicio}</p>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <div className="Home__services__right-column">

                    <div className="Home__services__inner-content Home__section-padding">
                        <h2 className="Home__section-title">{homepage.acf.titulo_seccion_servicios}</h2>
                        <div className='Home__section-content' dangerouslySetInnerHTML={{__html: homepage.acf.presentacion_servicios}}></div>
                    </div>

                </div>



            </section>




            <section className="Home__clients Home__section-padding bg-lightgray">

                <Container>

                    <Row>
                        <Col md={12}>

                            <h2 className="Home__section-title block-center">{homepage.acf.titulo_seccion_clientes}</h2>

                        </Col>
                    </Row>


                    <Row>
                        <Col md={12}>


                            <div className="Home__clients__slider">

                                <Swiper {...params}>

                                    {homepage.acf.clientes.map((client, index2) => {
                                        return (
                                            <img className="Home__clients__slider-item" src={client.logotipo.url} alt={client.nombre} title={client.nombre} key={index2} />
                                        )
                                    })}

                                </Swiper>

                            </div>

                        </Col>
                    </Row>

                </Container>

            </section>







            <section className="Home__contact bg-darkgray">

                <Container>
                    <Row>

                        <Col md={12}>

                            <div className="Home__section-padding">
                                <h2 className="Home__section-title block-center">{homepage.acf.titulo_seccion_contacto}</h2>
                            </div>

                        </Col>

                    </Row>
                </Container>

                <Container>
                    <Row>

                        <Col md={6}>

                            <form onSubmit={handleOnSubmit}>
                                <label htmlFor="name">Name*</label>
                                <input
                                    id="name"
                                    type="text"
                                    onChange={handleOnChange}
                                    required
                                    value={inputs.name}
                                />
                                <label htmlFor="email">Email*</label>
                                <input
                                    id="email"
                                    type="email"
                                    onChange={handleOnChange}
                                    required
                                    value={inputs.email}
                                />
                                <label htmlFor="message">Message*</label>
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
                                        onChange={handleOnChange}
                                        required
                                        value={inputs.privacy}
                                    />
                                    The data you provide will be processed by FAST AND YOURS, S.L.U. for the purpose of managing your suggestion, claim, question or request for information. The data will be processed according to our contractual relationship with you, and your data will not be disclosed to third parties. You can access, rectify and erase the data, and exercise other rights, as explained in our <a
                                    href="#">Privacy Policy</a>*
                                </label>
                                <button type="submit" disabled={status.submitting} className="submit-contact-btn">
                                    {!status.submitting
                                        ? !status.submitted
                                            ? 'Submit'
                                            : 'Submitted'
                                        : 'Submitting...'}
                                </button>
                            </form>
                            {status.info.error && (
                                <div className="error">Error: {status.info.msg}</div>
                            )}
                            {!status.info.error && status.info.msg && (
                                <div className="success">{status.info.msg}</div>
                            )}

                        </Col>

                    </Row>
                </Container>



            </section>





            <Container style={{display: 'none'}}>


                <Row>
                    <Col md={12}>

                        <ul>
                            {invoices.map(post => {
                                return (
                                    <li key={post.id}>
                                        <Link href='/invoices/[slug]' as={`invoices/${post.slug}`}>
                                            <a>
                                                <div className="text-content">
                                                    <h2 className='archive-title'>{post.title.rendered}</h2>
                                                </div>

                                            </a>
                                        </Link>

                                    </li>
                                )
                            })}
                        </ul>

                    </Col>
                </Row>


            </Container>

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

          :global(.bg-lightgray) {
            background: #f6f6f6;
          }

          :global(.bg-darkgray) {
            background: #4a4a4a;
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
            font-family: Helvetica, Arial, sans-serif;
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
            font-size: 3rem; /* 48px */
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
            margin-right: -70px;
            width: 100%;
            max-width: 600px;
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
            display: grid;
            grid-row-gap: 1em;
          }
          label {
            color: #666666;
            font-size: 1rem;
            font-weight: 500;
            text-align: left;
            line-height: 1.3;
          }

          label.privacy-label {
            font-size: 0.85rem;
          }

          input,
          button,
          textarea,
          .error,
          .success {
            margin: 0;
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
            margin-right: 10px;
            margin-bottom: 5px;
          }
          button,
          .error,
          .success {
            padding: 0.65em 1em;
            background: #4a90e2;
            color: #fff;
            border: none;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            text-transform: uppercase;
          }

          .submit-contact-btn {
            justify-self: end;
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
            background: #ee0000;
            color: #fff;
            margin-top: 16px;
            text-align: center;
          }
          .success {
            background: #7928CA
          }
          /* End Form styles */




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
                width: 100%;
                max-width: 450px;
              }

              .Home__services__service {
                margin-bottom: 30px;
              }
          }

          @media (max-width: 640px) {
            :global(.swiper-button-next) {
              right: 0;
            }

            :global(.swiper-button-prev) {
              left: 0;
            }
          }

        `}</style>
        </div>
    );

}





Home.getInitialProps = async () => {
    // Header logo, selected in WordPress/Appearance/Customization
    const logoResponse = await fetch((`${FY_CUSTOM_API}/logo`))
    const logo = await logoResponse.json()

    // Primary menu, change ID with your primary menu
    const primarymenuId = 3
    const primarymenuResponse = await fetch(`${WP_REST_API}/menus/${primarymenuId}`)
    const primarymenu = await primarymenuResponse.json()

    // Get WordPress current page that is set as front-page
    const homepageResponse = await fetch(`${FY_CUSTOM_API}/frontpage`)
    const homepage = await homepageResponse.json()

    // Fetch Homepage featured image when we have its ID
    const homepagefeaturedimageResponse = await fetch(`${WP_REST_API}/media/${homepage["featured_media"]}`)
    const homepagefeaturedimage = await homepagefeaturedimageResponse.json()

    // CPT call, Invoices
    const invoicesResponse = await fetch(`${WP_REST_API}/invoices`)
    const invoices = await invoicesResponse.json()

    return { logo, primarymenu, homepage, homepagefeaturedimage, invoices }
}

export default Home
