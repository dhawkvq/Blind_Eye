import React, { useState, useEffect } from 'react'
import { 
  grabDB, 
  Video,
  fetchInfo
} from './utility'


type ContextTypes = {
  savedVideos: Video[];
  hotReel: Video[];
  watchLater: Video[];
  setSavedVids: React.Dispatch<React.SetStateAction<Video[]>>;
  setHotReel: React.Dispatch<React.SetStateAction<Video[]>>;
  setWatchLater: React.Dispatch<React.SetStateAction<Video[]>>;
}

export const AppCtx = React.createContext<ContextTypes | undefined>(undefined)


const AppContext = (props) => {
  
  const [savedVideos, setSavedVids] = useState<Video[]>([])
  const [hotReel, setHotReel] = useState<Video[]>([])
  const [watchLater, setWatchLater] = useState<Video[]>([])

  useEffect(() => {
    fetchInfo()
      .then(setHotReel)
      .catch(error => console.log('error from fetch info =>', error ))

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