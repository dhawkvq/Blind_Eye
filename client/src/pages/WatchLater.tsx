import React, { useContext } from 'react'
import './pageStyles.scss'
import { AppCtx } from '../context'
import { VideoCard, NoVideoNotif } from '../components'
import { Video } from '../utility'


const WatchLater = ({ history }) => {

  const appCtx = useContext(AppCtx)

  if(appCtx){

    const { 
      watchLater = [], 
      setWatchLater, 
      transitionComp: { fromComp, toComp },
      setTransitionComp,
      handleTransition  
    } = appCtx

    const handleAnimation = ({ animationName }) => {
      if(animationName === 'fadeOut'){
        history.push({
          pathname: toComp,
          state: { fromComp }
        })
        setTransitionComp({})
      } 
    }

    let wrapperClass = 
      fromComp === '/watch-later' ? 'wrapper transition' : 
          watchLater.length > 1 ? 'wrapper full':
          'wrapper'
    
          
    return (
      <div className={wrapperClass} onAnimationEnd={handleAnimation}>
        { watchLater.length ? 
          watchLater.map((video: Video) => 
            <VideoCard 
              key={video.id} 
              {...{ video, setWatchLater, handleTransition }} 
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