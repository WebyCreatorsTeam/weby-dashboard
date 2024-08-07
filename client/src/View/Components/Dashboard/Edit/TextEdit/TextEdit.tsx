import React, { FC, useState } from 'react'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { TextsEditProps } from './textEditIntarface';
import { FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import Form from '../../../../UI/AuthForm/Form';
import { API_ENDPOINT } from '../../../../../utils/api-connect';
import { selectValues } from '../../../../Pages/Dashboard/AddNewProject/addNewInputsList';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const TextEdit: FC<TextsEditProps> = ({ setEditTextPop, textProject, id, setTextProject }) => {
    const [textUpdate, setTextUpdate] = useState(textProject)
    const [loading, setLoading] = useState(false);

    console.log(textUpdate)
    const handleChangeInput = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;
        return setTextUpdate({ ...textUpdate, [target.name]: target.value });
    };

    const handleChange = (ev: SelectChangeEvent) => {
        let target = ev.target as HTMLInputElement;
        return setTextUpdate({ ...textUpdate, [target.name]: target.value });
    };

    const hendleEditTexts = async (ev: React.SyntheticEvent) => {
        try {
            setLoading(true);
            ev.preventDefault()
            const token = cookies.get('token')

            const { data } = await axios.post(`${API_ENDPOINT}/dashboard/projects/edit-texts-project?token=${token}`, { textUpdate, id })
            const { continueWork, texts, message } = data
            if (continueWork) return setTextProject(texts)
            if (!continueWork) return alert(message)
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
            setEditTextPop(false)
        }
    }

    return (
        <div className="image-edit-pop" dir='ltr'>
            <div className='image-edit-pop__edit-window'>
                <CloseIcon onClick={() => setEditTextPop(false)} />
                <div className='edit-page-form add-project-page'>
                    <Form
                        submit={hendleEditTexts}
                        btnText="עדכן"
                        loading={loading}>
                        <div className='add-project-page__inputs-grid' dir='rtl'>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="name" required>הכנס כותרת הרפויקט</InputLabel>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={textUpdate.name}
                                    onChange={handleChangeInput}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="urlSite" required>הכנס קישור לפרויקט</InputLabel>
                                <Input
                                    type="text"
                                    id="urlSite"
                                    name="urlSite"
                                    defaultValue={textUpdate.urlSite}
                                    onChange={handleChangeInput}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="select-simple-select-label">סוג פרויקט</InputLabel>
                                <Select
                                    labelId="select-simple-select-label"
                                    value={textUpdate.projectType}
                                    label="סוג פרויקט"
                                    name="projectType"
                                    onChange={handleChange}
                                >
                                    {selectValues.map((selv, index) => (
                                        <MenuItem key={index} value={selv.value}>{selv.text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className='add-project-page__inputs-grid--description'>
                                <TextField
                                    id="standard-multiline-flexible"
                                    name="description"
                                    label={'הכנס תיאור הפרויקט'}
                                    defaultValue={textUpdate.description}
                                    onChange={handleChangeInput}
                                    variant="standard"
                                    required
                                />
                            </FormControl>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default TextEdit