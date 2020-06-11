import React from 'react'
import './videoCard.scss'
import logo from '../../logo.svg'
import { 
  formatDuration, 
  formatViewCount, 
  formatPublishDate, 
  filOwnerPic,
  filThumbPic 
} from './utility'

const VideoCard = ({ video }) => {

  let { channelThumbs, snippet: { thumbnails, publishedAt }} = video

  let thumbnailPic = filThumbPic(thumbnails)
  let channelOwnerPic = filOwnerPic(channelThumbs) 
  let vidTime = formatDuration(video.contentDetails.duration)
  let viewCount = formatViewCount(video.statistics.viewCount) 
  let publishTime = formatPublishDate(publishedAt)

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
          <div className='toolTip'>
            <p>Tooltip Text</p>
            <img 
              src={logo} 
              alt='action button'  
              onClick={() => console.log('the pic has been clicked')}
              className='iconButton'
            />
          </div>
        </div>  
      </div>
    </div>
  )
}

export default VideoCard