import { useEffect, useState } from 'react'
import axios from 'axios'
import { ICallUsers } from './dashboardInterface'
import UserCall from '../../Components/Dashboard/UserCall'

const DashMain = () => {
  const [usersToCall, setUsersToCall] = useState<Array<ICallUsers>>([])
  const [showArchive, setShowArchive] = useState(false)
  const [showFavorite, setShowFavorite] = useState(false)

  const getUsers = async () => {
    const { data } = await axios.get("/dashboard/get-all-data-users")

    console.log(data)
    setUsersToCall(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <h2 className='dashboard_main'>ניהול עמוד WEBY</h2>
      <div>
        <div onClick={() => {
          setShowArchive(false)
          setShowFavorite(false)
        }}>הכל</div>
        <div onClick={() => setShowFavorite(true)}>מועדפים</div>
        <div onClick={() => setShowArchive(true)}>ערכיון</div>
      </div>
      {usersToCall.length > 0 ?
        <div className='dashboard_main__callList'>
          <h3>שם הלקוח</h3>
          <h3>מספר טלפון</h3>
          <h3>אימייל</h3>
          <h3>במה צריך עזרה</h3>
          <h3>לארכיון</h3>
          <h3>מועדפים</h3>
          <h3>מחיקה לצמיתות</h3>
          {usersToCall.filter(i => i.archive === showArchive && i.favorite === showFavorite).map(us => (
            <UserCall user={us} key={us._id} />
          ))}
        </div>
        : <h3 className='no_data_text'>אין שיחות חדשות</h3>}
    </>
  )
}

export default DashMain