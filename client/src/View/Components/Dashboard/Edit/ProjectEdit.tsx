import axios from 'axios'
import { FC, Suspense, useState } from 'react'
import { defer, useLoaderData, Await } from 'react-router-dom'
import { IProject } from '../../../Pages/Dashboard/dashboardInterface'
import ImageEdit from './ImageEdit'

const ProjectEdit: FC = () => {
  const { project } = useLoaderData() as { project: IProject }
  const [urlProject, setUrlProject] = useState<string>(project.urlImage)
  // const [textProject, setTextProject] = useState({ name: project.name, description: project.description, urlSite: project.urlSite })
  const [editImagePop, setEditImagePop] = useState<boolean>(false)
  // const [editTextPop, setEditTextPop] = useState<boolean>(false)

  // console.log(textProject)
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




          {/* <div>
            <div>
              <button onClick={() => setEditTextPop(false)}>X</button>
              <form>
                <label htmlFor="name">
                  כותרת
                </label>
                <input type="text" id="name" name="name" placeholder='הכנס כותרת הרפויקט' defaultValue={textProject.name} />
                <label htmlFor="descritption">
                  תיאור
                </label>
                <input type="text" id="descritption" name="descritption" placeholder='הכנס תיאור הפרויקט' defaultValue={textProject.description} />
                <label htmlFor="urlSite">
                  קישור
                </label>
                <input type="text" id="urlSite" name="urlSite" placeholder='הכנס קישור לפרויקט' defaultValue={textProject.urlSite} />
              </form>
            </div>
          </div> */}




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