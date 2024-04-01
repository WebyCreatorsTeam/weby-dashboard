import { FC } from 'react'
import { FormControl, Input, InputLabel, TextField, MenuItem, Select } from '@mui/material'
import { selectValues } from '../../Pages/Dashboard/AddNewProject/addNewInputsList';
import { IAddEditProps } from './AddEditFormInterface';

const AddEditForm: FC<IAddEditProps> = ({ projectDetails, inputs, handleChangeInput, handleChange }) => {
    return (
        <div className='add-project-page__inputs-grid' dir='rtl'>
            {inputs.map((inp, idx) =>
                inp.name === "description" ?
                    <FormControl key={idx} variant="standard" className='add-project-page__inputs-grid--description'>
                        <TextField
                            id="standard-multiline-flexible"
                            name={inp.name}
                            variant="standard"
                            onChange={handleChangeInput}
                            label={inp.placeholder}
                        // required
                        />
                    </FormControl>
                    :
                    <FormControl key={idx} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password" >{inp.placeholder}</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            name={inp.name}
                            onChange={handleChangeInput}
                            type={inp.type}
                        // required
                        />
                    </FormControl>
            )}
            <FormControl fullWidth>
                <InputLabel id="select-simple-select-label">סוג פרויקט</InputLabel>
                <Select
                    labelId="select-simple-select-label"
                    value={projectDetails.projectType}
                    label="סוג פרויקט"
                    name="projectType"
                    onChange={handleChange}
                >
                    {selectValues.map((selv, index) => (
                        <MenuItem key={index} value={selv.value}>{selv.text}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default AddEditForm