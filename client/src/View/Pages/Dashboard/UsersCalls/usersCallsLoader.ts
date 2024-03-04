import axios from "axios"
import { defer } from "react-router-dom"
import { API_ENDPOINT } from "../../../../utils/api-connect"
import { token } from "../../../../utils/token-get"

const hendleGetCalls = async () => {
    try {
        // const token=sessionStorage.getItem('token')
        const { data: { continueWork, usersCalls } } = await axios.get(`${API_ENDPOINT}/dashboard/users/get-all-data-users?token=${token}`)
        if (continueWork) return usersCalls
    } catch (error) {
        alert(error)
    }
}

export const usersCallsLoader = async () => {
    return defer({
        usersCalls: await hendleGetCalls()
    })
}