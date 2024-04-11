import { useCurrentEditor } from '@tiptap/react'
import { FC, useEffect, useState } from 'react'
import NewTable from "../../../../../images/tableIcons/cells.png"
import CreateColumnBefore from "../../../../../images/tableIcons/column.png"
import CreateColumnAfter from "../../../../../images/tableIcons/right.png"
import DeleteColm from "../../../../../images/tableIcons/delete_column.png"
import DeleteRow from "../../../../../images/tableIcons/delete_row.png"
import CreateRowBefore from "../../../../../images/tableIcons/above.png"
import CreateRowAfter from "../../../../../images/tableIcons/below.png"
import DeleteTable from "../../../../../images/tableIcons/delete_table.png"
import MargeUnMarge from "../../../../../images/tableIcons/merge.png"

export interface IEditTable {
    openTable: boolean
    setOpenTable: Function
    setOpenFontColor: Function
    setOpenLightColor: Function
}
const EditTable: FC<IEditTable> = ({ openTable, setOpenTable, setOpenFontColor, setOpenLightColor }) => {
    const { editor } = useCurrentEditor()

    useEffect(() => {
        const checkMouse = (event: any) => {
            if (event.target!.offsetParent) {
                // console.log(event.target!.offsetParent.classList[0] === "table-edit__elements")
                if (event.target!.offsetParent.classList[0] !== "table-edit__elements") {
                    setOpenTable(false)
                }
            }
            //  else {
            //     console.log("no parrent")
            // }
        }
        document.addEventListener("mousedown", (ev) => checkMouse(ev))
    }, [setOpenTable])

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
        <div className='flex_elements table-edit'>
            <button onClick={() => {
                setOpenTable(!openTable)
                setOpenFontColor((open: boolean) => { if (open === true) return !open })
                setOpenLightColor((open: boolean) => { if (open === true) return !open })
            }}>
                Table
            </button>
            {openTable && (
                <div className='table-edit__elements'>
                    <div className='table-edit__elements--add-edit'>
                        <button onClick={hendleInsertTable}>
                            <img src={NewTable} alt={"create new table"} />
                        </button>
                        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
                            <img src={CreateColumnBefore} alt={"addColumnBefore"} />
                        </button>
                        <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
                            <img src={CreateColumnAfter} alt={"addColumnAfter"} />
                        </button>
                        <button onClick={() => editor.chain().focus().addRowBefore().run()}>
                            <img src={CreateRowBefore} alt={"addRowBefore"} />
                        </button>
                        <button onClick={() => editor.chain().focus().addRowAfter().run()}>
                            <img src={CreateRowAfter} alt={"addRowAfter"} />
                        </button>
                    </div>
                    <div className='table-edit__elements--delete'>
                        <button onClick={() => editor.chain().focus().deleteColumn().run()}>
                            <img src={DeleteColm} alt={"deleteColumn"} />
                        </button>
                        <button onClick={() => editor.chain().focus().deleteRow().run()}>
                            <img src={DeleteRow} alt={"deleteRow"} />
                        </button>
                        <button onClick={() => editor.chain().focus().deleteTable().run()}>
                            <img src={DeleteTable} alt={"deleteTable"} />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
                            <img src={MargeUnMarge} alt={"mergeOrSplit"} />
                        </button>
                    </div>
                    {/* <button onClick={() => editor.chain().focus().mergeCells().run()}>mergeCells</button> */}
                    {/* <button onClick={() => editor.chain().focus().splitCell().run()}>splitCell</button> */}
                    <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                        toggleHeaderColumn
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                        toggleHeaderRow
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                        toggleHeaderCell
                    </button>
                    <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
                        setCellAttribute
                    </button>
                    <button onClick={() => editor.chain().focus().fixTables().run()}>fixTables</button>
                    <button onClick={() => editor.chain().focus().goToNextCell().run()}>goToNextCell</button>
                    <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
                        goToPreviousCell
                    </button>
                </div>)}
        </div>
    )
}

export default EditTable;