import React, { useRef, useState } from 'react'

const RichTextContent = () => {
    const areaTextRef = useRef<any>(null)
    const [text, setValue] = useState({ value: "" })

    console.log(text)
    const inputsHandler = (e: any) => {
        // console.log(`werwer`)
        var taxt = e.target.innerHTML
        // console.log(e.target)
        let textArray = taxt.split(/\n/gm)
        console.log(textArray)
        setValue({ value: e.target.innerHTML })
    }

    const selectedTextFunc = () => {
        let cursorStart = areaTextRef.current.selectionStart
        let cursorEnd = areaTextRef.current.selectionEnd
        console.log(`select start: ${cursorStart}, select end: ${cursorEnd}`)
        let textBefore = text.value.substring(0, cursorStart)
        let selectedText = text.value.substring(cursorStart, cursorEnd)
        let textAfter = text.value.substring(cursorEnd)

        return { textBefore, selectedText, textAfter }
    }

    const hendleChangeTextTag = (tag: string) => {
        const { textBefore, selectedText, textAfter } = selectedTextFunc()
        console.log(textBefore, selectedText, textAfter)
        return `${textBefore}<${tag}>${selectedText}</${tag}>${textAfter}`
    }

    const hendleAddBold = () => {
        // const checkIfDiv = /^[<b>]|(".")|[</b>]$/
        // const bla = checkIfDiv.test(selectedText)
        // console.log(bla)
        // if (bla) {
        //     const lineWithoutOpenTag = selectedText.replace("<b>", '')
        //     console.log(lineWithoutOpenTag)

        //     const lineWithoutCloseTag = lineWithoutOpenTag.replace("</b>", '')
        //     console.log(lineWithoutCloseTag)
        //     // areaTextRef.current.value = `${textBefore}<b>${selectedText}</b>${textAfter}`
        //     return
        // }
        const newBoldText = hendleChangeTextTag("b")
        areaTextRef.current.value = newBoldText
        setValue({ value: newBoldText })
    }

    return (
        <div>
            <div>
                <button type="button" onClick={hendleAddBold}>BOLD</button>
            </div>
            <div
                dir='rtl'
                contentEditable="true"
                style={{ border: "2px solid black", width: "50%" }}
                // onChange={inputsHandler}
                onKeyUp={inputsHandler}
                onClick={selectedTextFunc}
                dangerouslySetInnerHTML={{ __html: text.value }}
                ref={areaTextRef}
            ></div>
        </div>
    )
}

export default RichTextContent