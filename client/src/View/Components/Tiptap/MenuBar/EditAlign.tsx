import { useCurrentEditor } from '@tiptap/react'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const EditAlign = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className="flex_elements">
            <button
                title="Text Align Left"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
            >
                <FormatAlignLeftIcon />
            </button>
            <button
                title="Text Align Center"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
            >
                <FormatAlignCenterIcon />
            </button>
            <button
                title="Text Align Right"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
            >
                <FormatAlignRightIcon />
            </button>
            <button
                title="Text Align Justify"
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
            >
                <FormatAlignJustifyIcon />
            </button>
        </div>
    )
}

export default EditAlign