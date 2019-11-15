import {WP_REST_API} from "../../utils/constants"
import Invoice from "../../components/Invoice"
import Nav from "../../components/nav";
import React from "react";

const SinglePost = ({ post }) => (
    <div>

        <Nav />

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

    return { post: post[0] }
}

export default SinglePost