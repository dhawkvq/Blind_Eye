import React, { useContext, useEffect } from 'react'
import './pageStyles.scss'
import { AppCtx } from '../context'
import { VideoCard, NoVideoNotif } from '../components'


const HotReel = ({ history }) => {

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
      setWatchLater, 
      setSavedVids,
      transitionComp: { fromComp, toComp }, 
      setTransitionComp,
      handleTransition,
      contentEnded,
      loading
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
      fromComp === '/' ? 'wrapper transition' : 
      hotReel.length > 1 ? 'wrapper full':
      'wrapper'

    let notify = loading || contentEnded

    return (
      <div className={wrapperClass} onAnimationEnd={handleAnimation}>
        { hotReel.length > 0 && 
            hotReel.map(video => 
              <VideoCard 
                key={video.id} 
                {...{ video, setWatchLater, setSavedVids, handleTransition }}
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