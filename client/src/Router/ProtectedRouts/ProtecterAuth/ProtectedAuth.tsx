import { FC, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { IProtectedAuth } from './IprotectedAuth';
import Cookies from 'universal-cookie';

const ProtectedAuth :FC<IProtectedAuth> = ({children}) => {
  const cookies = useMemo(() => {
    return new Cookies();
}, [])


  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get('token')
    if(!token) return navigate('/', {replace: true})
  }, [cookies, navigate])

  return <>{children}</>
}

export default ProtectedAuth