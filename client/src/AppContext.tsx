import React, { useState } from 'react'
// import { fetchInfo } from './utility'
import data from './mock.json'

export const AppCtx = React.createContext()


const AppContext = (props) => {
  
  const [savedVideos] = useState([])
  const [hotReel] = useState([...data])

  // useEffect(() => {
  //   fetchInfo()
  //     .then(res => setHotReel(res.items))
  //     .catch(error => console.log('there was an error fetching vids =>', error ))
  // }, [])

  return(
    <AppCtx.Provider value={{ savedVideos, hotReel }}>
      { props.children }
    </AppCtx.Provider>
  )
}

export default AppContext