import Logo from '../../../../images/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const DashboardNav = () => {
    let location = useLocation();
    const navigation = useNavigate()

    const hendleLogout = async () => {
        await sessionStorage.removeItem('token')
        return navigation("/")
    }

    return (
        <nav className='dashboard_nav'>
            <div className='dashboard_nav__links'>
                {location.pathname !== "/dashboard" && <Link to="/dashboard">עמוד ראשי</Link>}
                <Link to="/dashboard/projects">פרויקטים שלנו</Link>
                <Link to="/dashboard/feedbacks">פידבקים שלנו</Link>
                <Link to="/dashboard/reg">רישום משתמש חדש</Link>
            </div>
            <div className='dashboard_nav__links--lefts-ide'>
                <Button color="secondary" variant="outlined" onClick={hendleLogout}>יציאה</Button>
                <Link to="/dashboard">
                    <img src={Logo} alt="weby logo" />
                </Link>
            </div>
        </nav>
    )
}

export default DashboardNav