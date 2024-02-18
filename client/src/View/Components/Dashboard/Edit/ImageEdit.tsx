import axios from 'axios';
import React, { FC, useState } from 'react'

interface ImageEditProps {
    setEditImagePop: Function
    setUrlProject: Function
    id: string
    oldUrl: string
}

const ImageEdit: FC<ImageEditProps> = ({ setEditImagePop, id, oldUrl, setUrlProject }) => {
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSelectFile = (e: any) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        try {
            setLoading(true);
            const data = new FormData()
            data.append("my_file", file!)

            const res = await axios.post(`/dashboard/projects/replace-image-project?id=${id}&oldURL=${oldUrl}`, data, {
                headers: {
                    'content-type': "mulpipart/form-data"
                }
            })
            setUrlProject(res.data.secure_url)
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
            setEditImagePop(false)
        }
    };
    return (
        <div className='image-edit-pop'>
            <div className='image-edit-pop__edit-window'>
                <button onClick={() => setEditImagePop(false)}>X</button>
                <label htmlFor="file" className="btn-grey">
                    בחר תמונה
                </label>
                <input
                    id="file"
                    type="file"
                    onChange={handleSelectFile}
                    multiple={false}
                />
                <button onClick={handleUpload} className="btn-green">
                    {loading ? "מעדכן..." : "עדכן"}
                </button>
            </div>
        </div>
    )
}

export default ImageEdit