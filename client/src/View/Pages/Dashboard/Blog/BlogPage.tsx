import axios from 'axios'
import { FC, Suspense } from 'react'
import { Await, Link, defer, useLoaderData } from 'react-router-dom'
import { API_ENDPOINT } from '../../../../utils/api-connect'
import SEO from '../../../Components/SEO/SEO'

export interface IBlog {
    title: string
    content: string
    draft: boolean
    _id: string
    tldr?: string
    img: string
}

const BlogPage: FC = () => {
    const { blog } = useLoaderData() as { blog: Array<IBlog> }

    return (
        <div>
            <SEO title={"בלוג"} />
            <Link to="/dashboard/blog/add-new-blog">הוספת פוסט חדש</Link>
            <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
                <Await resolve={blog}>
                    {blog.length > 0 ?
                        blog.map(bl => (
                            <div key={bl._id}>
                                <p>{bl.draft ? "שמור כטיוטה" : "פורסם באתר"}</p>
                                <img src={bl.img} alt="post" />
                                <Link to={`/dashboard/blog/post/${bl._id}`}>
                                    {/* קרא עוד {'>'} */}
                                    <h2>{bl.title}</h2>
                                </Link>
                                <div >{bl.content}...</div>
                                <Link to={`/dashboard/blog/post/${bl._id}`}>
                                    המשך קריאה {'>'}
                                </Link>
                                <Link to={`/dashboard/blog/post/edit/${bl._id}`}>עריכת פוסט</Link>
                            </div>
                        ))
                        : <>אין כתבות...</>}
                </Await>
            </Suspense>
        </div>
    )
}

export default BlogPage

const handleGetBlog = async () => {
    const token = sessionStorage.getItem('token')
    const { data: { continueWork, blog } } = await axios.get(`${API_ENDPOINT}/dashboard/blog/get-blog?token=${token}`)
    if (continueWork) return blog
}

export const blogLoader = async () => {
    return defer({
        blog: await handleGetBlog()
    })
}