import { Link, Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  let location = useLocation();

  return (
    <>
      {location.pathname !== "/dashboard" && <Link to="/dashboard">דשבורד</Link>}
      <Link to="/dashboard/reg">הרשמה</Link>
      <Link to="/dashboard/projects">פרויקטים שלנו</Link>
      <Outlet />
    </>
  )
}

export default Layout