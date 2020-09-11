import React from 'react'
import './videoInfo.scss'
import { formatViewCount, formatPublishDate, Video } from '../../utility'
import { storeInDB, deleteFromDB, downloadVid } from './utility'
import { useComponentVisible } from '../../hooks'
import { logo } from './components'
import { ContextTypes } from '../../context/typeDefs'



type InfoProps = {
  ctx: ContextTypes;
  video: Video;
  watchLaterFlag?: boolean;
  savedVideosFlag?: boolean;
}


const VideoInfo = ({ video, ctx, watchLaterFlag, savedVideosFlag }: InfoProps ) => {

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  const { setSavedVids, setWatchLater, setNotification, setDownloading } = ctx

  const saveForLater = () => { 
    storeInDB(video)
    .then(data => {
      setNotification({ 
        id: video.id, 
        message: 'Video added to watch later!'
      })
      setWatchLater(prevState => [...prevState,data])
    })
    .catch(error => console.log(error))

    setIsComponentVisible(false) 
  } 

  const removeVid = () => {

    const removalObj = {
      database: watchLaterFlag ? 'watchLater' : 'savedVids',
      id: video.id
    }

    deleteFromDB(removalObj)
      .then(() => {
        if(savedVideosFlag){
          setSavedVids(prevState => 
            prevState.filter(({ id }) => id !== video.id ))
        } else {
          setWatchLater(prevState => 
            prevState.filter(({ id }) => id !== video.id ))
        }

      })
      .catch(error => console.log('the error from deleteFromDB =>', error ))
  }

  const handleDownload = () => {

    setIsComponentVisible(false)

    setDownloading({ videoId: video.id })

    downloadVid(video, setDownloading)
      .then(savedVid => {
        setSavedVids(prevState => [savedVid, ...prevState])
        setDownloading(undefined)
      })
      .catch(error => {
        console.log('error from handleDownload =>', error )
        setDownloading(undefined)
      })
  }

  const { channelOwnerPic, title, channelTitle, viewCount, publishTime } = video
  
  return (
    <div className='detailBar'>
      <div className='picHousing'>
        <img src={channelOwnerPic.url}  alt='channel owner thumbnail pic'/>
      </div>
      <div className='videoDetails'> 
        <div style={{ width:'90%'}}>
          <p id='title'>{title}</p> 
          <p id='chanTitle' >
            {channelTitle}
            <span>{formatViewCount(viewCount)} Views</span>
            <span id='pubTime'>- {formatPublishDate(publishTime)}</span> 
          </p>
        </div>
        <div ref={ref} className='toolTip'>
          <p id='tooltipText' style={{ visibility: isComponentVisible ? 'hidden': undefined }}>Menu</p>
          <img 
            src={logo} 
            alt='action button'  
            onClick={() => setIsComponentVisible(!isComponentVisible)}
            className={isComponentVisible ? 'iconButton--active': 'iconButton'}
          />
          { isComponentVisible && 
            <div className='menu'>
              { watchLaterFlag || savedVideosFlag ?
                  <p onClick={removeVid}>Remove</p>
                  :
                  <p onClick={saveForLater}>Watch Later</p>
              }
              {
                !savedVideosFlag &&
                <p onClick={handleDownload}>Download</p>
              }
          </div>
          }
        </div>
      </div>  
    </div>
  )
}

export default VideoInfo