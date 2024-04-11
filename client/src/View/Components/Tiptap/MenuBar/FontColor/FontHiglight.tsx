import { FC, useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useCurrentEditor } from '@tiptap/react';

export interface IFontHiglight {
    openLightColor: boolean
    setOpenLightColor: Function
    setOpenFontColor: Function
    setOpenTable: Function
}

const FontHiglight: FC<IFontHiglight> = ({ openLightColor, setOpenLightColor, setOpenFontColor, setOpenTable }) => {
    const { editor } = useCurrentEditor()

    useEffect(() => {
        const checkMouse = (event: any) => {
            if (event.target!.offsetParent) {
                // console.log(event.target!.offsetParent.classList[0] === "font_color__palet--elements")
                if (event.target!.offsetParent.classList[0] !== "font_color__palet--elements") {
                    setOpenLightColor(false)
                }
            }
            //  else {
            //     console.log("no parrent")
            // }
        }
        document.addEventListener("mousedown", (ev) => checkMouse(ev))
    }, [setOpenLightColor])

    if (!editor) {
        return null
    }

    interface IColorPanel {
        color: string
        name: string
    }
    const colorPalet: Array<IColorPanel> = [
        { color: "#FFFF00", name: "Yellow" },
        { color: "#ffc078", name: "Orange" },
        { color: "#8ce99a", name: "Green" },
        { color: "#74c0fc", name: "Blue" },
        { color: "#b197fc", name: "Purple" },
        { color: "#FF0000", name: "Red" },
        { color: "#ffa8a8", name: "Red Light" },
    ]

    return (
        <div className="flex_elements font_color__palet">
            <button onClick={() => {
                setOpenLightColor(!openLightColor)
                setOpenFontColor((open: boolean) => { if (open === true) { return !open } })
                setOpenTable((open: boolean) => { if (open === true) return !open })
            }}>
                <BorderColorIcon />
            </button>
            {openLightColor && (
                <div className='font_color__palet--elements'>
                    <div className='font_color__palet--unHightLight'>
                        <button
                            onClick={() => editor.chain().focus().unsetHighlight().run()}
                            disabled={!editor.isActive('highlight')}
                        >
                            No Color
                        </button>
                    </div>
                    {colorPalet.map((palt, index) => (
                        <div key={index} className='font_color__palet--elements-div'>
                            <button
                                title={palt.name}
                                onClick={() => editor.chain().focus().toggleHighlight({ color: palt.color }).run()}
                                style={{ background: palt.color }}
                            >
                            </button>
                        </div>
                    ))}
                    <div className='font_color__palet--more-hightlight'>
                        <label htmlFor="more-colors" dir="ltr">More Colors..</label>
                        <input
                            title="Text Color"
                            type="color"
                            id="more-colors"
                            onInput={(event: any) => editor.chain().focus().toggleHighlight({ color: event.target.value }).run()}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default FontHiglight