import WrapTextIcon from '@mui/icons-material/WrapText';
import { useCurrentEditor } from '@tiptap/react';

const EditWrap = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }
    return (
        <div className="flex_elements">
            <button title="Hard Break/New Line" onClick={() => editor.chain().focus().setHardBreak().run()}>
                <WrapTextIcon />
            </button>
        </div>
    )
}

export default EditWrap