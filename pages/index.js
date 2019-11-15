import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import fetch from 'isomorphic-unfetch'
import {WP_REST_API} from "../utils/constants"
import Link from 'next/link'

const Home = ({ posts }) => (
    <div>
        <Head>
            <title>Home</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <Nav />

        <div className='container'>
            <ul>
                {posts.map(post => {
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

        <style jsx>{`
          .container {
            width: 1024px;
            max-width: 100%;
            margin: 0 auto;
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
        `}</style>
    </div>
)


Home.getInitialProps = async () => {
    // En servidor
    const response = await fetch(`${WP_REST_API}/invoices`)
    const posts = await response.json()

    return { posts }
}

export default Home
