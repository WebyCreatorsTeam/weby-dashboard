import './style.scss'

// import { Color } from '@tiptap/extension-color'
// import ListItem from '@tiptap/extension-list-item'
// import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import MenuBar from './MenuBar'
import { FC } from 'react'

const extensions = [
    // Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
    Placeholder.configure({
        placeholder: "היו היה..."
    }),
]

const content = `
היו היה...
`

export interface ITiptap {
    setContent: Function
}
const Tiptap: FC<ITiptap> = ({ setContent }) => {
    return (
        <EditorProvider slotBefore={<MenuBar setContent={setContent} />} extensions={extensions} content={content} children={undefined}></EditorProvider>
    )
}

export default Tiptap