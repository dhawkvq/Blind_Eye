import React, { useRef, useState, useEffect } from 'react'
import './videoPlayer.scss'
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
      .catch(error => console.log('error grabbing vid =>', error))
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
          <div style={{ position: "absolute", display: 'flex', border: '1px dashed white', bottom: '10%', left: '45%', color: 'white',
            padding: 10, justifyContent: 'space-around'
          }}
            className='controls'
          > 
            {
              vidPlaying ?
              <p onClick={handlePause}>PAUSE</p>
              :
              <p onClick={handlePlay}>PLAY</p>
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