import React, { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { IBlog } from './BlogPage'

const PostPage = () => {
    const { post } = useLoaderData() as { post: IBlog }
    console.log(post)

    return (
        <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
            <Await resolve={post}>
                <div>Post</div>
                <div>PostPage</div>
            </Await>
        </Suspense>
    )
}

export default PostPage