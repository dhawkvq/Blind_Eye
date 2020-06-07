import React, { useRef, useState, useEffect } from 'react'
import ControlButtons from './ControlButtons';
import { downloadVideo } from './utility'


const VideoPlayer = ({ videoId }) => {

  const [videoBlob, setVideoBlob] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [vidPlaying, setVidPlaying] = useState(false)
  const vidRef = useRef(null);
  
  useEffect(() => {
    if(videoBlob !== null){
      console.log('creating videoUrl')
      const videoUrl = window.URL.createObjectURL(videoBlob)
      setVideoUrl(videoUrl)
    }
  }, [videoBlob])

  const handleDownload = () => {
    downloadVideo(videoId)
      .then(setVideoBlob)
      .catch(error => console.log('there was an error coming back from download video =>', error ))
  }

  useEffect(() => {
    if(vidPlaying === 'play'){
      vidRef.current.play()
    }else if(vidPlaying === 'pause'){
      vidRef.current.pause()
    }
  }, [vidPlaying])

  return (
    <div style={{ border: '1px dashed yellow', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ border: '1px dashed white', maxWidth: 800, maxHeight: 700 }}>
        { videoUrl &&
          <video ref={vidRef} style={{ width: '100%', height: '100%'}}>
            <source src={videoUrl}/>
          </video>
        }
      </div>
      <ControlButtons 
        isVideo={videoBlob !== null}
        {...{videoId, handleDownload, setVidPlaying}}
      />
    </div>
  )
}

export default VideoPlayer