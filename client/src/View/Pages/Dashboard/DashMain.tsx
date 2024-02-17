import { useEffect, useState } from 'react'
import axios from 'axios'
import { ICallUsers } from './dashboardInterface'
import UserCall from '../../Components/Dashboard/UserCall'

const DashMain = () => {
  const [usersToCall, setUsersToCall] = useState<Array<ICallUsers>>([])

  const getUsers = async () => {
    const { data } = await axios.get("/dashboard/get-all-data-users")
    setUsersToCall(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div>DashMain</div>
      {
        usersToCall.length > 0 ? usersToCall.map(us => (
          <UserCall user={us} key={us._id}/>
        )) : <div>No data</div>
      }
    </>
  )
}

export default DashMain