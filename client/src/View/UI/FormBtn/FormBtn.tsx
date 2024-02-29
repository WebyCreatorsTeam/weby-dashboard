import { FC } from 'react'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { IFormBtn } from './FormBtnInterface';

const FormBtn: FC<IFormBtn> = ({ btnText, loading, submitFunction }) => {
    console.log(btnText)
    return (
        <Button
            sx={btnText === "הוספה פרויקט חדש" || "שמור פרויקט כטיוטה" ? { marginTop: "3%", marginBottom: "2%" } : { marginTop: "7%" }}
            type={btnText === "הוספה פרויקט חדש" || btnText === "שמור פרויקט כטיוטה" ? 'button' : 'submit'}
            color="secondary"
            variant="outlined"
            size="medium"
            endIcon={<SendIcon />}
            disabled={loading}
            onClick={submitFunction}
        >
            {loading ? "כמה רגעים" : btnText}
        </Button>
    )
}

export default FormBtn