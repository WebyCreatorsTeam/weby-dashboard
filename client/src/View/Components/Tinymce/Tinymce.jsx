import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
// import { Editor } from '@tiptap/react';

export default function Tinymce() {
    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    
    return (
        <>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                apiKey='bz8kryt182mxqhnpmwuqmsmtrbg6tv46ezbx94erj12tslhg'
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists checklist link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help ' + 
                        'numlist bullist | checklist',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}
