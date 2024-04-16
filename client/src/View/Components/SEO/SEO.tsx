import { FC } from 'react'
import { Helmet } from 'react-helmet-async';

export interface ISEO {
    title?: string
}
const SEO: FC<ISEO> = ({ title }) => {
    return (
        <Helmet>
            <title>{title ? `Weby Dashboard | ${title}` : "Weby Dasboard"}</title>
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://weby-dashboard-client.vercel.app/logo_white_bkgr.png" />
            <meta property="og:image:alt" content="לוגו של וובי" />
            <meta property="og:url" content="https://weby-dashboard-client.vercel.app/" />
            <meta property="og:title" content={title} />
        </Helmet>
    )
}

export default SEO