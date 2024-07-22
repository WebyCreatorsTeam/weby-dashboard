import { Suspense, useState } from 'react'
import { Await, useLoaderData, useNavigate } from 'react-router-dom'
import { IBlog } from './BlogPage'
import SEO from '../../../Components/SEO/SEO'
import Tiptap from '../../../Components/Tiptap/Tiptap'
import axios from 'axios'
import { API_ENDPOINT } from '../../../../utils/api-connect'
import UploadFile from '../../../Components/UploadFile/UploadFile'
import Cookies from 'universal-cookie';
import { Button } from '@mui/material'

const cookies = new Cookies();

const EditPost = () => {
    const { post } = useLoaderData() as { post: IBlog }
    const [title, setTitle] = useState<string>(post.title)
    const [summerry, setSummery] = useState<string | undefined>(post.tldr)
    const [image, setImage] = useState<any>(post.coverImg ? post.coverImg : "")
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const [content, setContent] = useState<string>(post.content)

    const hendleUpdatePost = async (draft: boolean) => {
        try {
            setLoader(true)
            if (content.length === 0) return alert('נא ללחוץ על "שמור לתצוגה" לפני השמירה')
            const token = cookies.get('token')
            const { data: { continueWork } } = await axios.patch(`${API_ENDPOINT}/dashboard/blog/update-post?token=${token}`, { title, content, draft, summerry, id: post._id })
            if (continueWork) return navigate("/dashboard/blog", { replace: true });
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    }

    const hendleDeleteUpdatePost = async () => {
        try {
            if (window.confirm("האם את/ה בטוח/ה שאת/ה רוצה למחוק פוסט זה?")) {
                if (prompt('נא להכניס מילה "תמחק"') === "תמחק") {
                    setLoader(true)
                    const token = cookies.get('token')
                    const { data: { continueWork } } = await axios.delete(`${API_ENDPOINT}/dashboard/blog/delete-post?token=${token}`, { data: { id: post._id } })
                    if (continueWork) return navigate("/dashboard/blog", { replace: true });
                }
            }
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
                const data = new FormData()
                data.append("my_file", target.files[0])
                const token = cookies.get('token')
                const { data: { continueWork, url } } = await axios.patch(`${API_ENDPOINT}/dashboard/blog/change-image-post?token=${token}&postId=${post._id}`, data, {
                    headers: {
                        'content-type': "mulpipart/form-data"
                    }
                })
                if (continueWork) {
                    return setImage(url)
                }
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    };

    return (
        <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
            <Await resolve={post}>
                <div className='add-post'>
                    <SEO title={post.title} />
                    <div className='add-post__editing'>
                        <h1>עריכת פוסט</h1>
                        <p>{post.draft ? "שמור כטיוטה" : "מוצג באתר"}</p>
                        <h2>בחירת תמונה</h2>
                        <UploadFile loader={loader}
                            handleSelectFile={handleSelectImage}
                            prevFileShow={image}
                        />
                        <input type="text" placeholder='כותרת...' defaultValue={title} onChange={(ev: any) => setTitle(ev.target.value)} />
                        <textarea placeholder='סיכום של הפוסט' defaultValue={summerry} onChange={(ev: any) => setSummery(ev.target.value)}></textarea>
                        <Tiptap setContent={setContent} content={content} />
                        <div className='add-post__btns'>
                            <Button
                                color="secondary"
                                variant="contained"
                                type="button"
                                onClick={() => hendleUpdatePost(true)}
                                disabled={loader}
                            >
                                {loader ? "כמה רגעים" : "שמור כטיוטה"}
                            </Button>
                            <Button
                                color="secondary"
                                variant="outlined"
                                type="button"
                                onClick={() => hendleUpdatePost(false)}
                                disabled={loader}
                            >
                                {loader ? "כמה רגעים" : "פרסם"}
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                type="button"
                                onClick={hendleDeleteUpdatePost}
                                disabled={loader}
                            >
                                {loader ? "כמה רגעים" : "מחיקת פוסט"}
                            </Button>
                        </div>
                    </div>
                    <div className='add-post__preview'>
                        {image.length > 0 && (
                            <div>
                                <img src={image} alt="project small header" width={600} />
                            </div>
                        )}
                        <h1>{title}</h1>
                        <p>{summerry}</p>
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                </div>
            </Await>
        </Suspense>
    )
}

export default EditPost