import React, { useState } from 'react'
// import { channelOwnerInfo } from './utility'
import data from './mock.json'

export const AppCtx = React.createContext()


const AppContext = (props) => {
  
  const [savedVideos] = useState([])
  const [hotReel] = useState([...data])

  // useEffect(() => {
  //   channelOwnerInfo(hotReel)
  //     .then(res => setHotReel(res))
  //     .catch(error => console.log('error from setting channelOwnerInfo =>', error ))
  // }, [hotReel])

  return(
    <AppCtx.Provider value={{ savedVideos, hotReel }}>
      { props.children }
    </AppCtx.Provider>
  )
}

export default AppContext