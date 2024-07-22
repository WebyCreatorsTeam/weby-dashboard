import axios from 'axios'
import { FC, Suspense } from 'react'
import { Await, Link, defer, useLoaderData } from 'react-router-dom'
import { API_ENDPOINT } from '../../../../utils/api-connect'
import SEO from '../../../Components/SEO/SEO'
import Cookies from 'universal-cookie';
import { Button } from '@mui/material'

const cookies = new Cookies();

export interface IBlog {
    title: string
    content: string
    draft: boolean
    _id: string
    tldr?: string
    coverImg: string
    smallImg: string
}

const BlogPage: FC = () => {
    const { blog } = useLoaderData() as { blog: Array<IBlog> }

    return (
        <div className='container blog'>
            <SEO title={"בלוג"} />
            <Link to="/dashboard/blog/add-new-blog">
                <Button color="secondary" variant="contained">
                    הוספת פוסט חדש
                </Button>
            </Link>
            <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
                <Await resolve={blog}>
                    <h1>בלוג</h1>
                    <section className='blog__posts-section'>
                        {blog.length > 0 ?
                            blog.map(bl => (
                                <div key={bl._id} className='blog__posts-section--post-item'>
                                    <p style={{ color: bl.draft ? "red" : "green" }}>{bl.draft ? "שמור כטיוטה" : "פורסם באתר"}</p>
                                    <img src={bl.smallImg} alt={`איור פוסט ${bl.title} `} />
                                    <Link to={`/dashboard/blog/post/${bl._id}`}>
                                        <h2>{bl.title}</h2>
                                    </Link>
                                    <div >{bl.content}...</div>
                                    <div className='blog__posts-section--actionBtns'>
                                        <Link to={`/dashboard/blog/post/${bl._id}`}>
                                            המשך קריאה {'>'}
                                        </Link>
                                        {bl.draft === false && <a href={`https://www.weby.team/blog/post/661e8813c6c334285716c1d4`}>פוסט באתר</a>}

                                        <Link to={`/dashboard/blog/post/edit/${bl._id}`}>עריכת פוסט</Link>
                                    </div>
                                </div>
                            ))
                            : <>אין כתבות...</>}
                    </section>
                </Await>
            </Suspense>
        </div>
    )
}

export default BlogPage

const handleGetBlog = async () => {
    const token = cookies.get('token')
    const { data: { continueWork, blog } } = await axios.get(`${API_ENDPOINT}/dashboard/blog/get-blog?token=${token}`)
    if (continueWork) return blog
}

export const blogLoader = async () => {
    return defer({
        blog: await handleGetBlog()
    })
}