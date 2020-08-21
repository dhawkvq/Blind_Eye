import React, { useRef, useState, useEffect } from 'react'
import './videoPlayer.scss'
import { PlayButton, PauseButton } from './components'
import { grabVidById } from '../../utility'

const VideoPlayer = ({ match }) => {


  const [videoUrl, setVideoUrl] = useState(null)
  const [videoInfo, setVideoInfo] = useState(null)
  const [vidPlaying, setVidPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
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

  
  useEffect(() => {
    if(vidRef.current && videoUrl){
      setVidPlaying((playState: boolean) => !playState)
      vidRef.current.play()     
    }
  }, [vidRef,videoUrl,setVidPlaying])

  const handlePlay = () => {
    vidRef.current.play()
    setVidPlaying(true)
  }

  const handlePause = () => {
    vidRef.current.pause()
    setVidPlaying(false)
  }


  return (
    <div className='container'>
      <div 
        className='vidWrapper' 
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        { videoUrl &&
        <>
          {
            showControls &&
            <div style={{ border: '1px dashed white' }}
              className='controls'
            > 
              {
                vidPlaying ?
                <PauseButton handleClick={handlePause} />
                :
                <PlayButton handleClick={handlePlay}/>
              }
            </div>
          }
          <video ref={vidRef}>
            <source src={videoUrl}/>
          </video>
        </>
        }
      </div>
    </div>
  )
}

export default VideoPlayer