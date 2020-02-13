import {FY_CUSTOM_API, WP_REST_API} from "../../utils/constants"
import Invoice from "../../components/Invoice"
import Nav from "../../components/Nav";
import React from "react";
import fetch from "isomorphic-unfetch";

const SinglePost = ({ post, logo }) => (
    <div>

        <Nav logo={logo.guid.rendered} />

        <div className="container">
            <Invoice post={post}></Invoice>
        </div>

        <style jsx>{`
            .container {
                width: 1024px;
                max-width: 100%;
                margin: 0 auto;
            }
        `}</style>
    </div>
)

SinglePost.getInitialProps = async ({ query }) => {
    const { slug } = query
    const res = await fetch(`${WP_REST_API}/invoices?slug=${slug}`)
    const post = await res.json()

    const logoresponse = await fetch((`${FY_CUSTOM_API}/logo`))
    const logo = await logoresponse.json()

    return { post: post[0], logo }
}

export default SinglePost