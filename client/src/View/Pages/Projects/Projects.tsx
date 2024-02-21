import { Suspense, useState } from 'react'
import { IProject } from '../Dashboard/dashboardInterface'
import ProjectItem from '../../Components/Dashboard/Project'
import { headersProjects } from './headersProjects'
import { Await, Link, useLoaderData } from 'react-router-dom'
import AddBoxIcon from '@mui/icons-material/AddBox';

const Projects = () => {
  const { projects } = useLoaderData() as { projects: Array<IProject> }
  const [getProjects, setGetProjects] = useState<Array<IProject>>(projects)

  return (
    <div className='project_main'>
      <h2 className='big_header'>הפרויקטים שלנו</h2>
      <Link to="/dashboard/projects/add-new-roject"><AddBoxIcon />הוסף פרויקט חדש</Link>
      <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
        <Await resolve={projects}>

          <div className='project_main__projectList'>
            <div className='project_main__projectList--headers'>
              {headersProjects.map((header, i) => (
                <h3 key={i}>{header}</h3>
              ))}
            </div>
            {getProjects.length > 0 ?
              <div className='project_main__projectList--list'>
                {projects.map(pro => (
                  <ProjectItem key={pro._id}
                    project={pro}
                    setGetProjects={setGetProjects}
                    projects={projects} />))}
              </div>
              : <h3 className='no_data_text'>אין פרויקטים</h3>
            }
          </div>
        </Await>
      </Suspense>
    </div>
  )
}

export default Projects