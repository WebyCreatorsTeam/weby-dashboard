import React, { useState } from 'react'
import RichTextEdit from '../../../UI/RichTextEdit/RichTextEdit'
import { IBlogContact } from '../../../UI/RichTextEdit/richTextInterface'
import RichTextContent from '../../../UI/RichTextEdit/RichTextContent'
import RichBeach from '../../../UI/RichTextEdit/RichBeach'

const BlogPage = () => {
    const [blogContext, setBlogContext] = useState<IBlogContact>({ title: "", body: { value: "" } })

    console.log(blogContext)
    return (
        <div>
            <h1>הוספת בלוג חדש</h1>
            <form>
                <input type="text" name="postTitle" placeholder="כותרת הפוסט" onChange={(ev: any) => setBlogContext((blog) => { return { ...blog, title: ev.target.value } })} />
                {/* <RichTextEdit blogContext={blogContext} setBlogContext={setBlogContext} />
                <RichTextContent /> */}
                <RichBeach />
                <button type="submit">שמור כטיוטה</button>
                <button type="submit">פרסם</button>
            </form>
        </div>
    )
}

export default BlogPage