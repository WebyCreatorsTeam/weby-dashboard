import { FC } from 'react'
import { IFrom } from './formIntarface'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

const Form: FC<IFrom> = ({ submit, children, btnText, loading }) => {
  return (
    <>
      <form onSubmit={submit} className='auth-form'>
        {children}
        <Button
          sx={btnText === "הוספה פרויקט חדש" ? { marginTop: "3%", marginBottom: "2%" } : { marginTop: "7%" }}
          type='submit'
          color="secondary"
          variant="outlined"
          size="medium"
          endIcon={<SendIcon />}
          disabled={loading}
        >
          {loading ? "כמה רגעים" : btnText}
        </Button>
      </form>
    </>
  )
}

export default Form