import React, { FC, useState } from 'react'
import { IProjectDetails } from './addNewInterface'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UploadFile from '../../../Components/UploadFile/UploadFile'
import Form from '../../../UI/AuthForm/Form'
import AddEditForm from '../../../UI/AddEditForm/AddEditForm'
import { addNewInputs } from './addNewInputsList'

const AddNewProject: FC = () => {
    const [projectDetails, setProjectDetails] = useState<IProjectDetails>({ name: "", description: "", urlSite: "" })
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [prevFileShow, setPrevFileShow] = useState<string>("")
    const navigate = useNavigate();

    const handleChangeInput = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;
        return setProjectDetails({ ...projectDetails, [target.name]: target.value });
    };

    const handleSelectFile = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            setFile(target.files[0])
            setPrevFileShow(URL.createObjectURL(target.files[0]));
        }
    };

    const handleUpload = async (ev: React.SyntheticEvent) => {
        try {
            ev.preventDefault()
            setLoading(true);

            if (!file) {
                alert("חייב להוסיף תמונה")
                return setLoading(false);
            }

            const data = new FormData()
            data.append("my_file", file!)

            const res = await axios.post(`/dashboard/projects/save-new-project?name=${projectDetails.name}&description=${projectDetails.description}&urlSite=${projectDetails.urlSite}`, data, {
                headers: { 'content-type': "mulpipart/form-data" }
            })

            const { data: { continueWork, message } } = res
            if (continueWork) return navigate("/dashboard/projects", { replace: true })
            if (!continueWork) return alert(message)
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div dir='ltr' >
            <h2 className='big_header'>הוספת פרויקט חדש</h2>
            <div className='add-project-page'>
                <div>
                    <UploadFile handleSelectFile={handleSelectFile} prevFileShow={prevFileShow} />
                    <Form submit={handleUpload} btnText={"הוספה פרויקט חדש"} loading={loading}>
                        <AddEditForm inputs={addNewInputs} handleChangeInput={handleChangeInput}/>
                    </Form>
                </div>
                <div>
                    {prevFileShow.length > 0 && (
                        <div className='edit_project__header-image'>
                            <img className='edit_project__image' src={prevFileShow} alt="previus show" />
                            <div className='edit_project__crop-image'>
                                <img className='edit_project__image2' src={prevFileShow} alt="previus show" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddNewProject