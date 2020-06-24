import React, { useState, useEffect } from 'react'
// import { fetchInfo ,channelOwnerInfo } from './utility'
import { 
  grabDbItems, 
  grabWlItems, 
  multiVidInfo, 
  distillVidInfo, 
  Video,
  Row 
} from './utility'
import { popularList } from './mock_data'

export const AppCtx = React.createContext()


const AppContext = (props) => {
  
  const [savedVideos, setSavedVids] = useState([])
  const [hotReel, setHotReel] = useState<Video[]>([...distillVidInfo(popularList)])
  const [watchLater, setWatchLater] = useState<Video[]>([])
  // const [nextPage, setNextPage] = useState('')

  // useEffect(() => {
  //   fetchInfo()
  //     .then(({ nextPageToken, items }) => {
  //       setNextPage(nextPageToken)
  //       return channelOwnerInfo(items)
  //     })
  //     .then(res => setHotReel(res))
  //     .catch(error => console.log('error from setting channelOwnerInfo =>', error ))
  // }, [hotReel])

  useEffect(() => {
    grabDbItems()
      .then(res => setSavedVids(res.rows))
      .catch(error => console.log('error from call to grabDbItems =>', error ))

    grabWlItems()
      .then(setWatchLater)  
      .catch(error => console.log('error from grabWlItems =>', error ))
  }, [])

  const updateWatchLater = (info: Row) => {
    multiVidInfo([info])
      .then(data => setWatchLater((prevState: Video[]) => [...prevState, ...data]))
      .catch(error => console.log('error updating watch later =>', error ))
  }

  return(
    <AppCtx.Provider 
      value={{ 
        savedVideos, hotReel, 
        setHotReel, watchLater, 
        setWatchLater, updateWatchLater 
      }}
    >
      { props.children }
    </AppCtx.Provider>
  )
}

export default AppContext