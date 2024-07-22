import { Suspense, useState } from 'react'
import { Await, useLoaderData, useNavigate } from 'react-router-dom'
import { IBlog } from './BlogPage'
import SEO from '../../../Components/SEO/SEO'
import Tiptap from '../../../Components/Tiptap/Tiptap'
import axios from 'axios'
import { API_ENDPOINT } from '../../../../utils/api-connect'
import UploadFile from '../../../Components/UploadFile/UploadFile'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const EditPost = () => {
    const { post } = useLoaderData() as { post: IBlog }
    const [title, setTitle] = useState<string>(post.title)
    const [summerry, setSummery] = useState<string | undefined>(post.tldr)
    const [postBigImg, setPostBigImg] = useState<string>(post.coverImg ? post.coverImg : "")
    const [postSmallImg, setPostSmallImg] = useState<string>(post.smallImg ? post.coverImg : "")
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const [content, setContent] = useState<string>(post.content)

    const hendleUpdatePost = async (draft: boolean) => {
        try {
            setLoader(true)
            if (content.length === 0) return alert('נא ללחוץ על "שמור לתצוגה" לפני השמירה')
            const token = cookies.get('token')
            const { data: { continueWork } } = await axios.patch(`${API_ENDPOINT}/dashboard/blog/update-post?token=${token}`, { title, content, draft, summerry, id: post._id, postBigImg, postSmallImg })
            if (continueWork) return navigate("/dashboard/blog", { replace: true });
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    }

    const hendleDeleteUpdatePost = async () => {
        try {
            if (window.confirm("האם את/ה בטוח/ה שאת/ה רוצה למחוק לקוח זה?")) {
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

    const handleSelectBigImage = async (ev: React.SyntheticEvent) => {
        try {
            setLoader(true)
            let target = ev.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const imgData = new FormData()
                imgData.append("my_file", target.files[0])
                const token = cookies.get('token')
                const { data: { continueWork, url } } = await axios.post(`${API_ENDPOINT}/dashboard/blog/add-image-post?token=${token}&oldUrl=${postBigImg}`, imgData, { headers: { 'content-type': "mulpipart/form-data" } })
                if (continueWork) {
                    return setPostBigImg(url)
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
                const token = cookies.get('token')
                const { data: { continueWork, url } } = await axios.post(`${API_ENDPOINT}/dashboard/blog/add-image-post?token=${token}&oldUrl=${postSmallImg}`, imgData, { headers: { 'content-type': "mulpipart/form-data" } })
                if (continueWork) {
                    return setPostSmallImg(url)
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
            const token = cookies.get('token')
            const { data: { continueWork } } = await axios.patch(`${API_ENDPOINT}/dashboard/blog/delete-image-post?token=${token}`, { id: post._id, postImg: img })
            // , url
            if (continueWork) return alert("תמונה נחמקה")
        } catch (error) {
            alert(error)
        } finally {
            setLoader(false)
        }
    }
    return (
        <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
            <Await resolve={post}>
                <div className='add-post'>
                    <SEO title={post.title} />
                    <div className='add-post__editing'>
                        <p>{post.draft ? "שמור כטיוטה" : "מוצג באתר"}</p>
                        <h2>הוספת תמונה גדולה (לפוסט עצמו) - 960*540</h2>
                        <UploadFile loader={loader} handleSelectFile={handleSelectBigImage} prevFileShow={postBigImg} />
                        <h2> הוספת תמונה קטנה (לרשימת פוסטים) - 320*180</h2>
                        <UploadFile loader={loader} handleSelectFile={handleSelectSmallImage} prevFileShow={postSmallImg} />
                        <input type="text" placeholder='כותרת...' defaultValue={title} onChange={(ev: any) => setTitle(ev.target.value)} />
                        <textarea placeholder='סיכום של הפוסט' defaultValue={summerry} onChange={(ev: any) => setSummery(ev.target.value)}></textarea>
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
                                    <>
                                        <img src={postSmallImg} alt="project small header" width={600} />
                                        <button onClick={() => hendleDeletePostImage(postSmallImg)}>מחק תממונה קטנה</button>
                                    </>
                                )}
                            </div>
                            <div>
                                <p>תמונה גדולה</p>
                                {postBigImg.length > 0 && (
                                    <>
                                        <img src={postBigImg} alt="project big header" width={600} />
                                        <button onClick={() => hendleDeletePostImage(postBigImg)}>מחק תממונה גדולה</button>
                                    </>
                                )}
                            </div>
                            <h2>{title}</h2>
                            <div className='summery'>
                                <h4>tl:dr</h4>
                                <p>{summerry}</p>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: content }}></div>
                        </div>
                    </div>
                    <div className='add-post__btns'>
                        <button type="button" onClick={() => hendleUpdatePost(true)} disabled={loader}>
                            {loader ? "כמה רגעים" : "שמור כטיוטה"}
                        </button>
                        <button type="button" onClick={() => hendleUpdatePost(false)} disabled={loader}>
                            {loader ? "כמה רגעים" : "פרסם"}
                        </button>
                        <button type="button" onClick={() => hendleDeleteUpdatePost()} disabled={loader}>
                            {loader ? "כמה רגעים" : "מחיקת פוסט"}
                        </button>
                    </div>
                </div>
                {/* </div> */}
            </Await>
        </Suspense>
    )
}

export default EditPost