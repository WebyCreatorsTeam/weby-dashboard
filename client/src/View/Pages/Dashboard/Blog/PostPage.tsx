import React, { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { IBlog } from './BlogPage'
import SEO from '../../../Components/SEO/SEO'

const PostPage = () => {
    const { post } = useLoaderData() as { post: IBlog }

    return (
        <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
            <Await resolve={post}>
                <SEO title={post.title} />
                <div>
                    <p>{post.draft ? "שמור כטיוטה" : "מוצג באתר"}</p>
                    <img src={post.coverImg} alt="post" />
                    <div>
                        <h4>tl:dr</h4>
                        <p>{post.tldr}</p>
                    </div>
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </div>
            </Await>
        </Suspense>
    )
}

export default PostPage