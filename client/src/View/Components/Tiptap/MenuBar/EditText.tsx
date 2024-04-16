import { useCurrentEditor } from '@tiptap/react'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { FC } from 'react'

const EditText: FC = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className="flex_elements">
            {/* Bold */}
            <button
                title="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <FormatBoldIcon />
            </button>
            {/* UnderLine */}
            <button
                title="Underline"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleUnderline()
                        .run()
                }
            >
                <FormatUnderlinedIcon />
            </button>
            {/* Italic */}
            <button
                title="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <FormatItalicIcon />
            </button>
            {/* Strikethroug */}
            <button
                title="Strikethroug"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <StrikethroughSIcon />
            </button>
            {/* Code */}
            <button
                title={"Code"}
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                <DataObjectIcon />
            </button>
            {/* <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    code block
                </button> */}
        </div>
    )
}

export default EditText