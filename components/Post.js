import { Component } from 'react'

export default class Post extends Component {


    render() {
        const { post } = this.props

        return (
            <div className='Post'>
                <h1 className='Post__title'>{post.title.rendered}</h1>
                <img className='Post__featured-image' src={post.jetpack_featured_media_url}/>

                <style jsx>{`
                    .Post__featured-image {
                        width: 100%;
                    }
                `}</style>
            </div>
        )
    }
}