import { FC, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { IProtectedAuth } from '../IprotectedAuth';

const LodinProtected: FC<IProtectedAuth> = ({ children }) => {
    const cookies = useMemo(() => {
        return new Cookies();
    }, [])

    const navigate = useNavigate();

    useEffect(() => {
        const token = cookies.get('token')
        if (token) return navigate('/dashboard', { replace: true })
    }, [cookies, navigate])

    return (<>{children}</>)
}

export default LodinProtected