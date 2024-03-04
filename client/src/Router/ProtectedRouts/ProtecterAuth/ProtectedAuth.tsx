import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { IProtectedAuth } from './IprotectedAuth';

const ProtectedAuth :FC<IProtectedAuth> = ({children}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if(!token) return navigate('/', {replace: true})
  }, [navigate])

  return (<>{children}</>)
}

export default ProtectedAuth