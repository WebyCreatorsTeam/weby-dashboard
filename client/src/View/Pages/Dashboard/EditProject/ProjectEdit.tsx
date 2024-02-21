import { FC, Suspense, useState } from 'react'
import { useLoaderData, Await } from 'react-router-dom'
import { IProject } from '../dashboardInterface'
import ImageEdit from '../../../Components/Dashboard/Edit/ImageEdit/ImageEdit'
import TextEdit from '../../../Components/Dashboard/Edit/TextEdit/TextEdit'

export interface TextProject {
  name: string
  description: string
  urlSite: string
}

const ProjectEdit: FC = () => {
  const { project } = useLoaderData() as { project: IProject }
  const [urlProject, setUrlProject] = useState<string>(project.urlImage)
  const [textProject, setTextProject] = useState<TextProject>({ name: project.name, description: project.description, urlSite: project.urlSite })
  const [editImagePop, setEditImagePop] = useState<boolean>(false)
  const [editTextPop, setEditTextPop] = useState<boolean>(false)

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
          {editTextPop && <TextEdit
            setEditTextPop={setEditTextPop}
            textProject={textProject}
            id={project._id}
            setTextProject={setTextProject}
          />
          }
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
          <button onClick={() => setEditTextPop(!editTextPop)}>עדכן טקסט</button>
          <div className='edit_project__texts'>
            <h2 className='big_header'>{textProject.name}</h2>
            <p>{textProject.description}</p>
            <p>{textProject.urlSite}</p>
          </div>
        </div>
      </Await>
    </Suspense>
  )
}

export default ProjectEdit;