import React, { useState } from 'react'
import './videoCard.scss'
import logo from '../../logo.svg'
import { 
  formatDuration, 
  formatViewCount, 
  formatPublishDate, 
  filOwnerPic,
  filThumbPic 
} from './utility'


const VideoCard = ({ video, setWatchLater, ...props }) => {

  const [isActive, setIsActive] = useState(false)

  let { channelThumbs, snippet: { thumbnails, publishedAt }} = video

  let thumbnailPic = filThumbPic(thumbnails)
  let channelOwnerPic = filOwnerPic(channelThumbs) 
  let vidTime = formatDuration(video.contentDetails.duration)
  let viewCount = formatViewCount(video.statistics.viewCount) 
  let publishTime = formatPublishDate(publishedAt)

  const saveForLater = () => {
    setWatchLater(prevState => {
      if(prevState.find(item => item.id === video.id)){
        return prevState
      }
      return [...prevState, video]
    })
  }

  const removeVid = () => {
    setWatchLater(prevState => prevState.filter(vid => vid.id !== video.id))
  }

  return(
    <div key={video.id} className='cardWrapper'>
      <div className='picCont'>
        <img src={thumbnailPic.url} alt='video thumbnail pic' />
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