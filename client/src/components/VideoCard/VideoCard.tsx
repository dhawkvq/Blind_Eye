import React, { useState, useEffect } from 'react'
import './videoCard.scss'
import { storeInDB, deleteFromDB, downloadVid } from './utility'
import { VidCardProps } from './typeDefs'
import { formatDuration, formatViewCount, formatPublishDate } from '../../utility'
import { useComponentVisible } from '../../hooks'
import { PlayButton, logo } from './components'


const VideoCard = ({ video, setWatchLater, watchLater, setSavedVids, savedVideos, handleTransition }: VidCardProps ) => {

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
      setWatchLater(prevState => [...prevState,data])
    })
    .catch(error => setVidError(error.message))

    setIsComponentVisible(false) 
  } 

  const handleDownload = () => {

    setIsComponentVisible(false)

    downloadVid(video)
      .then(savedVid => {
        if(setSavedVids){
          setSavedVids(prevState => [savedVid, ...prevState])
        }
      })
      .catch(error => console.log('error from handleDownload =>', error ))
  }

  const removeVid = () => {

    const removalObj = {
      database: watchLater ? 'watchLater' : 'savedVids',
      id: video.id
    }

    deleteFromDB(removalObj)
      .then(() => {
        if(savedVideos && setSavedVids){
          setSavedVids(prevState => 
            prevState.filter(({ id }) => id !== video.id ))
        } else {
          setWatchLater(prevState => 
            prevState.filter(({ id }) => id !== video.id ))
        }

      })
      .catch(error => console.log('the error from deleteFromDB =>', error ))
  }

  const handleClick = () => {
    if(handleTransition){
      handleTransition(`/watch-video/${video.id}`)
    } else {
      console.log('there is no handle transition')
    }
  }

  let notifStyles = videoAdded ? 'notification--active': 
                    vidError ? 'notification--error' :
                    'notification'

  const { title, channelTitle, thumbnailPic, channelOwnerPic, vidTime, viewCount, publishTime } = video

  return(
    <div key={video.id} className='cardWrapper'>
      <div className='picCont' onClick={handleClick}>
        <div className='playCover'>
          <PlayButton />  
        </div>
        <span className={notifStyles}>{vidError||videoAdded}</span>
        <img src={thumbnailPic.url} alt='video thumbnail pic' />
        <p>{formatDuration(vidTime)}</p>
      </div>
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
                { watchLater || savedVideos ?
                    <p onClick={removeVid}>Remove</p>
                    :
                    <p onClick={saveForLater}>Watch Later</p>
                }
                {
                  !savedVideos &&
                  <p onClick={handleDownload}>Download</p>
                }
            </div>
            }
          </div>
        </div>  
      </div>
    </div>
  )
}

export default VideoCard