import React, { useContext } from 'react'
import './pageStyles.scss'
import { AppCtx } from '../context'
import { VideoCard, NoVideoNotif } from '../components'


const WatchLater = () => {

  const appCtx = useContext(AppCtx)

  if(appCtx){

    const { 
      watchLater = [], 
      transitionComp: { fromComp },
      handleRouteChange
    } = appCtx


    let wrapperClass = 
      fromComp === '/watch-later' && watchLater.length > 1 ? 'wrapper transitionFull' :
      fromComp === '/watch-later' ? 'wrapper transition' : 
      watchLater.length > 1 ? 'wrapper full' :
      'wrapper'
    
          
    return (
      <div className={wrapperClass} onAnimationEnd={handleRouteChange}>
        { watchLater.length ? 
          watchLater.map(video => 
            <VideoCard 
              key={video.id} 
              ctx={appCtx}
              video={video}
              watchLaterFlag 
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