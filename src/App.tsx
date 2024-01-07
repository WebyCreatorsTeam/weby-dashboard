import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

interface AppQQQ {
  _id: string
  _v?: string
  userName: string
  userPhone: string
  userEmail: string
  userHelp: string
}

function App() {
  const [info, setInfo] = useState<Array<AppQQQ>>([])

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("https://weby-team.onrender.com/dashboard/get-all-data-users")
      console.log(data)
      return setInfo(data)
    })()
  }, [])

  return (
    <div dir='rtl'>
      {info.length > 0 ? info.map(i => (
        <>
          <h2>{i.userName}</h2>
          <p>
            <a href={`tel:${i.userPhone}`}>{i.userPhone}</a>
          </p>
          <p>
            <a href={`mailto:${i.userEmail}`}>{i.userEmail}</a>
          </p>
          <p>{i.userHelp}</p>
        </>
      )) :
        <>No data</>
      }
    </div>
  )
}

export default App
