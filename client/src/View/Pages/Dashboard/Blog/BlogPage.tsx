import { FC, useState } from 'react'
import Tiptap from '../../../Components/Tiptap/Tiptap'
import Tinymce from '../../../Components/Tinymce/Tinymce'

const BlogPage: FC = () => {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("לחצ/י על שמור על מנת לראות תצוגה מקדימה")

    const hendleSavePost = () => {
        const post = { title, content }
        console.log(post)
    }
    console.log(content)
    return (
        <div>
            <Tinymce />
            {/* <input type="text" placeholder='כותרת...' onChange={(ev: any) => setTitle(ev.target.value)} />
            <Tiptap setContent={setContent} />
            <div>
                <h2>תצוגה מקדימה</h2> <h4>על מנת לשמור את השינויים חשוב לשמור את העריכה</h4>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <button type="button" onClick={hendleSavePost}>שמור</button> */}
        </div>
    )
}

export default BlogPage