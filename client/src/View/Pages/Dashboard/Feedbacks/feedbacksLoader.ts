import axios from "axios"
import { API_ENDPOINT } from "../../../../utils/api-connect"
import { defer } from "react-router-dom"

const getAllFeedbacks = async () => {
    try {
        const token = sessionStorage.getItem('token')
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