import React, { FC } from 'react'
import { ICallUsers } from '../../Pages/Dashboard/dashboardInterface'

export interface IUserCall {
    user: ICallUsers
}
const UserCall: FC<IUserCall> = ({ user }) => {
    // const [archive, setArcive] = useState<boolean>(user.archive!)
    // const [favorite, setFavorite] = useState<boolean>(user.favorite!)

    // const hendleArchive = () => {
        
    // }

    return (
        <>
            <p>{user.userName}</p>
            <p>{user.userHelp}</p>
            <p>{user.userEmail}</p>
            <p>{user.userPhone}</p>
            <button type="button" disabled>העבר לערכיון</button>
            <button type="button" disabled>העבר למועדפים</button>
            <button type="button" disabled>מחיקה</button>
        </> 
    )
}

export default UserCall