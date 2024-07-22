import { FC } from 'react'

interface IFilterShow {
    setShowArchive: Function
    setShowFavorite: Function
    setActiveFilter: Function
    activeFilter: string
}

const FilterShow: FC<IFilterShow> = ({ setShowArchive, setShowFavorite, setActiveFilter, activeFilter }) => {
    return (
        <div className='dashboard_main__filter'>
            <div>
                <button onClick={() => {
                    setShowArchive(false)
                    setShowFavorite(false)
                    setActiveFilter("שיחות נכנסות")
                }}
                    className={activeFilter === "שיחות נכנסות" ? "active-btn" : "unactive-btn"}
                > שיחות נכנסות</button>
                <button onClick={() => {
                    setShowArchive(false)
                    setShowFavorite(true)
                    setActiveFilter("מועדפים")
                }}
                    className={activeFilter === "מועדפים" ? "active-btn" : "unactive-btn"}
                >מועדפים</button>
                <button onClick={() => {
                    setShowArchive(true)
                    setShowFavorite(false)
                    setActiveFilter("ערכיון")
                }}
                    className={activeFilter === "ערכיון" ? "active-btn" : "unactive-btn"}
                >ערכיון</button>
            </div>
        </div>
    )
}

export default FilterShow