import { useCurrentEditor } from '@tiptap/react'
import React from 'react'
import { Subscript, Superscript } from '@mui/icons-material';

const EditSubScript = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className="flex_elements">
            <button
                title="Text Subscript"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                className={editor.isActive('subscript') ? 'is-active' : ''}
            ><Subscript /></button>
            <button
                title="Text Superscript"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={editor.isActive('superscript') ? 'is-active' : ''}
            ><Superscript /></button>
        </div>

    )
}

export default EditSubScript