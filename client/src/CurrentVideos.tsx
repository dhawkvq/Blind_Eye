import React, { useState, useEffect } from 'react'
import { grabDbItems } from './utility'
import VideoPlayer from './VideoPlayer'

const CurrentVideos = () => {

  const [currentVids, setCurrentVids] = useState([])

  useEffect(() => {
    grabDbItems()
      .then(res => setCurrentVids(res.rows))
      .catch(error => console.log('error from call to grabDbItems =>', error ))
  }, [])

  return (
    <div style={{ border: '1px dashed limegreen', minHeight: 200, minWidth: 200 }}>
      { currentVids.length && currentVids.map((video:any) => (
          <VideoPlayer video={video} key={video.id}/>
        ))
      }
    </div>
  )
}

export default CurrentVideos