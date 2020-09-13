import React, { useRef, useState, useEffect, useContext } from 'react'
import { AppCtx } from '../context'
import './pageStyles.scss'
import { grabVidById } from '../utility'
import VideoInfo from '../components/VideoCard/VideoInfo'
import { Video } from '../utility'


const VideoPlayer = ({ match, history, location }) => {

  const [videoUrl, setVideoUrl] = useState<null|string>(null)
  const [videoInfo, setVideoInfo] = useState<Video|undefined>()
  const [vidError, setVidError] = useState(null)
  const vidRef = useRef(null);
  

  useEffect(() => {

    const grabParams = () => {
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
    }

    const { fromComp, data } = location.state

    if(fromComp === '/my-vids'){
      grabParams()
    } else if(data){
      setVideoInfo(data)
    }
  }, [location, match])

  useEffect(() => {
    vidError && console.log('there has been an error')
  }, [vidError])

  const ctx = useContext(AppCtx)

  if(ctx){

    const { 
      transitionComp: { fromComp },
      handleRouteChange
    } = ctx

    let conClass = fromComp?.slice(0,12) === '/watch-video' ? 'wrapper transition': 'wrapper'

    let vidTitle = videoInfo ? videoInfo.title : 'loading'
    
    return (
      <div className={conClass} onAnimationEnd={handleRouteChange}>
        <div className='vidCon'>
          { videoUrl && history.location.state.fromComp === '/my-vids' ?
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
              <iframe 
                src={`http://www.youtube.com/embed/${match.params.id}`} 
                title={vidTitle}
                allowFullScreen={true}
              ></iframe>
          }
          {
            videoInfo && 
              <VideoInfo 
                video={videoInfo}
                ctx={ctx}
              />
          }
        </div>  
      </div>
    )
  }
}

export default VideoPlayer