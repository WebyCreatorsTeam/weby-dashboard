import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IProject } from '../Dashboard/dashboardInterface'
import ProjectItem from '../../Components/Dashboard/Project'
import { headersProjects } from './headersProjects'
import { Link } from 'react-router-dom'

const Projects = () => {
  const [loading, setLoading] = useState(false)
  const [allProjects, setAllProjects] = useState<Array<IProject>>([])

  const hendleGetProjects = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/dashboard/projects/get-all-data-projects")
      setAllProjects(data)
      console.log(data)
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    hendleGetProjects()
  }, [])

  return (
    <div className='project_main'>
      <h2 className='big_header'>הפרויקטים שלנו</h2>
      <Link to="/dashboard/projects/add-new-roject">הוסף פרויקט חדש</Link>
      {allProjects.length > 0 ?
        <div className='project_main__projectList'>
          {headersProjects.map((header, i)=>(
            <h3 key={i}>{header}</h3>
          ))}
          {allProjects
            .map(pro => (
              <ProjectItem project={pro} key={pro._id} />
            ))}
        </div>
        : <h3 className='no_data_text'>{loading ? "טעון" : "אין פרויקטים"}</h3>}
    </div>
  )
}

export default Projects