import React, { useState, useEffect } from 'react'
import './videoCard.scss'
import logo from '../../logo.svg'
import { storeInDB, deleteFromDB, downloadVid } from './utility'
import { VidCardProps } from './typeDefs'
import { Video, formatDuration, formatViewCount, formatPublishDate } from '../../utility'
import { useComponentVisible } from '../../hooks'


const VideoCard = ({ video, setWatchLater, watchLater, setSavedVids }: VidCardProps ) => {

  const [videoAdded, setVideoAdded] = useState<string>('')
  const [vidError, setVidError] = useState<string>('')
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

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
    storeInDB(video)
    .then(data => {
      setVideoAdded('Video Added!')
      setWatchLater((prevState: Video[]) => [...prevState,data])
    })
    .catch(error => setVidError(error.message))

    setIsComponentVisible(false) 
  } 

  const handleDownload = () => {
    downloadVid(video)
      .then(savedVid => {
        if(setSavedVids){
          setSavedVids((prevState: Video[]) => [savedVid, ...prevState])
        }
      })
      .catch(error => console.log('error from handleDownload =>', error ))
  }

  const removeVid = () => {
    deleteFromDB(video.id)
      .then(() => 
        setWatchLater((prevState: Video[]) => 
          prevState.filter(({ id }) => id !== video.id ))
      )
      .catch(error => console.log('the error from deleteFromDB =>', error ))
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
        <p>{formatDuration(vidTime)}</p>
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
              <span>{formatViewCount(viewCount)} Views</span>
              <span id='pubTime'>- {formatPublishDate(publishTime)}</span> 
            </p>
          </div>
          <div ref={ref} className='toolTip'>
            <p id='tooltipText'>Menu</p>
            <img 
              src={logo} 
              alt='action button'  
              onClick={() => setIsComponentVisible(!isComponentVisible)}
              className={isComponentVisible ? 'iconButtonActive': 'iconButton'}
            />
            { isComponentVisible && 
              <ul className='menu'>
                { watchLater ?
                    <li onClick={removeVid}>Remove from watch later</li>
                  :
                    <li onClick={saveForLater}>Watch Later</li>
                }
                <li onClick={handleDownload}>Download</li>
            </ul>
            }
          </div>
        </div>  
      </div>
    </div>
  )
}

export default VideoCard