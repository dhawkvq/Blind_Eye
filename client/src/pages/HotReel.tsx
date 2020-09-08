import React, { useContext, useEffect } from 'react'
import './pageStyles.scss'
import { AppCtx } from '../context'
import { VideoCard, NoVideoNotif } from '../components'


const HotReel = () => {

  const appCtx = useContext(AppCtx)

  useEffect(() => {
    if(appCtx){
      
      const { handleNextPage } = appCtx

      const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          handleNextPage()
        }
      }
  
      window.addEventListener('scroll', handleScroll)
      
      return () => window.removeEventListener('scroll', handleScroll)
    }
    
  }, [appCtx])

  if(appCtx){

    const { 
      hotReel = [], 
      transitionComp: { fromComp }, 
      handleRouteChange,
      contentEnded,
      loading
    } = appCtx

    let wrapperClass = 
      fromComp === '/' && hotReel.length > 1 ? 'wrapper transitionFull' : 
      fromComp === '/' ? 'wrapper tansition':
      hotReel.length > 1 ? 'wrapper full':
      'wrapper'

    let notify = loading || contentEnded

    return (
      <div className={wrapperClass} onAnimationEnd={handleRouteChange}>
        { hotReel.length > 0 && 
            hotReel.map(video => 
              <VideoCard 
                key={video.id} 
                ctx={appCtx}
                video={video}
              /> 
            )
        }
        {
          notify && 
          <div className='notifCont'>
            {
              loading ?
              <p>Loading......</p>
              :
              <NoVideoNotif message='The End' />
            }
          </div>
        } 
      </div>
    )
  }
}

export default HotReel