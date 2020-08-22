import React, { useRef, useState, useEffect } from 'react'
import './videoPlayer.scss'
import { grabVidById } from '../../utility'


const VideoPlayer = ({ match }) => {

  const [videoUrl, setVideoUrl] = useState(null)
  const [videoInfo, setVideoInfo] = useState(null)
  const [vidError, setVidError] = useState(null)
  const vidRef = useRef(null);


  useEffect(() => {
    const { id } = match.params
    if(!id){ console.log('no id was supplied to videoPlayer!')}
    grabVidById(id)
      .then(video => {
        setVideoInfo(video)
        setVideoUrl(window.URL.createObjectURL(video['vidData']))
      })
      .catch(error => setVidError(error.message))
  }, [match.params])

  return (
    <div className='container'>
      { videoUrl &&
        <video ref={vidRef} 
          autoPlay
          controls 
          controlsList='nodownload' 
          disablePictureInPicture
        >
          <source src={videoUrl}/>
        </video>
      }
    </div>
  )
}

export default VideoPlayer