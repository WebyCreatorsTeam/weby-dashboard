import React, { FC } from 'react'
import { ICallUser } from '../../Pages/Dashboard/dashboardInterface'

export interface IUserCall {
    user: ICallUser
}
const UserCall: FC<IUserCall> = ({ user }) => {
    // const [archive, setArcive] = useState<boolean>(user.archive!)
    // const [favorite, setFavorite] = useState<boolean>(user.favorite!)

    // const hendleArchive = () => {
        
    // }

    return (
        <>
            <p>{user.userName}</p>
            <p>{user.userPhone}</p>
            <p>{user.userEmail}</p>
            <p>{user.userHelp}</p>
            <button type="button" disabled>העבר לערכיון</button>
            <button type="button" disabled>העבר למועדפים</button>
            <button type="button" disabled>מחיקה</button>
        </> 
    )
}

export default UserCall