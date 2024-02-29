import { FC } from 'react'
import { IFrom } from '../AuthForm/formIntarface'

const ProjectsForm: FC<IFrom> = ({ children }) => {
    return (
        <form className='auth-form'>
            {children}
        </form>
    )
}

export default ProjectsForm