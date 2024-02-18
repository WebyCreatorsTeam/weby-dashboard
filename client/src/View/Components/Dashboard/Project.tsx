import { FC } from 'react'
import { IProject } from '../../Pages/Dashboard/dashboardInterface'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
            <Link to={`/dashboard/projects/project/${project._id}`}>עריכת פרויקט</Link>
            <button onClick={() => hendleDeleteProject(project._id, project.urlImage)} type="button">מחיקת פרויקט לצמיתות</button>
        </>
    )
}

export default ProjectItem