import { FC } from 'react'
import { IProject } from '../../Pages/Dashboard/dashboardInterface'
import axios from 'axios'

export interface IProjectProps {
    project: IProject
}

const ProjectItem: FC<IProjectProps> = ({ project }) => {
    const hendleDeleteProject = async (id: string, url: string) => {
        const { data } = await axios.delete("/dashboard/projects/delete-project", { data: { id, url } })
        console.log(data)
    }

    return (
        <>
            <img className="project_main__projectList--img" src={project.urlImage} alt={project.name} />
            <p>{project.name}</p>
            <p>{project.description}</p>
            <a href={project.urlSite}>לינק לאתר</a>
            <button type="button" disabled>עריכת פרויקט</button>
            <button onClick={() => hendleDeleteProject(project._id, project.urlImage)} type="button">מחיקת פרויקט לצמיתות</button>
        </>
    )
}

export default ProjectItem