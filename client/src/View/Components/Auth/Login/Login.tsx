import React, { useState } from 'react'
import Form from '../../../UI/AuthForm/Form'
import { loginInputs } from '../inputsList'
import Input from '../../../UI/Input/Input'
import { IUserLoginData } from '../inputsIntarface'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [userLoginData, setUserLoginData] = useState<IUserLoginData>({ email: "", password: "" })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangeInput = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;

        // const { message, continueWork } = validateValues({ [target.name]: target.value });

        // setMessage(message);
        // setGreen(continueWork);
        // setInputsError({ ...inputsError, [target.name]: message });

        return setUserLoginData({ ...userLoginData, [target.name]: target.value });
    };

    const hendleLogin = async (ev: React.SyntheticEvent) => {
        try {
            setLoading(true)
            ev.preventDefault()
    
            const { data } = await axios.post("/auth/login-admin", { userLoginData })
            if (data.continueWork) return navigate("/dashboard",{replace: true});
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2>כניסה</h2>
            <Form submit={hendleLogin} btnText={"כניסה"} loading={loading}>
                {loginInputs.map((inp, index) => (
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

export default Login