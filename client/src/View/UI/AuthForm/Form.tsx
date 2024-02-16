import { FC } from 'react'
import { IFrom } from './formIntarface'

const Form: FC<IFrom> = ({submit, children, btnText}) => {
  return (
    <>
        <form onSubmit={submit}>
            {children}
            <button type='submit'>{btnText}</button>
        </form>
    </>
  )
}

export default Form