import React, { FC, useState } from 'react'
import { ICallUsers } from '../../Pages/Dashboard/dashboardInterface'

export interface IUserCall {
    user: ICallUsers
}
const UserCall: FC<IUserCall> = ({ user }) => {
    const [archive, setArcive] = useState<boolean>(user.archive!)
    const [favorite, setFavorite] = useState<boolean>(user.favorite!)

    // const hendleArchive = () => {
        
    // }

    return (
        <>
            <p>{user.userName}</p>
            <p>{user.userHelp}</p>
            <p>{user.userEmail}</p>
            <p>{user.userPhone}</p>
            <button>העבר לערכיון</button>
            <button>העבר למועדפים</button>
            <button>מחיקה</button>
        </>
    )
}

export default UserCall