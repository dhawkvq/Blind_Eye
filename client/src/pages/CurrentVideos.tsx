import React, { useContext } from 'react'
import './hotReel.scss'
import { AppCtx } from '../AppContext'
import { VideoCard } from '../components'
import { Video } from '../utility'
import { NoVideoNotif } from './components'


const CurrentVideos = ({ history }) => {

  const appCtx = useContext(AppCtx)

  if(appCtx){

    const { 
      savedVideos = [], 
      setSavedVids, 
      setWatchLater,
      transitionComp: { fromComp, toComp },
      setTransitionComp  
    } = appCtx

    const handleTransition = ({ animationName }) => {
      if(animationName === 'fadeOut'){
        history.push({
          pathname: toComp,
          state: { fromComp }
        })
        setTransitionComp({})
      }
    }

    let wrapperClass = 
      fromComp === '/my-vids' ? 'wrapper transition' : 
        savedVideos.length > 1 ? 'wrapper full':
        'wrapper'
    
    return (
      <div className={wrapperClass} onAnimationEnd={handleTransition}>
        { savedVideos.length > 0 ? savedVideos.map((video:Video) => (
            <VideoCard 
              key={video.id} 
              {...{video, setSavedVids, setWatchLater}}
              savedVideos
            />
          ))
          :
          <NoVideoNotif message='You currently have no saved videos'/>
        }
      </div>
    )
  }

}

export default CurrentVideos