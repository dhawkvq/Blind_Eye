import React, { useContext, useEffect } from 'react'
import './hotReel.scss'
import { AppCtx } from '../AppContext'
import { VideoCard } from '../components'


const HotReel = () => {

  const { 
    hotReel = [], 
    setHotReel, 
    setWatchLater, 
    updateWatchLater 
  } = useContext(AppCtx)

  
  useEffect(() => {

    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setHotReel(prevState => [...prevState,...prevState.slice(0,5)])
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
    
  }, [setHotReel])


  return (
    <div className='wrapper'>
      { hotReel.length > 0 && 
          hotReel.map(video => 
            <VideoCard 
              key={video.id} 
              {...{video, setWatchLater, updateWatchLater}}
            /> 
          )
      } 
    </div>
  )
}

export default HotReel