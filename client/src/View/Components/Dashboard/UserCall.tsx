import { FC, useState } from 'react'
import { ICallUser } from '../../Pages/Dashboard/UsersCalls/dashboardInterface'
import axios from 'axios'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red, yellow, blue } from '@mui/material/colors';
import { API_ENDPOINT } from '../../../utils/api-connect';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export interface IUserCall {
    user: ICallUser
    setUsersToCall: Function
    usersToCall: ICallUser[]
}

const blueOfArchive = blue[800]
const yellowOfFavorite = yellow[700]
const iconsSize = 30

const UserCall: FC<IUserCall> = ({ user, setUsersToCall }) => {
    const [archive, setArcive] = useState<boolean>(user.archive!)
    const [favorite, setFavorite] = useState<boolean>(user.favorite!)

    const hendleArchive = async (userId: string) => {
        const token = cookies.get('token')
        const { data: { continueWork, archiveUser, favoriteUser } } = await axios.patch(`${API_ENDPOINT}/dashboard/users/archive-user?token=${token}`, {
            userId, archive: !archive, favorite: false
        })
        if (continueWork) {
            setArcive(archiveUser)
            setFavorite(favoriteUser)
            return setUsersToCall((users: ICallUser[]) => users.map(us => us._id === userId ? { ...us, archive: archiveUser, favorite: favoriteUser } : us))
        }
    }

    const hendleFavorite = async (userId: string) => {
        const token = cookies.get('token')
        const { data: { continueWork, archiveUser, favoriteUser } } = await axios.patch(`${API_ENDPOINT}/dashboard/users/favorite-user?token=${token}`, {
            userId, archive: false, favorite: !favorite
        })

        if (continueWork) {
            setArcive(archiveUser)
            setFavorite(favoriteUser)
            return setUsersToCall((users: ICallUser[]) => users.map(us => us._id === userId ? { ...us, archive: archiveUser, favorite: favoriteUser } : us))
        }
    }

    const deleteUser = async (userId: string) => {
        if (window.confirm("האם את/ה בטוח/ה שאת/ה רוצה למחוק לקוח זה?")) {
            if (prompt('נא להכניס מילה "תמחק"') === "תמחק") {
                const token = cookies.get('token')
                const { data: { continueWork } } = await axios.delete(`${API_ENDPOINT}/dashboard/users/delete-user?token=${token}`, { data: { userId } })
                if (continueWork) return setUsersToCall((users: ICallUser[]) => users.filter(us => us._id !== userId))
            }
        }
    }

    return (
        <div className='dashboard_main__callList--users-items'>
            <p>{user.userName}</p>
            <p>{user.userPhone}</p>
            <p>{user.userEmail}</p>
            <p>{user.userHelp}</p>
            <div
                className='dashboard_main__callList--users-items--links'
                onClick={() => hendleArchive(user._id)}
            >
                {archive ?
                    <ArchiveIcon sx={{ fontSize: iconsSize, color: blueOfArchive }} /> :
                    <ArchiveOutlinedIcon sx={{ fontSize: iconsSize, color: blueOfArchive }} />
                }
            </div>
            <div
                className='dashboard_main__callList--users-items--links'
                onClick={() => hendleFavorite(user._id)}>
                {favorite ?
                    <StarRateIcon sx={{ fontSize: iconsSize, color: yellowOfFavorite }} /> :
                    <StarBorderIcon sx={{ fontSize: iconsSize, color: yellowOfFavorite }} />
                }
            </div>
            <div
                className='dashboard_main__callList--users-items--links'
                onClick={() => deleteUser(user._id)}>
                <DeleteForeverIcon sx={{ fontSize: iconsSize, color: red[900] }} />
            </div>
        </div>
    )
}

export default UserCall;