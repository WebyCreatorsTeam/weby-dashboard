import axios from 'axios'
import { FC, Suspense, useState } from 'react'
import { defer, useLoaderData, Await } from 'react-router-dom'
import { IProject } from '../../Pages/Dashboard/dashboardInterface'
import ImageEdit from './Edit/ImageEdit'

const ProjectEdit: FC = () => {
  const [editImagePop, setEditImagePop] = useState<boolean>(false)
  const { project } = useLoaderData() as { project: IProject }
  const [urlProject, setUrlProject] = useState<string>(project.urlImage)

  return (
    <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
      <Await resolve={project}>
        <div className='edit_project'>
          {editImagePop && <ImageEdit 
          setEditImagePop={setEditImagePop}
          setUrlProject={setUrlProject}
          id={project._id}
          oldUrl={project.urlImage}
          />}
          <div className='edit_project__header-image'>
            <button
              className='edit_project__btn-chenge-image'
              onClick={() => setEditImagePop(!editImagePop)}
            >עדכן תמונה</button>
            <img className='edit_project__image' src={urlProject} alt={project.name} />
            <div className='edit_project__crop-image'>
              <img className='edit_project__image2' src={urlProject} alt={project.name} />
            </div>
          </div>
          <h2 className='big_header'>{project.name}</h2>
          <p>{project.description}</p>
          <p>{project.urlSite}</p>
        </div>
      </Await>
    </Suspense>
  )
}

export default ProjectEdit

const getProject = async (id: string) => {
  const { data } = await axios.post("/dashboard/projects/show-project", { id })
  return data
}

export const projectLoader = async ({ params }: any) => {
  const { id } = params
  return defer({
    project: await getProject(id)
  })
}