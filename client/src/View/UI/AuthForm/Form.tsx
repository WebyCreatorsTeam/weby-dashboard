import { FC } from 'react'
import { IFrom } from './formIntarface'
import FormBtn from '../FormBtn/FormBtn';

const Form: FC<IFrom> = ({ submit, children, btnText, loading }) => {
  return (
    <>
      <form onSubmit={submit} className='auth-form'>
        {children}
        <FormBtn btnText={btnText!} loading={loading}/>
      </form>
    </>
  )
}

export default Form