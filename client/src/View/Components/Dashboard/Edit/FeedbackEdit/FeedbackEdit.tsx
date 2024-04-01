import React, { FC, useState } from 'react'
import { FormControl, Input, InputLabel, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Form from '../../../../UI/AuthForm/Form';
import { API_ENDPOINT } from '../../../../../utils/api-connect';
import axios from 'axios';
import { TextProject } from '../../../../Pages/Dashboard/EditProject/ProjectEditIntarface';

export interface IFeedbackEdit extends IFeedbackUpdate {
    setEditFeedbackPop: Function
    setTextProject: Function
}

export interface IFeedbackUpdate {
    customerName: string
    customerFeedback: string
    feedbackID: string
}

const FeedbackEdit: FC<IFeedbackEdit> = ({ setTextProject, customerName, customerFeedback, feedbackID, setEditFeedbackPop }) => {
    const [feedbackUpdate, setFeedbackUpdate] = useState<IFeedbackUpdate>({ customerFeedback, customerName, feedbackID })
    const [loading, setLoading] = useState(false);

    const handleChangeInput = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;
        return setFeedbackUpdate({ ...feedbackUpdate, [target.name]: target.value });
    };

    const hendleEditFeedback = async (ev: React.SyntheticEvent) => {
        try {
            ev.preventDefault()
            setLoading(true);
            const token = sessionStorage.getItem('token')
            console.log(feedbackUpdate)

            const { data } = await axios.patch(`${API_ENDPOINT}/dashboard/feedbacks/update-feedback?token=${token}`, { feedbackUpdate })
            const { continueWork, message } = data
            console.log(data)

            if (continueWork) {
                alert(message)
                setTextProject((project: TextProject) => { return { ...project, customerFeedback: feedbackUpdate.customerFeedback, customerName: feedbackUpdate.customerName } })
                return;
            }
            if (!continueWork) return alert(message)
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
            setEditFeedbackPop(false)
        }
    }
    return (
        <div className="image-edit-pop" dir='ltr'>
            <div className='image-edit-pop__edit-window'>
                <CloseIcon onClick={() => setEditFeedbackPop(false)} />
                <div className='edit-page-form add-project-page'>
                    <Form
                        submit={hendleEditFeedback}
                        btnText="עדכן"
                        loading={loading}>
                        <div className='add-project-page__inputs-grid' dir='rtl'>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="customerName" required>הכנס שם הלקוח</InputLabel>
                                <Input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    defaultValue={feedbackUpdate.customerName}
                                    onChange={handleChangeInput}
                                />
                            </FormControl>
                            <FormControl className='add-project-page__inputs-grid--description'>
                                <TextField
                                    id="standard-multiline-flexible"
                                    name="customerFeedback"
                                    label={'הכנס פידבק'}
                                    defaultValue={feedbackUpdate.customerFeedback}
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

export default FeedbackEdit