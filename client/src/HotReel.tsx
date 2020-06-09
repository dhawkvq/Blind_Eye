import React, { useContext } from 'react'
import { AppCtx } from './AppContext'

const HotReel = () => {

  const { hotReel } = useContext(AppCtx)

  return (
    <div style={{ border: '1px dashed white', minHeight: 100, minWidth: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      { hotReel.length && hotReel.map(video => (
          <div key={video.id} style={{ border: '1px dashed orange', width: 500, height: 400, display: 'flex', flexDirection: 'column' }}>
            <h3>{video.snippet.title}</h3>
          </div>
      ))}
    </div>
  )
}

export default HotReel