import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  grabDB, 
  Video,
  fetchInfo
} from './utility'

type TransitionState = {
  fromComp?:string;
  toComp?:string;
}

type ContextTypes = {
  savedVideos: Video[];
  hotReel: Video[];
  watchLater: Video[];
  transitionComp: TransitionState;
  setTransitionComp: React.Dispatch<React.SetStateAction<TransitionState>>;
  handleTransition: (path:string) => void;
  setSavedVids: React.Dispatch<React.SetStateAction<Video[]>>;
  setHotReel: React.Dispatch<React.SetStateAction<Video[]>>;
  setWatchLater: React.Dispatch<React.SetStateAction<Video[]>>;
  handleNextPage: () => void;
  contentEnded: boolean;
  loading: boolean;
}

export const AppCtx = React.createContext<ContextTypes | undefined>(undefined)


const AppContext = (props) => {

  
  const [savedVideos, setSavedVids] = useState<Video[]>([])
  const [hotReel, setHotReel] = useState<Video[]>([])
  const [watchLater, setWatchLater] = useState<Video[]>([])
  const [transitionComp, setTransitionComp] = useState<TransitionState>({})
  const [nextPage, setNextPage] = useState<string|undefined>()
  const [contentEnded, setContentEnded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

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

  let location = useLocation()

  const handleTransition = (path:string) => {
    setTransitionComp({
      fromComp: location.pathname,
      toComp: path
    })
  }

  const handleNextPage = () => {

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
        handleTransition, handleNextPage,
        contentEnded, loading
      }}
    >
      { props.children }
    </AppCtx.Provider>
  )
}

export default AppContext