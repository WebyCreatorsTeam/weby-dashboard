import axios from "axios"
import { defer } from "react-router-dom"

const hendleGetProjects = async () => {
    const { data } = await axios.get("https://weby-dashboard-api.vercel.app/dashboard/projects/get-all-data-projects")
    return data
  }
  
  export const projectsLoader = async () => {
    return defer({
      projects: await hendleGetProjects()
    })
  }