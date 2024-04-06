import { useCurrentEditor } from "@tiptap/react"
import { ITiptap } from "./Tiptap"
import { FC } from "react"
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

const MenuBar: FC<ITiptap> = ({ setContent }) => {
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
                <EditWrap/>
                <EditHorzRole/>
                <EditClear />
                <EditUndoRedo />
            </div>

            <button className="flex_elements" onClick={() => setContent(editor.getHTML())}>Save</button>
        </div>
    )
}

export default MenuBar;