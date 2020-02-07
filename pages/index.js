import React from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import fetch from 'isomorphic-unfetch'
import {WP_REST_API, FY_CUSTOM_API} from "../utils/constants"
import Link from 'next/link'
import { Container, Row, Col } from 'react-grid-system'

const Home = ({ primarymenu, homepage, homepagefeaturedimage, invoices, logo }) => (
    <div className="wrapper">
        <Head>
            <title>Home</title>
            <link rel='icon' href='/favicon.ico' />
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
                            <div className="Home__services__service">
                                <Row key={index}>

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

        `}</style>
    </div>
)


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
