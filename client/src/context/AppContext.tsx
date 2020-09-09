import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { 
  grabDB, 
  Video,
  fetchInfo,
  inDevelopment
} from '../utility'
import{ TransitionState, ContextTypes, NotifState } from './typeDefs'


export const AppCtx = React.createContext<ContextTypes | undefined>(undefined)

const AppContext = (props) => {
  
  const [savedVideos, setSavedVids] = useState<Video[]>([])
  const [hotReel, setHotReel] = useState<Video[]>([])
  const [watchLater, setWatchLater] = useState<Video[]>([])
  const [transitionComp, setTransitionComp] = useState<TransitionState>({}) 
  const [nextPage, setNextPage] = useState<string|undefined>()
  const [contentEnded, setContentEnded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotifState|undefined>()

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

    if(contentEnded || !nextPage) return 

    setLoading(true)

    fetchInfo(nextPage)
      .then(({ fullVidInfo, nextPageToken }) => {
        setHotReel(prevState => [...prevState,...fullVidInfo])
        setNextPage(nextPageToken)
        setContentEnded(true)
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
        handleNextPage, handleRouteChange,
        contentEnded, loading,
        notification, setNotification
      }}
    >
      { props.children }
    </AppCtx.Provider>
  )
}

export default AppContext