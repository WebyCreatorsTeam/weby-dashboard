import React, { useState } from 'react'
import Form from '../../../UI/AuthForm/Form'
import { IUserRegData } from '../inputsIntarface'
import axios from 'axios'
import { registerInputs } from '../inputsList'
import Input from '../../../UI/Input/Input'
import { API_ENDPOINT } from '../../../../utils/api-connect'

const Register = () => {
    const [userRegData, setUserRegData] = useState<IUserRegData>({ userName: "", email: "", password: "", repeatPassword: "" })
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState(false);

    const handleChangeInput = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;
        return setUserRegData({ ...userRegData, [target.name]: target.value });
    };

    const hendleRegister = async (ev: React.SyntheticEvent) => {
        try {
            setLoading(true)
            ev.preventDefault()
            const { data } = await axios.post(`${API_ENDPOINT}/auth/reg-admin`, { userRegData })
            const { continueWork, message } = data
            if (continueWork) return setMessage(data.message);
            if (!continueWork) return alert(message)
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div dir="ltr" className='auth-page'>
            <div className='auth__window' >
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
        </div>
    )
}

export default Register