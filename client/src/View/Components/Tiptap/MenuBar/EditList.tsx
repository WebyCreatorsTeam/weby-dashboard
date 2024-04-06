import { useCurrentEditor } from '@tiptap/react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';


const EditList = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }
    return (
        <div className="flex_elements">
            {/* Bulleted List  */}
            <button
                title="Bulleted List"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <FormatListBulletedIcon />
            </button>
            {/* Numbered List  */}
            <button
                title="Numbered List"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <FormatListNumberedIcon />
            </button>
            
        </div>
    )
}

export default EditList