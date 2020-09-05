import React, { useRef, useState, useEffect, useContext } from 'react'
import { AppCtx } from '../context'
import './pageStyles.scss'
import { grabVidById } from '../utility'


const VideoPlayer = ({ match, history }) => {

  const [videoUrl, setVideoUrl] = useState<null|string>(null)
  const [videoInfo, setVideoInfo] = useState(null)
  const [vidError, setVidError] = useState(null)
  const vidRef = useRef(null);

  useEffect(() => {
    const { id } = match.params
    if(!id){ 
      console.log('no id was supplied to videoPlayer!') 
      return
    }
    grabVidById(id)
      .then((video:any) => {
        setVideoInfo(video)
        setVideoUrl(window.URL.createObjectURL(video['vidData']))
      })
      .catch(error => setVidError(error.message))
  }, [match.params])

  const ctx = useContext(AppCtx)

  if(ctx){

    const { 
      transitionComp: { toComp, fromComp },
      setTransitionComp 
    } = ctx

    const handleAnimation = ({ animationName }) => {
      if(animationName === 'fadeOut'){
        history.push({
          pathname: toComp,
          state: { fromComp }
        })
        setTransitionComp({})
      }
    }

    let conClass = fromComp?.slice(0,12) === '/watch-video' ? 'container--transition': 'container'


    return (
      <div className={conClass} onAnimationEnd={handleAnimation}>  
        { videoUrl && history.location.state.fromComp !== '/my-vids' ?
            <video ref={vidRef} 
              autoPlay
              controls 
              controlsList='nodownload' 
              disablePictureInPicture
            >
              <source src={videoUrl}/>
            </video>
          :
          // ts throws error for allowfullscreen option in iframe
          // @ts-ignore
          <iframe width="700" height="400" allowfullscreen="true"
            src={`http://www.youtube.com/embed/${match.params.id}?autoplay=1`}
            ></iframe>
        }
      </div>
    )
  }
}

export default VideoPlayer