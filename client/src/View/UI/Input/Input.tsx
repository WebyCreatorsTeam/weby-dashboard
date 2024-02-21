import { FC, useState } from 'react'
import { IInput } from './inputIntarface'
import { Input } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField } from '@mui/material';

const InputField: FC<IInput> = ({ type, name, placeholder, changeInput }) => {
    const [showPass, setShowPass] = useState<boolean>(false)

    const changeShowPass = () => setShowPass(!showPass)

    return (
        <div className='input-form'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                {type === "password" ? <>
                    <InputLabel htmlFor={`standard-adornment-password-${name}`}>{placeholder}</InputLabel>
                    <Input
                        name={name}
                        onChange={changeInput}
                        id={`standard-adornment-password-${name}`}
                        type={showPass ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={changeShowPass}
                                >
                                    {showPass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </> : <TextField
                    sx={{ textAlign: "center", width: '25ch' }}
                    name={name}
                    id={`standard-multiline-flexible-${name}`}
                    label={placeholder}
                    onChange={changeInput}
                    variant="standard"
                />}
            </FormControl>
        </div>
    )
}

export default InputField