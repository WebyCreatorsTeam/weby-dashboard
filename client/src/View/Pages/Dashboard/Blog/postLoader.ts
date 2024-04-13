import axios from "axios"
import { defer } from "react-router-dom"
import { API_ENDPOINT } from "../../../../utils/api-connect"

const getPost = async (id: string) => {
    try {
        const token = sessionStorage.getItem('token')
        const { data: { continueWork, post } } = await axios.post(`${API_ENDPOINT}/dashboard/blog/get-one-post?token=${token}`, { id })
        if (continueWork) return post
    } catch (error) {
        alert(error)
    }
}

export const postLoader = async ({ params }: any) => {
    const { id } = params
    return defer({
        post: await getPost(id)
    })
}