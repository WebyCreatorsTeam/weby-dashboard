import { FC } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { red } from '@mui/material/colors';
import LaunchIcon from '@mui/icons-material/Launch';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IProject } from '../../Pages/Dashboard/dashboardInterface'

export interface IProjectProps {
    project: IProject
    setGetProjects: Function
    projects: Array<IProject>
}

const ProjectItem: FC<IProjectProps> = ({ project,  setGetProjects, projects}) => {
    const hendleDeleteProject = async (id: string, url: string) => {
        const { data } = await axios.delete("/dashboard/projects/delete-project", { data: { id, url } })
        console.log(data)
        const {continueWork} = data
        if(continueWork) return setGetProjects([...projects].filter(pro=> pro._id !== id))
    }

    return (
        <div className='project_main__projectList--list__onePro'>
            <img className="project_main__projectList--img" src={project.urlImage} alt={project.name} />
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <div className='project_main__projectList--list__onePro--links'>
                <a href={project.urlSite}
                    title="קישור לאתר"
                    className='project_main__projectList--list__onePro--url'>
                    <LaunchIcon sx={{ fontSize: 30 }}
                        color="primary" /></a>
            </div>
            <div className='project_main__projectList--list__onePro--links'>
                <Link
                    title="ערוך פרויקט"
                    to={`/dashboard/projects/project/${project._id}`}
                    className='project_main__projectList--list__onePro--url'>
                    <EditNoteIcon sx={{ fontSize: 40 }}
                        color="primary" /></Link>
            </div>
            <div className='project_main__projectList--list__onePro--links'>
                <DeleteForeverIcon
                    className='project_main__projectList--list__onePro--deleteBtn'
                    onClick={() => hendleDeleteProject(project._id, project.urlImage)}
                    sx={{ fontSize: 30, color: red[900] }}
                />
            </div>
        </div>
    )
}

export default ProjectItem
