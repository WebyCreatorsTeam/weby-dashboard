import { FC } from 'react'
import { FormControl, Input, InputLabel, TextField } from '@mui/material'
import { IInputsList } from '../../Components/Auth/inputsIntarface'

interface IAddEditProps {
    inputs: Array<IInputsList>
    handleChangeInput: (ev: React.SyntheticEvent) => void
}

const AddEditForm: FC<IAddEditProps> = ({ inputs, handleChangeInput }) => {
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
    )
}

export default AddEditForm