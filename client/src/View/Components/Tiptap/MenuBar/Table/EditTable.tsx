import { useCurrentEditor } from '@tiptap/react'
import React from 'react'

const EditTable = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    const hendleInsertTable = () => {
        const cols = Number(prompt("כמה עמודות נדרש?"))
        const rows = Number(prompt("כמה שורות נדרש?"))

        if (cols === 0 || rows === 0) return alert("צריך שכמות העמודות והשורות יהיה יותר מ0")
        editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
    }
    return (
        <div>
            <button
                onClick={hendleInsertTable}
            >
                insertTable
            </button>
        </div>
    )
}

export default EditTable