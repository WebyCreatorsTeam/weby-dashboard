import React, { FC } from 'react'
import { ICallUser } from '../../Pages/Dashboard/dashboardInterface'
import axios from 'axios'

export interface IUserCall {
    user: ICallUser
}
const UserCall: FC<IUserCall> = ({ user }) => {
    // const [archive, setArcive] = useState<boolean>(user.archive!)
    // const [favorite, setFavorite] = useState<boolean>(user.favorite!)

    const hendleArchive = async (userId: string) => {
        const { data } = await axios.post("/dashboard/users/archive-user", { userId })
        console.log(data)
    }

    return (
        <>
            <p>{user.userName}</p>
            <p>{user.userPhone}</p>
            <p>{user.userEmail}</p>
            <p>{user.userHelp}</p>
            <button type="button" onClick={() => hendleArchive(user._id)}>העבר לערכיון</button>
            <button type="button" disabled>העבר למועדפים</button>
            <button type="button" disabled>מחיקה</button>
        </>
    )
}

export default UserCall