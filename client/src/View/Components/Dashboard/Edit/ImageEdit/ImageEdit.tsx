import axios from 'axios';
import React, { FC, useState } from 'react'
import UploadFile from '../../../UploadFile/UploadFile';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ImageEditProps } from './ImageEditInterface';
import CloseIcon from '@mui/icons-material/Close';

const ImageEdit: FC<ImageEditProps> = ({ setEditImagePop, id, oldUrl, setUrlProject }) => {
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [prevFileShow, setPrevFileShow] = useState<string>("")

    const handleSelectFile = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            setFile(target.files[0])
            setPrevFileShow(URL.createObjectURL(target.files[0]));
        }
    };

    const handleUpload = async () => {
        try {
            setLoading(true);
            const data = new FormData()
            data.append("my_file", file!)

            const res = await axios.post(`https://weby-dashboard-api.vercel.app/dashboard/projects/replace-image-project?id=${id}&oldURL=${oldUrl}`, data, {
                headers: {
                    'content-type': "mulpipart/form-data"
                }
            })
            const { continueWork, secure_url, message } = res.data
            if (continueWork)  {
                alert("תמונה עודכנה בהצלחה")
                return setUrlProject(secure_url)
            }
            if (continueWork) return alert(message)
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
            setEditImagePop(false)
        }
    };
    return (
        <div className='image-edit-pop' dir='ltr'>
            <div className='image-edit-pop__edit-window'>
                <CloseIcon onClick={() => setEditImagePop(false)}/>
                <div className='update_project__form-image'>
                    <UploadFile handleSelectFile={handleSelectFile} prevFileShow={prevFileShow} />
                    <Button
                        type='submit'
                        color="secondary"
                        variant="outlined"
                        size="medium"
                        endIcon={<SendIcon />}
                        disabled={loading}
                        onClick={handleUpload}
                    >{loading ? "כמה רגעים" : 'עדכן'}</Button>
                </div>
                <div className='update_project__crop-image'>
                    {prevFileShow && <img src={prevFileShow} alt="project" className='edit_project__image2' />}
                </div>
            </div>
        </div>
    )
}

export default ImageEdit