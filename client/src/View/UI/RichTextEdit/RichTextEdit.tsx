import { FC, useRef } from 'react'
import { IRichTextEdit } from './richTextInterface'

const RichTextEdit: FC<IRichTextEdit> = ({ blogContext, setBlogContext }) => {
    const areaTextRef = useRef<any>(null)

    const inputsHandler = (e: any) => {
        var taxt = e.target.innerHTML
        let textArray = taxt.split(/\n/gm)
        console.log(textArray)
        setBlogContext((blog: any) => { return { ...blog, body: { value: e.target.value } } })
    }

    const selectedTextFunc = () => {
        let cursorStart = areaTextRef.current.selectionStart
        let cursorEnd = areaTextRef.current.selectionEnd

        let textBefore = blogContext.body.value.substring(0, cursorStart)
        let selectedText = blogContext.body.value.substring(cursorStart, cursorEnd)
        let textAfter = blogContext.body.value.substring(cursorEnd)
        // console.log(`start: ${textBefore}`)
        // console.log(`select: ${selectedText}`)
        // console.log(`after: ${textAfter}`)

        return { textBefore, selectedText, textAfter }
    }

    const hendleChangeTextTag = (tag: string) => {
        const { textBefore, selectedText, textAfter } = selectedTextFunc()
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
        setBlogContext((blog: any) => { return { ...blog, body: { value: newBoldText } } })
    }

    const hendleAddItalic = () => {
        const newItalicText = hendleChangeTextTag("em")
        areaTextRef.current.value = newItalicText
        setBlogContext((blog: any) => { return { ...blog, body: { value: newItalicText } } })
    }

    const hendleAddUnderline = () => {
        const newUnderlineText = hendleChangeTextTag("u")
        areaTextRef.current.value = newUnderlineText
        setBlogContext((blog: any) => { return { ...blog, body: { value: newUnderlineText } } })
    }

    const hendleAddCode = () => {
        const newCodeText = hendleChangeTextTag("code")
        areaTextRef.current.value = newCodeText
        setBlogContext((blog: any) => { return { ...blog, body: { value: newCodeText } } })
    }

    const hendleAddDel = () => {
        const newDelText = hendleChangeTextTag("del")
        areaTextRef.current.value = newDelText
        setBlogContext((blog: any) => { return { ...blog, body: { value: newDelText } } })
    }
    return (
        <div>
            <button type="button" onClick={hendleAddBold}>BOLD</button>
            <button type="button" onClick={hendleAddItalic}>ITALIC</button>
            <button type="button" onClick={hendleAddUnderline}>UNDERLINE</button>
            <button type="button" onClick={hendleAddCode}>CODE</button>
            <button type="button" onClick={hendleAddDel}>STRIKE (DEL)</button>
            <div>
                <textarea onClick={selectedTextFunc} onChange={inputsHandler} defaultValue={blogContext.body.value} placeholder='היו היה...' name="postText" ref={areaTextRef} rows={10} cols={50}>
                </textarea>
            </div>
            <div dangerouslySetInnerHTML={{ __html: blogContext.body.value }} contentEditable={true}></div>
            {/* 
            <div
                // dangerouslySetInnerHTML={{ __html: blogContext.body.value }}
                contentEditable={true}>
                היו היה...
            </div>
             */}
        </div>
    )
}

export default RichTextEdit