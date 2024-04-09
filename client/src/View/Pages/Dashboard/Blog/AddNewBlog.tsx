import React, { useState } from 'react'
import Tiptap from '../../../Components/Tiptap/Tiptap'

const AddNewBlog = () => {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>('לחצ/י על "שמור לתצוגה" על מנת לראות תצוגה מקדימה')

    const hendleSavePost = () => {
        const post = { title, content }
        console.log(post)
    }

    return (
        <div>
            <input type="text" placeholder='כותרת...' onChange={(ev: any) => setTitle(ev.target.value)} />
            <Tiptap setContent={setContent} />
            <div>
                <h2>תצוגה מקדימה</h2>
                <h4>על מנת לשמור את השינויים חשוב ללחוץ על "שמור לתצוגה"</h4>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <button type="button" onClick={hendleSavePost}>שמור כטיוטה</button>
            <button type="button" onClick={hendleSavePost}>פרסם</button>
        </div>
    )
}

export default AddNewBlog