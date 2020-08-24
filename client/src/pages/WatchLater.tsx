import React, { useContext } from 'react'
import './hotReel.scss'
import { AppCtx } from '../AppContext'
import { VideoCard } from '../components'
import { Video } from '../utility'
import { NoVideoNotif } from './components'

const WatchLater = () => {

  const appCtx = useContext(AppCtx)

  if(appCtx){

    const { watchLater = [], setWatchLater } = appCtx
    
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
          <NoVideoNotif 
            message='You currently have no videos to watch later'
          />
        }
      </div>
    )

  }
}

export default WatchLater