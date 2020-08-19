import React, { useState, useEffect } from 'react'
import { 
  grabDB, 
  distillVidInfo, 
  Video,
} from './utility'
import { popularList } from './mock_data'

export const AppCtx = React.createContext()


const AppContext = (props) => {
  
  const [savedVideos, setSavedVids] = useState<Video[]>([])
  const [hotReel, setHotReel] = useState<Video[]>([...distillVidInfo(popularList)])
  const [watchLater, setWatchLater] = useState<Video[]>([])

  useEffect(() => {
    grabDB('savedVideos')
      .then(setSavedVids)
      .catch(error => console.log(error))

    grabDB('watchLater')
      .then(setWatchLater)  
      .catch(error => console.log(error))
  }, [])


  return(
    <AppCtx.Provider 
      value={{ 
        savedVideos, setSavedVids,
        hotReel, setHotReel, 
        watchLater, setWatchLater
      }}
    >
      { props.children }
    </AppCtx.Provider>
  )
}

export default AppContext