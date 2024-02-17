import React, { FC } from 'react'
import { ICallUsers } from '../../Pages/Dashboard/dashboardInterface'

export interface IUserCall {
    user: ICallUsers
}
const UserCall:FC<IUserCall> = ({user}) => {
    return (
        <div>
            <p>{user.userName}</p>
            <p>{user.userHelp}</p>
            <p>{user.userEmail}</p>
            <p>{user.userPhone}</p>
        </div>
    )
}

export default UserCall