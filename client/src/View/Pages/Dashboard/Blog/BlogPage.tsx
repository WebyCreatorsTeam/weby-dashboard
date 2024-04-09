import { FC } from 'react'
import { Link } from 'react-router-dom'

const BlogPage: FC = () => {
    return (
        <div>
            <Link to="/dashboard/blog/add-new-blog">הוספת פוסט חדש</Link>
        </div>
    )
}

export default BlogPage