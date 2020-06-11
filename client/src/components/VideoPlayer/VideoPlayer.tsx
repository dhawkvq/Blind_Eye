import React, { useRef, useState, useEffect } from 'react'
import './videoPlayer.scss'


const VideoPlayer = ({ video }) => {

  const [videoUrl] = useState(createVideoUrl(video.doc.blob))
  const [vidPlaying, setVidPlaying] = useState('pause')
  const vidRef = useRef(null);

  function createVideoUrl(blob:any){
    return window.URL.createObjectURL(blob)
  }

  useEffect(() => {
    vidPlaying === 'play' ?
      vidRef.current.play() :
      vidRef.current.pause()
  }, [vidPlaying])

  const handleVid = () => {
    setVidPlaying( vidPlaying !== 'play' ? 'play' : 'pause')
  }

  let buttonText = vidPlaying === 'play' ? 'Pause' : 'Play'

  return (
    <div className='container'>
      <div className='vidWrapper'>
        { videoUrl &&
          <video ref={vidRef}>
            <source src={videoUrl}/>
          </video>
        }
      </div>
      <button onClick={handleVid}>{ buttonText }</button>
    </div>
  )
}

export default VideoPlayer