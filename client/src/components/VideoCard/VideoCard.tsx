import React from 'react'
import './videoCard.scss'
import { PlayButton } from './components'
import VideoInfo from './VideoInfo'
import { formatDuration, Video } from '../../utility'
import { ContextTypes } from '../../context/typeDefs'
import { useLocation } from 'react-router-dom'
import NotificationBar from '../NotificationBar/NotificationBar'
import ProgressBar from './components/ProgressBar'


type VidCardProps = {
  ctx: ContextTypes;
  video: Video;
  watchLaterFlag?:boolean;
  savedVideosFlag?:boolean;
}


const VideoCard = ({ video, ctx, watchLaterFlag, savedVideosFlag }: VidCardProps ) => {
  
  let location = useLocation()

  const handleClick = () => ctx.setTransitionComp({
    fromComp: location.pathname,
    toComp: `/watch-video/${video.id}`,
    data: video
  })

  let showMessage = ctx.notification && ctx.notification.id === video.id
  let message = ctx.notification && ctx.notification.message
  let showDownloadProgress = ctx.downloading?.videoId === video.id

  return(
    <div key={video.id} className='cardWrapper'> 
      { showDownloadProgress &&
        <ProgressBar progPercent={ctx.downloading?.downloadPercent}/>
      }
      {
        showMessage && 
        <NotificationBar 
          message={message} 
          clearNotification={() => ctx.setNotification(undefined)}
        />
      }
      <div 
        className='picCont' 
        onClick={handleClick}
      >
        <div className='playCover'>
          <PlayButton />  
        </div>
        <img src={video.thumbnailPic.url} alt='video thumbnail pic' />
        <p>{formatDuration(video.vidTime)}</p>
      </div>
      <VideoInfo 
        {...{ctx,video,watchLaterFlag,savedVideosFlag}}
      />
    </div>
  )
}

export default VideoCard