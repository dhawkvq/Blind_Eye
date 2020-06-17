import React, { useState, useEffect } from 'react'
import './videoCard.scss'
import logo from '../../logo.svg'
import { storeInDB, formatVideo } from './utility'



const VideoCard = ({ video, setWatchLater, ...props }) => {

  const [isActive, setIsActive] = useState(false)
  const [videoAdded, setVideoAdded] = useState('')
  const [vidError, setVidError] = useState('')

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
      channelId: video.snippet.channelId
    })
    .then(() => setVideoAdded('Video Added!'))
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

  const { thumbnailPic, channelOwnerPic, vidTime, viewCount, publishTime } = formatVideo(video)
                    
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
            <p id='title'>{video.snippet.title}</p> 
            <p id='chanTitle' >
              {video.snippet.channelTitle}
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
              { props.watchLater ?
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