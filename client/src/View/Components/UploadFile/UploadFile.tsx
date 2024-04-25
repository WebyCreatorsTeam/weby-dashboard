import { FC } from 'react'
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { deepPurple } from '@mui/material/colors';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface UploadFileProps {
    handleSelectFile: (e: any) => void
    prevFileShow: string
    loader?: boolean
}

const UploadFile: FC<UploadFileProps> = ({ loader, handleSelectFile, prevFileShow }) => {
    return (
        <Button
            disabled={loader}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ marginBottom: "1%", backgroundColor: deepPurple[900] }}
        >
            {loader ? "מעלה" : prevFileShow.length > 0 ? "החלף תמונה" : "נא לבחור קובץ"}
            < VisuallyHiddenInput type="file" id="file" onChange={handleSelectFile} multiple={false} />
        </Button >
    );
}

export default UploadFile