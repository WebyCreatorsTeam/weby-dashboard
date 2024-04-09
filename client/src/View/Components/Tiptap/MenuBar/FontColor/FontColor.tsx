import { useCurrentEditor } from '@tiptap/react'
import { FC, useState } from 'react'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

export interface IFontColor {
    openFontColor: boolean
    setOpenFontColor: Function
    setOpenLightColor: Function
}

export interface IColorPanel {
    set: string
    color: string
    name: string

}

export const colorPalet: Array<IColorPanel> = [
    { set: "setRed", color: "#FF0000", name: "Red" },
    { set: "setBlue", color: "#0000FF", name: "Blue" },
    { set: "setYellow", color: "#FFFF00", name: "Yellow" },
    { set: "setGreen", color: "#008000", name: "Green" },
    { set: "setGrey", color: "#808080", name: "Grey" },

]

const FontColor: FC<IFontColor> = ({ openFontColor, setOpenFontColor, setOpenLightColor }) => {
    // const [openFontColor, setOpenFontColor] = useState(false)
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }


    return (
        <div className="flex_elements font_color__palet">
            <button onClick={() => {
                setOpenFontColor(!openFontColor)
                setOpenLightColor((open: boolean) => { if (open === true) return !open })
            }}>
                <FormatColorTextIcon />
            </button>
            {openFontColor && (
                <div className='font_color__palet--elements'>
                    <div className='font_color__palet--automatic-color'>
                        <label htmlFor="automatic-color" dir="ltr">Automatic</label>
                        <button
                            title="Black"
                            id="automatic-color"
                            onClick={() => editor.chain().focus().setColor('#000000').run()}
                            className={editor.isActive('textStyle', { color: '#000000' }) ? 'is-active' : ''}
                            data-testid="setBlack"
                            style={{ background: "#000000" }}
                        >
                        </button>
                    </div>
                    {colorPalet.map((palt, index) => (
                        <div key={index} className='font_color__palet--elements-div'>
                            <button
                                title={palt.name}
                                onClick={() => editor.chain().focus().setColor(palt.color).run()}
                                className={editor.isActive('textStyle', { color: palt.color }) ? 'is-active' : ''}
                                data-testid={palt.set}
                                style={{ background: palt.color }}
                            >
                            </button>
                        </div>
                    ))}
                    <div className='font_color__palet--more-colors'>
                        <label htmlFor="more-colors" dir="ltr">More Colors..</label>
                        <input
                            title="Text Color"
                            type="color"
                            id="more-colors"
                            onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
                            value={editor.getAttributes('textStyle').color}
                            data-testid="setColor"
                        />
                    </div>
                </div>)}
        </div>
    )
}

export default FontColor

/*
<div
                        // className='font_color__palet--automatic-color'
                        onClick={() => editor.chain().focus().setColor('#000000').run()}
                        className={`font_color__palet--automatic-color ${editor.isActive('textStyle', { color: '#000000' }) ? 'is-active' : ''}`}
                    >
                        <p dir="ltr">Automatic</p>
                        <button
                            title="Black"
                            // onClick={() => editor.chain().focus().setColor('#000000').run()}
                            // className={editor.isActive('textStyle', { color: '#000000' }) ? 'is-active' : ''}
                            data-testid="setBlack"
                            style={{ background: "#000000" }}
                        >
                        </button>
                    </div>

*/