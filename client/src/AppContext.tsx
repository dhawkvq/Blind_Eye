import React, { useState, useEffect } from 'react'
// import { fetchInfo ,channelOwnerInfo } from './utility'
import { grabDbItems } from './utility'
import { popularList } from './mock_data'

export const AppCtx = React.createContext()


const AppContext = (props) => {
  
  const [savedVideos, setSavedVids] = useState([])
  const [hotReel, setHotReel] = useState([...popularList])
  const [watchLater, setWatchLater] = useState([])
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
  }, [])

  return(
    <AppCtx.Provider value={{ savedVideos, hotReel, setHotReel, watchLater, setWatchLater }}>
      { props.children }
    </AppCtx.Provider>
  )
}

export default AppContext