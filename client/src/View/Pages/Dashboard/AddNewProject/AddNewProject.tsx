import React, { FC, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IProjectDetails } from './addNewInterface'
import { API_ENDPOINT } from '../../../../utils/api-connect'
import { addNewInputs } from './addNewInputsList'
import AddEditForm from '../../../UI/AddEditForm/AddEditForm'
import ProjectsForm from '../../../UI/ProjectsForm/ProjectsForm'
import FormBtn from '../../../UI/FormBtn/FormBtn'
import UploadFile from '../../../Components/UploadFile/UploadFile'

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

    const handleUpload = async (ev: React.SyntheticEvent, draft: boolean) => {
        try {
            ev.preventDefault()
            setLoading(true);

            if (!file) {
                alert("חייב להוסיף תמונה")
                return setLoading(false);
            }

            const data = new FormData()
            data.append("my_file", file!)
            const token=sessionStorage.getItem('token')
            const res = await axios.post(`${API_ENDPOINT}/dashboard/projects/save-new-project?token=${token}&name=${projectDetails.name}&description=${projectDetails.description}&urlSite=${projectDetails.urlSite}&draft=${draft}`, data, {
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
                    <ProjectsForm loading={loading}>
                        <AddEditForm inputs={addNewInputs} handleChangeInput={handleChangeInput} />
                        <FormBtn btnText={"הוספה פרויקט חדש"} loading={loading} submitFunction={(ev: React.SyntheticEvent) => handleUpload(ev, false)} />
                        <FormBtn btnText={"שמור פרויקט כטיוטה"} loading={loading} submitFunction={(ev: React.SyntheticEvent) => handleUpload(ev, true)} />
                    </ProjectsForm>
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