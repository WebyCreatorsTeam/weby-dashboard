import { Link, Outlet, useLocation } from 'react-router-dom'
import Logo from '../images/logo.png'
// import LogoBig from '../images/logo-big.png'

const Layout = () => {
  let location = useLocation();

  return (
    <div dir="rtl">
      <nav className='dashboard_nav'>
        <div className='dashboard_nav__links'>
          {location.pathname !== "/dashboard" && <Link to="/dashboard">עמוד ראשי</Link>}
          <Link to="/dashboard/reg">רישום משתמש חדש</Link>
          <Link to="/dashboard/projects">פרויקטים שלנו</Link>
        </div>
        <div>
          <Link to="/dashboard">
            <img src={Logo} alt="weby logo" />
          </Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout