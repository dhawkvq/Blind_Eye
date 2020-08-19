import React, { useContext } from 'react'
import './hotReel.scss'
import { AppCtx } from '../AppContext'
import { VideoCard } from '../components'
import { Video } from '../utility'

const WatchLater = () => {

  const { 
    watchLater = [], 
    setWatchLater, 
  } = useContext(AppCtx)

  return (
    <div className='wrapper'>
      { watchLater.length ? 
        watchLater.map((video: Video) => 
          <VideoCard 
            key={video.id} 
            {...{video, setWatchLater}} 
            watchLater 
          />
        )
        :
        <h1>No Videos to watch later</h1>
      }
    </div>
  )
}

export default WatchLater