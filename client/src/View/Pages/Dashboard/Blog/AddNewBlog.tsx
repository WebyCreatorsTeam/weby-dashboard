import { FC, useState } from 'react'
import Tiptap from '../../../Components/Tiptap/Tiptap'
import axios from 'axios'
import { API_ENDPOINT } from '../../../../utils/api-connect'
import { useNavigate } from 'react-router-dom'
import SEO from '../../../Components/SEO/SEO'
import UploadFile from '../../../Components/UploadFile/UploadFile'
// import { UploadFile } from '@mui/icons-material'

const AddNewBlog: FC = () => {
    const [title, setTitle] = useState<string>("")
    const [summerry, setSummery] = useState<string>("")
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('לחצ/י על "שמור לתצוגה" על מנת לראות תצוגה מקדימה')
    const [postBigImg, setPostBigImg] = useState<string>('')
    const [postSmallImg, setPostSmallImg] = useState<string>('')
    // const [prevFileShow, setPrevFileShow] = useState<string>("")

    console.log(postBigImg)
    console.log(postSmallImg)
    const hendleSavePost = async (draft: boolean) => {
        try {
            setLoader(true)
            if (content === 'לחצ/י על "שמור לתצוגה" על מנת לראות תצוגה מקדימה' || content.length === 0) return alert('נא ללחוץ על "שמור לתצוגה" לפני השמירה')
            // if (!postImg) return alert("נא לבחור תמונה")
            const token = sessionStorage.getItem('token')
            const { data: { continueWork } } = await axios.post(`${API_ENDPOINT}/dashboard/blog/add-new-post?token=${token}`, { title, content, draft, summerry, postBigImg, postSmallImg })
            if (continueWork) return navigate("/dashboard/blog", { replace: true });
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    }

    const handleSelectBigImage = async (ev: React.SyntheticEvent) => {
        try {
            setLoader(true)
            let target = ev.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const imgData = new FormData()
                imgData.append("my_file", target.files[0])
                const token = sessionStorage.getItem('token')
                const { data: { continueWork, url } } = await axios.post(`${API_ENDPOINT}/dashboard/blog/add-image-post?token=${token}&oldUrl=${postSmallImg}`, imgData, { headers: { 'content-type': "mulpipart/form-data" } })
                if (continueWork) {
                    return setPostBigImg(url)
                    // return setPrevFileShow(url);
                }
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    };
    const handleSelectSmallImage = async (ev: React.SyntheticEvent) => {
        try {
            setLoader(true)
            let target = ev.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const imgData = new FormData()
                imgData.append("my_file", target.files[0])
                const token = sessionStorage.getItem('token')
                const { data: { continueWork, url } } = await axios.post(`${API_ENDPOINT}/dashboard/blog/add-image-post?token=${token}&oldUrl=${postSmallImg}`, imgData, { headers: { 'content-type': "mulpipart/form-data" } })
                if (continueWork) {
                    return setPostSmallImg(url)
                    // return setPrevFileShow(url);
                }
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    };

    const hendleDeletePostImage = async (img: string) => {
        try {
            setLoader(true)
            const token = sessionStorage.getItem('token')
            const { data: { continueWork, url } } = await axios.patch(`${API_ENDPOINT}/dashboard/blog/delete-image-post?token=${token}`, { postImg: img })
            if (continueWork) return alert("תמונה נמחקה")
            // setPostImg(url)
            // delete-image-post
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className='add-post'>
            <SEO title={"הוספת פוסט"} />
            <div className='add-post__editing'>
                <h2>הוספת תמונה גדולה (לפוסט עצמו)</h2>
                <UploadFile loader={loader} handleSelectFile={handleSelectBigImage} prevFileShow={postBigImg} />
                <h2> הוספת תמונה קטנה (לרשימת פוסטים)</h2>
                <UploadFile loader={loader} handleSelectFile={handleSelectSmallImage} prevFileShow={postSmallImg} />
                <input type="text" placeholder='כותרת...' onChange={(ev: any) => setTitle(ev.target.value)} />
                <textarea placeholder='סיכום של הפוסט' onChange={(ev: any) => setSummery(ev.target.value)}></textarea>
                <Tiptap setContent={setContent} content={content} />
            </div>
            <div className='add-post__preview'>
                <div>
                    <h2>תצוגה מקדימה</h2>
                    <h4>על מנת לשמור את השינויים חשוב ללחוץ על "שמור לתצוגה"</h4>
                </div>
                <div>
                    <div>
                        <p>תמונה קטנה</p>
                        {postSmallImg.length > 0 && (
                            <img src={postSmallImg} alt="project small header" width={600} />
                        )}
                        <button onClick={()=>hendleDeletePostImage(postSmallImg)}>מחק תממונה קטנה</button>
                    </div>
                    <div>
                        <p>תמונה גדולה</p>
                        {postBigImg.length > 0 && (
                            <img src={postBigImg} alt="project big header" width={600} />
                        )}
                        <button onClick={()=>hendleDeletePostImage(postBigImg)}>מחק תממונה גדולה</button>
                    </div>
                    <h2>{title}</h2>
                    {summerry && (
                        <div className='summery'>
                            <h4>tl:dr</h4>
                            <p>{summerry}</p>
                        </div>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </div>
            <div className='add-post__btns'>
                <button type="button" onClick={() => hendleSavePost(true)} disabled={loader}>
                    {loader ? "כמה רגעים" : "שמור כטיוטה"}
                </button>
                <button type="button" onClick={() => hendleSavePost(false)} disabled={loader}>
                    {loader ? "כמה רגעים" : "פרסם"}
                </button>
            </div>
        </div>
    )
}

export default AddNewBlog