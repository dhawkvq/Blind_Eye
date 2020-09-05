import React, { useContext, useEffect } from 'react'
import './pageStyles.scss'
import { AppCtx } from '../context'
import { VideoCard } from '../components'


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

    let showContent = loading || contentEnded

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
          showContent && 
          <div style={{ border: '1px dashed yellow', height: 400, width: '70%', textAlign: "center"}}>
            <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{ loading ? 'Loading' : 'NO MORE!'}</p>
          </div>
        } 
      </div>
    )
  }
}

export default HotReel