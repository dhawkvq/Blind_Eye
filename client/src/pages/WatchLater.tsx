import React, { useContext } from 'react'
import { AppCtx } from '../AppContext'
import { VideoCard } from '../components'

const WatchLater = () => {

  const { watchLater = [], setWatchLater } = useContext(AppCtx)

  return (
    <div style={{ border: '1px dashed white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      { watchLater.length ? watchLater.map(video => <VideoCard key={video.id} {...{video, setWatchLater}} watchLater />)
        :
        <h1>No Videos to watch later</h1>
      } 
    </div>
  )
}

export default WatchLater