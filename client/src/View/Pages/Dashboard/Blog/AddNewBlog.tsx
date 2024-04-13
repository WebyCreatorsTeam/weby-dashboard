import { FC, useState } from 'react'
import Tiptap from '../../../Components/Tiptap/Tiptap'
import axios from 'axios'
import { API_ENDPOINT } from '../../../../utils/api-connect'
import { useNavigate } from 'react-router-dom'

const AddNewBlog: FC = () => {
    const [title, setTitle] = useState<string>("")
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('לחצ/י על "שמור לתצוגה" על מנת לראות תצוגה מקדימה')

    const hendleSavePost = async (draft: boolean) => {
        try {
            setLoader(true)
            if (content === 'לחצ/י על "שמור לתצוגה" על מנת לראות תצוגה מקדימה' || content.length === 0) return alert('נא ללחוץ על "שמור לתצוגה" לפני השמירה')
            const token = sessionStorage.getItem('token')
            const { data: { continueWork } } = await axios.post(`${API_ENDPOINT}/dashboard/blog/add-new-post?token=${token}`, { title, content, draft })
            if (continueWork) return navigate("/dashboard/blog", { replace: true });
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <div>
            <input type="text" placeholder='כותרת...' onChange={(ev: any) => setTitle(ev.target.value)} />
            <Tiptap setContent={setContent} />
            <div>
                <h2>תצוגה מקדימה</h2>
                <h4>על מנת לשמור את השינויים חשוב ללחוץ על "שמור לתצוגה"</h4>
                <div>
                    <h2>{title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </div>
            <button type="button" onClick={() => hendleSavePost(true)} disabled={loader}>
                {loader ? "כמה רגעים" : "שמור כטיוטה"}
            </button>
            <button type="button" onClick={() => hendleSavePost(false)} disabled={loader}>
                {loader ? "כמה רגעים" : "פרסם"}
            </button>
        </div>
    )
}

export default AddNewBlog