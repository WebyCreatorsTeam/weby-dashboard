import { Suspense, useState } from 'react'
import { IProject } from '../UsersCalls/dashboardInterface'
import ProjectItem from '../../../Components/Dashboard/Project'
import { headersProjects } from './headersProjects'
import { Await, Link, useLoaderData } from 'react-router-dom'
import { Button } from '@mui/material'

const Projects = () => {
  const { projects } = useLoaderData() as { projects: Array<IProject> }
  const [getProjects, setGetProjects] = useState<Array<IProject>>(projects)

  return (
    <div className='project_main'>
      <h2 className='big_header'>הפרויקטים שלנו</h2>
      <Link
        to="/dashboard/projects/add-new-roject">
        <Button color="secondary" variant="contained"> הוסף פרויקט חדש </Button></Link>
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
                {getProjects.map(pro => (
                  <div key={pro._id}>
                    <div>{pro.draft ? <h4 style={{ color: "red" }}>שמור בטיוטה</h4> : <h4 style={{ color: "green" }}>מוצג באתר</h4>}</div>
                    <ProjectItem
                      project={pro}
                      setGetProjects={setGetProjects}
                      projects={getProjects} />
                  </div>
                ))}
              </div> : <h3 className='no_data_text'>אין פרויקטים</h3>}
          </div>
        </Await>
      </Suspense>
    </div>
  )
}

export default Projects