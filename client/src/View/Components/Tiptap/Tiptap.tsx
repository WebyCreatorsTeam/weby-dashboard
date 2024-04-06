import './style.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { EditorProvider } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'
import { FC } from 'react'

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    // .configure({ types: [ListItem.name] }),
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
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Link.configure({
        openOnClick: true,
        autolink: true,
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
        <div className='tiptop_edit'>
            <EditorProvider slotBefore={<MenuBar setContent={setContent} />} content={content} extensions={extensions} children={undefined}></EditorProvider>
        </div>
    )
}

export default Tiptap