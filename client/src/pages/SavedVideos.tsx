import React, { useContext } from 'react'
import './pageStyles.scss'
import { AppCtx } from '../context'
import { VideoCard, NoVideoNotif, ProgressBar } from '../components'


const SavedVideos = () => {

  const appCtx = useContext(AppCtx)

  if(appCtx){

    const { 
      savedVideos, 
      transitionComp: { fromComp },
      handleRouteChange,
      storageUsed
    } = appCtx

    let wrapperClass = 
      fromComp === '/my-vids' && savedVideos.length > 1 ? 'wrapper transitionFull' : 
      fromComp === '/my-vids' ? 'wrapper transition' :
      savedVideos.length > 1 ? 'wrapper full' :
      'wrapper'
    
    return (
      <div className={wrapperClass} onAnimationEnd={handleRouteChange}>
        { savedVideos.length > 0 ?
          <>
            <div className='progWrapper'>
              <p id='heading'> Storage Details </p>
              <ProgressBar 
                progPercent={storageUsed} 
                message={`${storageUsed}% of storage used`}          
              /> 
            </div>
            {
              savedVideos.map(video => (
                <VideoCard 
                  key={video.id} 
                  ctx={appCtx}
                  video={video}
                  savedVideosFlag
                />
              ))
            }
          </>
          :
          <NoVideoNotif message='You currently have no saved videos'/>
        }
      </div>
    )
  }

}

export default SavedVideos