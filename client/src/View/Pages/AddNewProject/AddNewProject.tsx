import React, { useState } from 'react'
import Form from '../../UI/AuthForm/Form'
import { IProjectDetails } from './addNewInterface'
import { addNewInputs } from './addNewInputsList'
import Input from '../../UI/Input/Input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddNewProject = () => {
    const [projectDetails, setProjectDetails] = useState<IProjectDetails>({ name: "", description: "", urlSite: "" })
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChangeInput = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;

        // const { message, continueWork } = validateValues({ [target.name]: target.value });

        // setMessage(message);
        // setGreen(continueWork);
        // setInputsError({ ...inputsError, [target.name]: message });

        return setProjectDetails({ ...projectDetails, [target.name]: target.value });
    };

    const handleSelectFile = (e: any) => setFile(e.target.files[0]);

    const handleUpload = async (ev: React.SyntheticEvent) => {
        ev.preventDefault()
        try {
            setLoading(true);
            const data = new FormData()
            data.append("my_file", file!)

            const res = await axios.post(`/dashboard/projects/save-new-project?name=${projectDetails.name}&description=${projectDetails.description}&urlSite=${projectDetails.urlSite}`, data, {
                headers: {
                    'content-type': "mulpipart/form-data"
                }
            })

            if (res.data.continue) return navigate("/dashboard/projects", { replace: true })
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className='big_header'>הוספת פרויקט חדש</h2>
            <Form submit={handleUpload} btnText={"הוספה"} loading={loading}>
                {addNewInputs.map((inp, index) => (
                    <Input
                        key={index}
                        {...inp}
                        changeInput={handleChangeInput}
                    />
                ))}
                <label htmlFor="file" className="btn-grey">
                    נא לבחור קובץ
                </label>
                {file && <center> {file.name}</center>}
                <input
                    id="file"
                    type="file"
                    onChange={handleSelectFile}
                    multiple={false}
                />
            </Form>
        </div>
    )
}

export default AddNewProject