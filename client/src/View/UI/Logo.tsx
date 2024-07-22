import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link to="/">
            <img
                src="/logo2_without_bkgr.svg"
                alt="Weby Team Logo"
                width={230}
                height={60}
            />
        </Link>
    )
}

export default Logo