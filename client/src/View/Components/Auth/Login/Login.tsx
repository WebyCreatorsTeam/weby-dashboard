import React, { useState } from 'react'
import Form from '../../../UI/AuthForm/Form'
import { loginInputs } from '../inputsList'
import Input from '../../../UI/Input/Input'
import { IUserLoginData } from '../inputsIntarface'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../../images/logo-big.png'
import { CardMedia } from '@mui/material'
import { API_ENDPOINT } from '../../../../utils/api-connect'
import Cookies from 'universal-cookie';


const Login = () => {
    const [userLoginData, setUserLoginData] = useState<IUserLoginData>({ email: "", password: "" })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleChangeInput = (ev: React.SyntheticEvent) => {
        let target = ev.target as HTMLInputElement;
        return setUserLoginData({ ...userLoginData, [target.name]: target.value });
    };

    const hendleLogin = async (ev: React.SyntheticEvent) => {
        try {
            setLoading(true)
            ev.preventDefault()

            const { data: { continueWork, message, token } } = await axios.post(`${API_ENDPOINT}/auth/login-admin`, { userLoginData })
            await cookies.set("token", token, { path: "/", expires: new Date(Date.now() + 1000 * 60 * 60 * 3)});
            if (continueWork) return navigate("/dashboard", { replace: true });
            if (!continueWork) return alert(message)
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='auth-page'>
            <CardMedia
                component="img"
                sx={{ maxWidth: 300 }}
                className='auth-page__image-logo-login'
                image={Logo}
                alt="Paella dish"
            />
            <div className='auth__window'>
                <h2>כניסה</h2>
                <Form
                    submit={hendleLogin}
                    btnText={"כניסה"}
                    loading={loading}
                >
                    {loginInputs.map((inp, index) => (
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

export default Login