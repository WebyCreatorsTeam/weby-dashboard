import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react';
import Logo from '../../../UI/Logo';
import { Close, Menu } from '@mui/icons-material';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const DashboardNav = () => {
    const navigation = useNavigate()
    const desktop = useMediaQuery({ query: '(min-width: 768px)' })
    const [toggleMenu, setToggleMenu] = useState(false);

    const hendleLogout = async () => {
        await cookies.remove('token')
        return navigation("/")
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (desktop) setToggleMenu(false)
        })
    }, [desktop])

    return (
        <header>
            <div className={desktop ? "container" : ''}>
                {!desktop && (
                    <button
                        onClick={() => setToggleMenu(!toggleMenu)}
                    >{toggleMenu ? <Close /> : <Menu />}</button>
                )}
                {
                    (toggleMenu || desktop) && (
                        <nav className={`dashboard_nav`}>
                            <div className='dashboard_nav__links'>
                                <Link to="/dashboard">עמוד ראשי</Link>
                                <Link to="/dashboard/projects">פרויקטים</Link>
                                <Link to="/dashboard/feedbacks">פידבקים</Link>
                                <Link to="/dashboard/blog">בלוג</Link>
                                <Link to="/dashboard/reg">רישום משתמש חדש</Link>
                                <Button color="secondary" variant="outlined" onClick={hendleLogout}>יציאה</Button>
                            </div>
                        </nav>
                    )
                }

                <div className='dashboard_nav__links--lefts-ide'>
                    <Logo />
                </div>
            </div>
        </header>
    )
}

export default DashboardNav