import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { 
  grabDB, 
  Video,
  fetchInfo,
  inDevelopment,
  getStorageInfo
} from '../utility'
import { TransitionState, ContextTypes, NotifState, DownloadState } from './typeDefs'


export const AppCtx = React.createContext<ContextTypes | undefined>(undefined)

const AppContext = (props) => {
  
  const [savedVideos, setSavedVids] = useState<Video[]>([])
  const [hotReel, setHotReel] = useState<Video[]>([])
  const [watchLater, setWatchLater] = useState<Video[]>([])
  const [transitionComp, setTransitionComp] = useState<TransitionState>({}) 
  const [nextPage, setNextPage] = useState<string|undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotifState|undefined>()
  const [downloading, setDownloading] = useState<DownloadState|undefined>()
  const [storageUsed, setStorageUsed] = useState<number|undefined>()

  useEffect(() => {
    fetchInfo()
      .then(({ fullVidInfo, nextPageToken }) => {
        setHotReel(fullVidInfo)
        setNextPage(nextPageToken)
      })
      .catch(error => console.log('error from fetch info =>', error ))

    grabDB('savedVideos')
      .then(setSavedVids)
      .catch(error => console.log(error)) 

    grabDB('watchLater')
      .then(setWatchLater)  
      .catch(error => console.log(error))

    getStorageInfo(navigator)
      .then(setStorageUsed)
      .catch(error => console.log('error from setting storage =>', error ))

  }, [])

  let history = useHistory()

  const handleRouteChange = ({ animationName }:{ animationName:string }) => {
    if(animationName === 'fadeOut'){
      const { fromComp, toComp, data } = transitionComp
      history.push({
        pathname: toComp,
        state: { fromComp, data }
      })
      setTransitionComp({})
    }
  }

  const handleNextPage = () => {

    if(inDevelopment){
      setHotReel(prevState => [...prevState, ...prevState.slice(0,5)])
      return
    }

    if(!nextPage) return 

    setLoading(true)

    fetchInfo(nextPage)
      .then(({ fullVidInfo, nextPageToken }) => {
        setHotReel(prevState => [...prevState,...fullVidInfo])
        setNextPage(nextPageToken)
        setLoading(false)
      })
      .catch(error => {
        console.log('error from handleNextPage =>', error )
        setLoading(false)
      })

  }

  return(
    <AppCtx.Provider 
      value={{ 
        savedVideos, setSavedVids,
        hotReel, setHotReel, 
        watchLater, setWatchLater,
        transitionComp, setTransitionComp,
        handleNextPage, nextPage,
        handleRouteChange, loading,
        notification, setNotification,
        downloading, setDownloading,
        storageUsed
      }}
    >
      { props.children }
    </AppCtx.Provider>
  )
}

export default AppContext