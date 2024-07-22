import { Suspense, useState } from 'react'
import { ICallUser } from './dashboardInterface'
import { headerUsersCall } from './headersUsersCall'
import UserCall from '../../../Components/Dashboard/UserCall'
import { Await, useLoaderData } from 'react-router-dom'
import SEO from '../../../Components/SEO/SEO'
import FilterShow from './FilterShow'

const DashMain = () => {
  const { usersCalls } = useLoaderData() as { usersCalls: ICallUser[] }
  const [usersToCall, setUsersToCall] = useState<Array<ICallUser>>(usersCalls)
  const [showArchive, setShowArchive] = useState<boolean>(false)
  const [showFavorite, setShowFavorite] = useState<boolean>(false)
  const [activeFilter, setActiveFilter] = useState<string>("שיחות נכנסות")

  return (
    <div className='dashboard_main'>
      <SEO title={"עמוד ראשי"} />
      <h2 className='big_header'>ניהול עמוד WEBY</h2>
      <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
        <Await resolve={usersCalls}>
          <FilterShow
            setShowArchive={setShowArchive}
            setShowFavorite={setShowFavorite}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />

          <div className='dashboard_main__callList'>
            <div className='dashboard_main__callList--headers'>
              {headerUsersCall.map((header, i) => (
                <h3 key={i}>{header}</h3>
              ))}
            </div>
            <div className='dashboard_main__callList--users'>
              {usersToCall.length > 0 ?
                usersToCall
                  .filter(i => i.archive === showArchive && i.favorite === showFavorite)
                  .map(us => (
                    <UserCall key={us._id} usersToCall={usersToCall} setUsersToCall={setUsersToCall} user={us} />
                  )) : <h3 className='no_data_text'>אין שיחות</h3>}
            </div>
          </div>
        </Await>
      </Suspense>
    </div >
  )
}

export default DashMain;