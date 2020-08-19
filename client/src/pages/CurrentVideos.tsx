import React, { useContext } from 'react'
import './hotReel.scss'
import { AppCtx } from '../AppContext'
import { VideoCard } from '../components'
import { Video } from '../utility'


const CurrentVideos = () => {

  const { 
    savedVideos = [],
    setSavedVids,
    setWatchLater
  } = useContext(AppCtx)

  return (
    <div className='wrapper'>
      { savedVideos.length > 0 && savedVideos.map((video:Video) => (
          <VideoCard 
            key={video.id} 
            {...{video, setSavedVids, setWatchLater}}
          />
        ))
      }
    </div>
  )
}

export default CurrentVideos