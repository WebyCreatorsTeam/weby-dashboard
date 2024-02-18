import { FC } from 'react'
import { IFrom } from './formIntarface'

const Form: FC<IFrom> = ({submit, children, btnText, loading}) => {
  return (
    <>
        <form onSubmit={submit}>
            {children}
            <button type='submit' disabled={loading}>{loading ? "כמה רגעים" :btnText}</button>
        </form>
    </>
  )
}

export default Form