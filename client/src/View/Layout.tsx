import { Outlet } from 'react-router-dom'
import DashboardNav from './Components/Dashboard/NavBar/DashboardNav'

const Layout = () => {
  return (
    <div dir="rtl">
      <DashboardNav/>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout