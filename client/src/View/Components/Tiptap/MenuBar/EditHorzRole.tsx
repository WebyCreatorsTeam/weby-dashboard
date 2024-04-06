import { useCurrentEditor } from '@tiptap/react'

const EditHorzRole = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }
    return (
        <div className="flex_elements">
            <button title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                hr
            </button>
        </div>
    )
}

export default EditHorzRole