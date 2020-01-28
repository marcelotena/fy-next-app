import React from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import fetch from 'isomorphic-unfetch'
import {WP_REST_API, FY_CUSTOM_API} from "../utils/constants"
import Link from 'next/link'

const Home = ({ primarymenu, homepage, homepagefeaturedimage, invoices, logo }) => (
    <div className="wrapper">
        <Head>
            <title>Home</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <Nav logo={logo.guid.rendered} menu={primarymenu.data.items} />

        <section className='Home__hero'>
            <div className="container">

                <div className="row">
                    <div className="column">
                        <h1 className='Home__title'>{homepage.title.rendered}</h1>
                        <div className='Home__content' dangerouslySetInnerHTML={{__html: homepage.content.rendered}}></div>
                    </div>

                    <div className="column">
                        <div className="Home__featured-image">
                            <img src={homepagefeaturedimage.media_details.sizes.full.source_url} alt={homepagefeaturedimage.alt_text}/>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <div className='container'>


            <div className="row">
                <div className="column">

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

                </div>
            </div>


        </div>

        { /*language=CSS*/ }
        <style jsx>{`
          :global(.container) {
            width: 100%;
            padding-left: 30px;
            padding-right: 30px;
            max-width: 1140px;
            margin: 0 auto;
          }

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
            font-size: 48px;
            line-height: 1.35;
            max-width: 450px;
            margin-bottom: 20px;
          }

          .Home__content {
            color: white;
            font-size: 24px;
            font-weight: 500;
            line-height: 1.5;
            max-width: 500px;
          }

          .Home__featured-image {
            margin-right: -70px;
            width: 100%;
            max-width: 600px;
          }

          :global(.row) {
            display: flex;
            justify-content: space-between;
            margin-left: -30px;
            margin-right: -30px;
          }

          @media (max-width: 1200px) {
              .Home__featured-image {
                margin-right: 0;
              }
          }

          @media (max-width: 991px) {
              .Home__title {
                font-size: 38px;
                line-height: 1.30;
                margin-bottom: 10px;
                margin-top: 15px;
              }

              .Home__content {
                font-size: 18px;
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
          }

          @media (max-width: 767px) {
              :global(.row) {
                flex-direction: column;
              }

              .Home__title {
                text-align: center;
                margin-left: auto;
                margin-right: auto;
              }

              .Home__content {
                text-align: center;
                margin-left: auto;
                margin-right: auto;
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
          }

          :global(.column) {
            float: left;
            width: 100%;
            padding-left: 30px;
            padding-right: 30px;
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
