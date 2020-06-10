import React, { useContext, useEffect } from 'react'
import './hotReel.scss'
import { AppCtx } from './AppContext'
import { 
  formatDuration, 
  formatViewCount, 
  formatPublishDate, 
  filOwnerPic,
  filThumbPic 
} from './utility'


const HotReel = () => {

  const { hotReel = [], setHotReel } = useContext(AppCtx)
  
  useEffect(() => {

    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setHotReel(prevState => [...prevState,...prevState.slice(0,2)])
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
    
  }, [setHotReel])


  return (
    <div className='wrapper'>

      { hotReel.length && hotReel.map( video => {
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
              <div className='videoDetails'>
                <p id='title'>{video.snippet.title}</p>
                <p id='chanTitle'>
                  {video.snippet.channelTitle}
                  <span>{viewCount} Views</span>
                  <span id='pubTime'>- {publishTime}</span>
                </p>
              </div>  
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HotReel