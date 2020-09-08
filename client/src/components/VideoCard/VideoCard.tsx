import React from 'react'
import './videoCard.scss'
import { PlayButton } from './components'
import VideoInfo from './VideoInfo'
import { formatDuration, Video } from '../../utility'
import { ContextTypes } from '../../context/typeDefs'

type VidCardProps = {
  ctx: ContextTypes;
  video: Video;
  watchLaterFlag?:boolean;
  savedVideosFlag?:boolean;
}


const VideoCard = ({ video, ctx, watchLaterFlag, savedVideosFlag }: VidCardProps ) => (
  <div key={video.id} className='cardWrapper'>
    <div 
      className='picCont' 
      onClick={() => ctx.handleTransition(`/watch-video/${video.id}`, video)}
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

export default VideoCard