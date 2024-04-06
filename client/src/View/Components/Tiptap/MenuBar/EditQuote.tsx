import { useCurrentEditor } from '@tiptap/react'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const EditQuote = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }
  return (
    <div className="flex_elements">
    <button
        title="Quote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
    >
        <FormatQuoteIcon />
    </button>
</div>
  )
}

export default EditQuote