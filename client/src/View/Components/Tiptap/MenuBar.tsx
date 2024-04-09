import { useCurrentEditor } from "@tiptap/react"
import { ITiptap } from "./Tiptap"
import { FC, useState } from "react"
import './style.scss'
import EditText from "./MenuBar/EditText";
import EditAlign from "./MenuBar/EditAlign";
import EditHeaders from "./MenuBar/EditHeaders";
import EditList from "./MenuBar/EditList";
import EditUndoRedo from "./MenuBar/EditUndoRedo";
import EditClear from "./MenuBar/EditClear";
import EditLinks from "./MenuBar/EditLinks";
import EditQuote from "./MenuBar/EditQuote";
import EditWrap from "./MenuBar/EditWrap";
import EditHorzRole from "./MenuBar/EditHorzRole";
import FontColor from "./MenuBar/FontColor/FontColor";
import FontHiglight from "./MenuBar/FontColor/FontHiglight";
import EditTable from "./MenuBar/Table/EditTable";

const MenuBar: FC<ITiptap> = ({ setContent }) => {
    const [openFontColor, setOpenFontColor] = useState(false)
    const [openLightColor, setOpenLightColor] = useState(false)
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className="main_btns_edit">
            <div className="main_btns_edit__top_edit edit_display">
                <EditText />
                <EditAlign />
                <EditHeaders />
                <EditList />
                <EditLinks />
            </div>

            <div className="main_btns_edit__bottom_edit edit_display">
                <EditQuote />
                <EditWrap />
                <EditHorzRole />
                <EditClear />
                <EditUndoRedo />
                <FontColor openFontColor={openFontColor} setOpenFontColor={setOpenFontColor} setOpenLightColor={setOpenLightColor} />
                <FontHiglight openLightColor={openLightColor} setOpenLightColor={setOpenLightColor} setOpenFontColor={setOpenFontColor} />
                <EditTable />
            </div>

            <button className="flex_elements" onClick={() => setContent(editor.getHTML())}>שמור לתצוגה</button>
        </div>
    )
}

export default MenuBar;