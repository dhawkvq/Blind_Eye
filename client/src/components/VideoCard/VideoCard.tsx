import React, { useState, useEffect } from 'react'
import './videoCard.scss'
import logo from '../../logo.svg'
import { storeInDB } from './utility'
import { VidCardProps } from './typeDefs'


const VideoCard = ({ video, setWatchLater, updateWatchLater, watchLater }: VidCardProps ) => {

  const [isActive, setIsActive] = useState<boolean>(false)
  const [videoAdded, setVideoAdded] = useState<string>('')
  const [vidError, setVidError] = useState<string>('')

  useEffect(() => {
    if(videoAdded){
      const vidAddTimer = setTimeout(() => setVideoAdded(''), 1500);
      return () => clearTimeout(vidAddTimer)
    }
    if(vidError){
      const vidErrTimer = setTimeout(() => setVidError(''), 1500);
      return () => clearTimeout(vidErrTimer)
    }
  }, [videoAdded, vidError])


  const saveForLater = () => { 

    storeInDB({ 
      videoId: video.id, 
      channelId: video.channelId
    })
    .then(data => {
      setVideoAdded('Video Added!')
      updateWatchLater(data)
    })
    .catch(error => setVidError(error.message))

    setIsActive(false) 
  }

  const removeVid = () => {
    setWatchLater(prevState => prevState.filter(vid => vid.id !== video.id))
    setIsActive(false)
  }

  let notifStyles = videoAdded ? 'notification--active': 
                    vidError ? 'notification--error' :
                    'notification'

  const { title, channelTitle, thumbnailPic, channelOwnerPic, vidTime, viewCount, publishTime } = video
                    
  return(
    <div key={video.id} className='cardWrapper'>
      <div className='picCont'>
        <img src={thumbnailPic.url} alt='video thumbnail pic' />
        <span className={notifStyles}>{vidError||videoAdded}</span>
        <p>{vidTime}</p>
      </div>
      <div className='detailBar'>
        <div className='picHousing'>
          <img src={channelOwnerPic.url}  alt='channel owner thumbnail pic'/>
        </div>
        <div className='videoDetails' >
          <div style={{ width:'90%'}}>
            <p id='title'>{title}</p> 
            <p id='chanTitle' >
              {channelTitle}
              <span>{viewCount} Views</span>
              <span id='pubTime'>- {publishTime}</span> 
            </p>
          </div>
          <div className={ isActive ? 'toolTipActive': 'toolTip'}>
            <p id='tooltipText'>Menu</p>
            <img 
              src={logo} 
              alt='action button'  
              onClick={() => setIsActive(!isActive)}
              className={isActive ? 'iconButtonActive': 'iconButton'}
            />
            <ul className='menu'>
              { watchLater ?
                  <li onClick={removeVid}>Remove from watch later</li>
                :
                  <li onClick={saveForLater}>Watch Later</li>
              }
              <li>Download</li>
            </ul>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default VideoCard