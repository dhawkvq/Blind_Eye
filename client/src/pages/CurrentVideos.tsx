import React, { useContext } from 'react'
import './hotReel.scss'
import { AppCtx } from '../AppContext'
import { VideoCard } from '../components'
import { Video } from '../utility'


const CurrentVideos = () => {

  const appCtx = useContext(AppCtx)

  if(appCtx){

    const { savedVideos = [], setSavedVids, setWatchLater } = appCtx
    
    return (
      <div className='wrapper'>
        { savedVideos.length > 0 && savedVideos.map((video:Video) => (
            <VideoCard 
              key={video.id} 
              {...{video, setSavedVids, setWatchLater}}
              savedVideos
            />
          ))
        }
      </div>
    )
  }

}

export default CurrentVideos