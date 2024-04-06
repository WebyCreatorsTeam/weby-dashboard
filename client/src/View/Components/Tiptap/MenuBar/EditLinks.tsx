import { useCurrentEditor } from '@tiptap/react'
import { useCallback } from 'react'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';

const EditLinks = () => {
  const { editor } = useCurrentEditor()

  const setLink = useCallback(() => {
    const previousUrl = editor!.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor!.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor!.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="flex_elements">
      <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
        <InsertLinkIcon/>
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      >
        <LinkOffIcon/>
      </button>
    </div>
  )
}

export default EditLinks