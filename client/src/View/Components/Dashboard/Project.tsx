import { FC } from 'react'
import { IProject } from '../../Pages/Dashboard/dashboardInterface'
// import { IProjectProps } from '../../Pages/Dashboard/dashboardInterface'
// import { ICallUsers } from '../../Pages/Dashboard/dashboardInterface'

export interface IProjectProps {
    project: IProject
}
const ProjectItem: FC<IProjectProps> = ({ project }) => {
    return (
        <>
            <img className="project_main__projectList--img" src={project.urlImage}/>
            <p>{project.name}</p>
            <p>{project.description}</p>
            <a href={project.urlSite}>לינק לאתר</a>
            <button type="button" disabled>עריכת פרויקט</button>
            <button type="button" disabled>מחיקת פרויקט לצמיתות</button>
        </> 
    )
}

export default ProjectItem