import axios from "axios"
import { API_ENDPOINT } from "../../../../utils/api-connect"
import { defer } from "react-router-dom"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getAllFeedbacks = async () => {
    try {
        const token = cookies.get('token')
        const { data: { continueWork, feedbacks } } = await axios.get(`${API_ENDPOINT}/dashboard/feedbacks/get-all-feedbacks?token=${token}`)
        if (continueWork) return feedbacks
    } catch (error) {
        alert(error)
    }
}

export const feedbackLoader = async () => {
    return defer({
        feedbacks: await getAllFeedbacks()
    })
}