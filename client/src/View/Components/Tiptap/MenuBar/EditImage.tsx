import { useCurrentEditor } from '@tiptap/react'
import { FC, useCallback } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const EditImage:FC = () => {
    const { editor } = useCurrentEditor()

    
    const addImage = useCallback(() => {
        const url = window.prompt('URL')
        
        if (url) {
            editor!.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])
    if (!editor) {
        return null
    }

    return (
        <button className="flex_elements" onClick={addImage}><AddPhotoAlternateIcon/></button>
    )
}

export default EditImage