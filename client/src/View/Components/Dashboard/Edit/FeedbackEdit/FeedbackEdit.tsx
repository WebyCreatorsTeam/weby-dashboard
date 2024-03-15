import React, { FC, useState } from 'react'
import { TextsEditProps } from '../TextEdit/textEditIntarface'

export interface IFeedbackEdit {
    customerFeedback: string
    customerName: string
    feedbackId: string
}

const FeedbackEdit: FC<TextsEditProps> = ({ setEditTextPop, textProject, id, setTextProject }) => {
    const [feedbackUpdate, setFeedbackUpdate] = useState<IFeedbackEdit>({customerFeedback:"", customerName:"", feedbackId:""})
    const [loading, setLoading] = useState(false);

    const handleChangeInput = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;
        return setFeedbackUpdate({ ...feedbackUpdate, [target.name]: target.value });
    };

    return (
        <div>FeedbackEdit</div>
    )
}

export default FeedbackEdit