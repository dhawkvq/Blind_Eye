import React, { useContext } from 'react'
import './hotReel.scss'
import { AppCtx } from '../AppContext'
import { VideoCard } from '../components'
import { Video } from '../utility'
import { NoVideoNotif } from './components'

const WatchLater = ({ history }) => {

  const appCtx = useContext(AppCtx)

  if(appCtx){

    const { 
      watchLater = [], 
      setWatchLater, 
      transitionComp: { fromComp, toComp },
      setTransitionComp  
    } = appCtx

    const handleTransition = ({ animationName }) => {
      if(animationName === 'fadeOut'){
        history.push(toComp)
        setTransitionComp({})
      }
    }

    let wrapperClass = fromComp === '/watch-later' ? 'wrapper--transition': 'wrapper'
    
    return (
      <div className={wrapperClass} onAnimationEnd={handleTransition}>
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