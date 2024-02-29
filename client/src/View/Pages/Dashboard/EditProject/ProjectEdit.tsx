import { FC, Suspense, useState } from 'react'
import { useLoaderData, Await } from 'react-router-dom'
import { IProject } from '../dashboardInterface'
import ImageEdit from '../../../Components/Dashboard/Edit/ImageEdit/ImageEdit'
import TextEdit from '../../../Components/Dashboard/Edit/TextEdit/TextEdit'
import { Button } from '@mui/material'
// import FormBtn from '../../../UI/FormBtn/FormBtn'
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';

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
  const [editDraft, setEditDraft] = useState<boolean>(project.draft)
  const [loading, setLoading] = useState<boolean>(false)

  const hendleSaveAsDraftorNotToBe = async (draft: boolean, id: string) => {
    try {
      setLoading(true)
      const { data: { continueWork, message } } = await axios.patch("/dashboard/projects/draft-project", { id, draft })
      if (continueWork) {
        alert(message)
        setEditDraft(draft)
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

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
            <div className="edit_btn">
              <Button className="edit_btn" color="secondary" variant="contained" onClick={() => setEditImagePop(!editImagePop)}>עידכון תמונה</Button>
            </div>
            <img className='edit_project__image' src={urlProject} alt={project.name} />
            <div className='edit_project__crop-image'>
              <img className='edit_project__image2' src={urlProject} alt={project.name} />
            </div>
          </div>
          <div>
            <div className="edit_btn">
              <Button color="secondary" variant="contained" onClick={() => setEditTextPop(!editTextPop)}>עידכון טקסט</Button>
            </div>
            <div dir="ltr">
              <Button
                sx={{ marginTop: "2%", marginLeft: "2%" }}
                type="button"
                color="secondary"
                variant="outlined"
                size="medium"
                endIcon={<SendIcon />}
                disabled={loading}
                onClick={() => hendleSaveAsDraftorNotToBe(!editDraft, project._id)}
              >
                {loading ? "כמה רגעים" : editDraft ? "הצג את הפרויקט" : "העבר לטיוטה"}
              </Button>
            </div>
            <div className='edit_project__texts'>
              <h2 className='big_header'>{textProject.name}</h2>
              <p>{textProject.description}</p>
              <p>{textProject.urlSite}</p>
            </div>
          </div>
        </div>
      </Await>
    </Suspense>
  )
}

export default ProjectEdit;