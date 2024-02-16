import React, { FC, useState } from 'react'
import { IInput } from './inputIntarface'

const Input: FC<IInput> = ({ type, name, placeholder, changeInput }) => {
    const [showPass, setShowPass] = useState<string>(type)

    const changeShowPass = () => showPass === "text" ? setShowPass("password") : setShowPass("text")

    return (
        <>
            <input
                type={showPass}
                name={name}
                placeholder={placeholder}
                onChange={changeInput}
                required />
            {type === "password" && <button type="button" onClick={changeShowPass}>Show</button>}
        </>
    )
}

export default Input