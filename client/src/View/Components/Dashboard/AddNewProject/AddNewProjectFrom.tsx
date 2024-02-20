import React, { FC } from 'react'
import Form from '../../../UI/AuthForm/Form'
import { addNewInputs } from '../../../Pages/AddNewProject/addNewInputsList'
import { FormControl, Input, InputLabel, TextField } from '@mui/material'

interface AddNewFormProps {
    handleUpload: (ev: React.SyntheticEvent) => Promise<void>
    loading: boolean
    handleChangeInput: (ev: React.SyntheticEvent) => void
}
const AddNewProjectFrom: FC<AddNewFormProps> = ({ handleUpload, loading, handleChangeInput }) => {
    return (
        <Form submit={handleUpload} btnText={"הוספה פרויקט חדש"} loading={loading}>
            <div className='add-project-page__inputs-grid' dir='rtl'>
                {addNewInputs.map((inp, idx) =>
                    inp.name === "description" ?
                        <FormControl key={idx} variant="standard" className='add-project-page__inputs-grid--description'>
                            <TextField
                                id="standard-multiline-flexible"
                                name={inp.name}
                                variant="standard"
                                onChange={handleChangeInput}
                                label={inp.placeholder}
                                required
                            />
                        </FormControl>
                        :
                        <FormControl key={idx} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password" required>{inp.placeholder}</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                name={inp.name}
                                onChange={handleChangeInput}
                                type={inp.type}
                                required
                            />
                        </FormControl>
                )}
            </div>
        </Form>
    )
}

export default AddNewProjectFrom