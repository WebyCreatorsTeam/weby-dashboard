import { useEffect, useState } from 'react'
import axios from 'axios'
import { ICallUser } from './dashboardInterface'
import UserCall from '../../Components/Dashboard/UserCall'
import { headerUsersCall } from './headersUsersCall'
// import SendFile from '../../SendFile'

const DashMain = () => {
  const [usersToCall, setUsersToCall] = useState<Array<ICallUser>>([])
  const [loading, setLoading] = useState(false)
  // const [showArchive, setShowArchive] = useState(false)
  // const [showFavorite, setShowFavorite] = useState(false)

  const getUsers = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/dashboard/users/get-all-data-users")
      setUsersToCall(data)
    } catch (error) {
      alert(error);
    } finally {
      setLoading(true)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='dashboard_main'>
      <h2 className='big_header'>ניהול עמוד WEBY</h2>
      {/* <SendFile/> */}
      <div>
        {/* <div onClick={() => {
          setShowArchive(false)
          setShowFavorite(false)
        }}>הכל</div>
        <div onClick={() => setShowFavorite(true)}>מועדפים</div>
        <div onClick={() => setShowArchive(true)}>ערכיון</div> */}
      </div>
      {usersToCall.length > 0 ?
        <div className='dashboard_main__callList'>
          {headerUsersCall.map((header, i) => (
            <h3 key={i}>{header}</h3>
          ))}
          {usersToCall
            // .filter(i => i.archive === showArchive && i.favorite === showFavorite)
            .map(us => (
              <UserCall user={us} key={us._id} />
            ))}
        </div>
        : <h3 className='no_data_text'>{loading ? "טעון" : "אין שיחות חדשות"}</h3>}
    </div>
  )
}

export default DashMain;