import { FC, useState } from 'react'
import { ICallUser } from '../../Pages/Dashboard/dashboardInterface'
import axios from 'axios'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red, yellow, blue } from '@mui/material/colors';

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
        const { data: { continueWork, archiveUser, favoriteUser } } = await axios.patch("https://weby-dashboard-api.vercel.app/dashboard/users/archive-user", {
            userId, archive: !archive, favorite: false
        })
        if (continueWork) {
            setArcive(archiveUser)
            setFavorite(favoriteUser)
            return setUsersToCall((users: ICallUser[]) => users.map(us => us._id === userId ? { ...us, archive: archiveUser, favorite: favoriteUser } : us))
        }
    }

    const hendleFavorite = async (userId: string) => {
        const { data: { continueWork, archiveUser, favoriteUser } } = await axios.patch("https://weby-dashboard-api.vercel.app/dashboard/users/favorite-user", {
            userId, archive: false, favorite: !favorite
            // userId, favorite: !favorite, archive: archive === true ? true : false
        })

        if (continueWork) {
            setArcive(archiveUser)
            setFavorite(favoriteUser)
            return setUsersToCall((users: ICallUser[]) => users.map(us => us._id === userId ? { ...us, archive: archiveUser, favorite: favoriteUser } : us))
        }
    }

    const deleteUser = async (userId: string) => {
        if (window.confirm("האם את/ה בטוח/ה שאת/ה רוצה למחוק לקוח זה?") === true) {
            if (prompt('נא להכניס מילה "תמחק"') === "תמחק") {
                const { data: { continueWork } } = await axios.delete("https://weby-dashboard-api.vercel.app/dashboard/users/delete-user", { data: { userId } })
                if (continueWork) return setUsersToCall((users: ICallUser[]) => users.filter(us => us._id !== userId))
            }
        }
    }

    return (
        <>
            <p>{user.userName}</p>
            <p>{user.userPhone}</p>
            <p>{user.userEmail}</p>
            <p>{user.userHelp}</p>
            <div onClick={() => hendleArchive(user._id)}>
                {archive ?
                    <ArchiveIcon sx={{ fontSize: iconsSize, color: blueOfArchive }} /> :
                    <ArchiveOutlinedIcon sx={{ fontSize: iconsSize, color: blueOfArchive }} />
                }</div>
            <div onClick={() => hendleFavorite(user._id)}>
                {favorite ?
                    <StarRateIcon sx={{ fontSize: iconsSize, color: yellowOfFavorite }} /> :
                    <StarBorderIcon sx={{ fontSize: iconsSize, color: yellowOfFavorite }} />
                }</div>
            <div onClick={() => deleteUser(user._id)}><DeleteForeverIcon sx={{ fontSize: iconsSize, color: red[900] }} /></div>
        </>
    )
}

export default UserCall