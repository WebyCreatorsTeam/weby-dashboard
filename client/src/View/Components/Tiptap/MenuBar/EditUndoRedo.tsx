import { useCurrentEditor } from '@tiptap/react'
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

const EditUndoRedo = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }
    return (
        <div className="flex_elements">
            <button
                title="Redo"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                <RedoIcon />
            </button>
            <button
                title="Undo"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                <UndoIcon />
            </button>
        </div>
    )
}

export default EditUndoRedo