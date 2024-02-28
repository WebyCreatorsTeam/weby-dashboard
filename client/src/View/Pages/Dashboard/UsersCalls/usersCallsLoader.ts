import axios from "axios"
import { defer } from "react-router-dom"

const hendleGetCalls = async () => {
    try {
        const { data: { continueWork, usersCalls } } = await axios.get("/dashboard/users/get-all-data-users")
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