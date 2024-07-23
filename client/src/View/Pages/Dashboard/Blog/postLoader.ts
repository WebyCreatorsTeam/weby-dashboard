import axios from "axios"
import { defer } from "react-router-dom"
import { API_ENDPOINT } from "../../../../utils/api-connect"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getPost = async (title: string) => {
    try {
        const token = cookies.get('token')
        const { data: { continueWork, post } } = await axios.post(`${API_ENDPOINT}/dashboard/blog/get-one-post?token=${token}`, { title })
        if (continueWork) return post
    } catch (error) {
        alert(error)
    }
}

export const postLoader = async ({ params }: any) => {
    const { title } = params
    console.log(title)
    return defer({
        post: await getPost(title)
    })
}