import axios from "axios"
import { defer } from "react-router-dom"
import { API_ENDPOINT } from "../../../../utils/api-connect"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getProject = async (id: string) => {
  try {
    const token = cookies.get('token')
    const { data } = await axios.post(`${API_ENDPOINT}/dashboard/projects/show-project?token=${token}`, { id })
    return data
  } catch (error) {
    alert(error)
  }
}

export const projectLoader = async ({ params }: any) => {
  const { id } = params
  return defer({
    project: await getProject(id)
  })
}