import { useCurrentEditor } from '@tiptap/react'
import React from 'react'

const EditClear = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }
    return (
        <div className='flex_elements'>
            <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                Clear Marks
            </button>
            <button onClick={() => editor.chain().focus().clearNodes().run()}>
                Clear Nodes
            </button>
        </div>
    )
}

export default EditClear