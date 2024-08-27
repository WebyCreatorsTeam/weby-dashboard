import { FC, useState } from 'react'
import Tiptap from '../../../Components/Tiptap/Tiptap'
import axios from 'axios'
import { API_ENDPOINT } from '../../../../utils/api-connect'
import { useNavigate } from 'react-router-dom'
import SEO from '../../../Components/SEO/SEO'
import UploadFile from '../../../Components/UploadFile/UploadFile'
import Cookies from 'universal-cookie';
import { Button } from '@mui/material'

const cookies = new Cookies();

const AddNewBlog: FC = () => {
    const [title, setTitle] = useState<string>("")
    const [summerry, setSummery] = useState<string>("")
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('לחצ/י על "שמור לתצוגה" על מנת לראות תצוגה מקדימה')
    const [image, setImage] = useState<any>(null)
    const [prevFileShow, setPrevFileShow] = useState<string>("")

    const hendleSavePost = async (draft: boolean) => {
        try {
            setLoader(true)
            const data = new FormData()
            data.append("my_file", image)
            data.append("title", title)
            data.append("summerry", summerry)
            data.append("content", content)
            data.append("draft", String(draft))
            if (content === 'לחצ/י על "שמור לתצוגה" על מנת לראות תצוגה מקדימה' || content.length === 0) return alert('נא ללחוץ על "שמור לתצוגה" לפני השמירה')
            if (!image) return alert("נא לבחור תמונה")
            const token = cookies.get('token')
            const { data: { continueWork } } = await axios.post(`${API_ENDPOINT}/dashboard/blog/add-new-post?token=${token}`, data, {
                headers: {
                    'content-type': "mulpipart/form-data"
                }
            })
            if (continueWork) return navigate("/dashboard/blog", { replace: true });
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    }

    const handleSelectImage = async (ev: React.SyntheticEvent) => {
        try {
            setLoader(true)
            let target = ev.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                setImage(target.files[0])
                setPrevFileShow(URL.createObjectURL(target.files[0]))
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    };

    return (
        <div className='add-post'>
            <SEO title={"הוספת פוסט"} />
            <div className='add-post__editing'>
            <h1>הוספת פוסט</h1>
                <h2>בחירת תמונה</h2>
                <UploadFile loader={loader}
                    handleSelectFile={handleSelectImage}
                    prevFileShow={prevFileShow}
                />
                <input type="text" placeholder='כותרת...' onChange={(ev: any) => setTitle(ev.target.value)} />
                <textarea placeholder='סיכום של הפוסט' onChange={(ev: any) => setSummery(ev.target.value)}></textarea>
                <Tiptap setContent={setContent} content={content} />
                <div className='add-post__btns'>
                    <Button
                        color="secondary"
                        variant="contained"
                        type="button"
                        onClick={() => hendleSavePost(true)}
                        disabled={loader}
                    >
                        {loader ? "כמה רגעים" : "שמור כטיוטה"}
                    </Button>
                    <Button
                        color="secondary"
                        variant="outlined"
                        type="button"
                        onClick={() => hendleSavePost(false)}
                        disabled={loader}
                    >
                        {loader ? "כמה רגעים" : "פרסם"}
                    </Button>
                </div>
            </div>
            <div className='add-post__preview'>
                {prevFileShow.length > 0 && (
                    <div>
                        <img src={prevFileShow} alt="project small header" width={600} />
                        <Button onClick={() => {
                            setImage('')
                            setPrevFileShow('')
                        }}>מחק תמונה</Button>
                    </div>
                )}
                <h1>{title}</h1>
                <p>{summerry}</p>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </div>
    )
}

export default AddNewBlog