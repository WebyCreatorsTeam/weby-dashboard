import axios from "axios"
import { defer } from "react-router-dom"

const getProject = async (id: string) => {
    const { data } = await axios.post("https://weby-dashboard-api.vercel.app/dashboard/projects/show-project", { id })
    return data
  }
  
  export const projectLoader = async ({ params }: any) => {
    const { id } = params
    return defer({
      project: await getProject(id)
    })
  }