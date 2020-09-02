import React, { useContext, useEffect } from 'react'
import './hotReel.scss'
import { AppCtx } from '../AppContext'
import { VideoCard } from '../components'
import { Video } from '../utility'


const HotReel = ({ history }) => {

  const appCtx = useContext(AppCtx)

  useEffect(() => {
    if(appCtx){
      const {setHotReel} = appCtx

      const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          setHotReel(prevState => [...prevState,...prevState.slice(0,5)])
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
      fromComp === '/' ? 'wrapper transition' : 
      hotReel.length > 1 ? 'wrapper full':
      'wrapper'

    return (
      <div className={wrapperClass} onAnimationEnd={handleAnimation}>
        { hotReel.length > 0 && 
            hotReel.map((video: Video) => 
              <VideoCard 
                key={video.id} 
                {...{ video, setWatchLater, setSavedVids, handleTransition }}
              /> 
            )
        } 
      </div>
    )
  }
}

export default HotReel