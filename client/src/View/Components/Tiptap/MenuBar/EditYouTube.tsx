import { FC } from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useCurrentEditor } from '@tiptap/react';

const EditYouTube: FC = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    const addYoutubeVideo = () => {
        const url = prompt('הכנס קישור יוטיוב')

        if (!url) {
            return
        }

        const width = Number(prompt("הכנס רוחב החלון (ברירת מחדל 640)", "640"))
        const height = Number(prompt("הכנס רוחב החלון (ברירת מחדל 480)", "480"))

        if (url) return editor.commands.setYoutubeVideo({
            src: url,
            width: width > 0 ? width : 640,
            height: height > 0 ? height : 480
        })
    }

    return (
        <div className="flex_elements">
            <button id="add"
                onClick={addYoutubeVideo}>
                <YouTubeIcon />
            </button>
        </div>
    )
}

export default EditYouTube