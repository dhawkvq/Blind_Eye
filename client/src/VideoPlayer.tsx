import React, { useRef, useState, useEffect } from 'react'
import ControlButtons from './ControlButtons';



const VideoPlayer = ({ video }) => {

  const [videoUrl] = useState(createVideoUrl(video.doc.blob))
  const [vidPlaying, setVidPlaying] = useState(false)
  const vidRef = useRef(null);

  function createVideoUrl(blob:any){
    return window.URL.createObjectURL(blob)
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
      <ControlButtons {...{setVidPlaying}} />
    </div>
  )
}

export default VideoPlayer