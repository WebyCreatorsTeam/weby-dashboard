import axios from "axios"
import { defer } from "react-router-dom"
import { API_ENDPOINT } from "../../../../utils/api-connect"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const hendleGetProjects = async () => {
  const token = cookies.get('token')
  const { data } = await axios.get(`${API_ENDPOINT}/dashboard/projects/get-all-data-projects?token=${token}`)
  return data
}

export const projectsLoader = async () => {
  return defer({
    projects: await hendleGetProjects()
  })
}