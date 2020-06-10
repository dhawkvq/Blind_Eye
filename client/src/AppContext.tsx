import React, { useState } from 'react'
// import { fetchInfo ,channelOwnerInfo } from './utility'
import data from './mock.json'

export const AppCtx = React.createContext()


const AppContext = (props) => {
  
  const [savedVideos] = useState([])
  const [hotReel, setHotReel] = useState([...data])
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

  return(
    <AppCtx.Provider value={{ savedVideos, hotReel, setHotReel }}>
      { props.children }
    </AppCtx.Provider>
  )
}

export default AppContext