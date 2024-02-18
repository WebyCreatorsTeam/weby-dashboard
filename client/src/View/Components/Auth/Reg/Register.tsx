import React, { useState } from 'react'
import Form from '../../../UI/AuthForm/Form'
import { IUserRegData } from '../inputsIntarface'
import axios from 'axios'
import { registerInputs } from '../inputsList'
import Input from '../../../UI/Input/Input'

const Register = () => {
    const [userRegData, setUserRegData] = useState<IUserRegData>({ userName: "", email: "", password: "", repeatPassword: "" })
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState(false);

    const handleChangeInput = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;

        // const { message, continueWork } = validateValues({ [target.name]: target.value });

        // setMessage(message);
        // setGreen(continueWork);
        // setInputsError({ ...inputsError, [target.name]: message });

        return setUserRegData({ ...userRegData, [target.name]: target.value });
    };

    const hendleRegister = async (ev: React.SyntheticEvent) => {
        try {
            setLoading(true)
            ev.preventDefault()
            const { data } = await axios.post("/auth/reg-admin", { userRegData })
            if (data.continue) return setMessage(data.message);
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2>הרשמה</h2>
            {message}
            <Form submit={hendleRegister} btnText="הרשם" loading={loading}>
            {registerInputs.map((inp, index) => (
                    <Input
                        key={index}
                        {...inp}
                        changeInput={handleChangeInput}
                    />
                ))}
            </Form>
        </div>
    )
}

export default Register