import React, { useContext } from 'react'
import { AppCtx } from '../AppContext'
import { VideoPlayer } from '../components'


const style = {
  wrapper:{
    border: '1px dashed limegreen', 
    minHeight: 200, 
    minWidth: 200,
    color: 'white'
  }
}


const CurrentVideos = () => {

  const { savedVideos = [] } = useContext(AppCtx)

  return (
    <div style={style.wrapper}>
      { savedVideos.length > 0 && savedVideos.map((video:any) => (
          <VideoPlayer video={video} key={video.id}/>
        ))
      }
    </div>
  )
}

export default CurrentVideos