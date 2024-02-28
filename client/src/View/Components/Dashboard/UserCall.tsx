import React, { FC } from 'react'
import { ICallUser } from '../../Pages/Dashboard/dashboardInterface'
import axios from 'axios'

export interface IUserCall {
    user: ICallUser
    setUsersToCall: Function
    usersToCall: ICallUser[]
}
const UserCall: FC<IUserCall> = ({ user, setUsersToCall, usersToCall }) => {
    // const [archive, setArcive] = useState<boolean>(user.archive!)
    // const [favorite, setFavorite] = useState<boolean>(user.favorite!)

    const hendleArchive = async (userId: string) => {
        const { data: { continueWork } } = await axios.patch("/dashboard/users/archive-user", { userId })
        if (continueWork) return setUsersToCall((users: ICallUser[]) => users.map(us => us._id == userId ? { ...us, archive: true } : { ...us }))
    }

    const hendleFavorite = async (userId: string) => {
        const { data: { continueWork } } = await axios.patch("/dashboard/users/favorite-user", { userId })
        if (continueWork) return setUsersToCall((users: ICallUser[]) => users.map(us => us._id == userId ? { ...us, favorite: true } : { ...us }))
    }

    const deleteFavorite = async (userId: string) => {
        const { data: { continueWork } } = await axios.delete("/dashboard/users/delete-user", { data: { userId } })
        // console.log(data)
        if (continueWork) return setUsersToCall((users: ICallUser[]) => users.filter(us => us._id !== userId))
    }

    return (
        <>
            <p>{user.userName}</p>
            <p>{user.userPhone}</p>
            <p>{user.userEmail}</p>
            <p>{user.userHelp}</p>
            <button type="button" onClick={() => hendleArchive(user._id)}>העבר לערכיון</button>
            <button type="button" onClick={() => hendleFavorite(user._id)}>העבר למועדפים</button>
            <button type="button" onClick={() => deleteFavorite(user._id)}>מחיקה</button>
        </>
    )
}

export default UserCall