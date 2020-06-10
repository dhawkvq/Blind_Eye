import React, { useContext } from 'react'
import './hotReel.scss'
import { AppCtx } from './AppContext'
import { formatDuration, formatViewCount, formatPublishDate } from './utility'

const HotReel = () => {

  const { hotReel } = useContext(AppCtx)

  return (
    <div className='wrapper'>

      { hotReel.length && hotReel.map( video => {
        let { channelThumbs, snippet: { thumbnails, publishedAt }} = video
        let thumbnailPic = thumbnails.maxres ? thumbnails.maxres: 
                          thumbnails.high ? thumbnails.high : 
                          thumbnails.standard ? thumbnails.standard :
                          thumbnails.default

        let channelOwnerPic = channelThumbs.high ? channelThumbs.high :
                              channelThumbs.medium ? channelThumbs.medium :
                              channelThumbs.default 

        let vidTime = formatDuration(video.duration)
        let viewCount = formatViewCount(video.statistics.viewCount)
        let publishTime = formatPublishDate(publishedAt)

        return(
          <div key={video.id} className='cardWrapper'>
            <div className='picCont'>
              <img src={thumbnailPic.url} alt='thumbnail pic' />
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