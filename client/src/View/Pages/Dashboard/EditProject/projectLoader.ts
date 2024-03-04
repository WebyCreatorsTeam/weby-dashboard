import axios from "axios"
import { defer } from "react-router-dom"
import { API_ENDPOINT } from "../../../../utils/api-connect"

const getProject = async (id: string) => {
  const token = sessionStorage.getItem('token')
  const { data } = await axios.post(`${API_ENDPOINT}/dashboard/projects/show-project?token=${token}`, { id })
  return data
}

export const projectLoader = async ({ params }: any) => {
  const { id } = params
  return defer({
    project: await getProject(id)
  })
}