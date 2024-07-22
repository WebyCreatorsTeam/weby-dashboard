import axios from "axios"
import { defer } from "react-router-dom"
import { API_ENDPOINT } from "../../../../utils/api-connect"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getPost = async (id: string) => {
    try {
        const token = cookies.get('token')
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