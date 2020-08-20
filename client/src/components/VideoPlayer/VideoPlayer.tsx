import React, { useRef, useState, useEffect } from 'react'
import './videoPlayer.scss'
import { grabVidById } from '../../utility'

const VideoPlayer = ({ video, match }) => {


  const [videoUrl, setVideoUrl] = useState(null)
  const [videoInfo, setVideoInfo] = useState(null)
  const [vidPlaying, setVidPlaying] = useState('pause')
  const [vidError, setVidError] = useState(null)
  const vidRef = useRef(null);

  // function createVideoUrl(blob:any){
  //   return window.URL.createObjectURL(blob)
  // }

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
    if(vidPlaying && vidRef.current){
      console.log('this is vidPlaying =>', vidPlaying)
      vidPlaying === 'play' ?
      vidRef.current.play() :
      vidRef.current.pause()
    }
  }, [vidPlaying])

  const handleVid = () => {
    setVidPlaying(vidPlaying !== 'play' ? 'play' : 'pause')
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