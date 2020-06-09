import React, { useContext } from 'react'
import { AppCtx } from './AppContext'
import { formatDuration, formatViewCount } from './utility'

const HotReel = () => {

  const { hotReel } = useContext(AppCtx)

  return (
    <div style={{ 
      maxWidth: '100vw', 
      height: '100%',
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center', 
      padding: 20 
    }}>
      { hotReel.length && hotReel.map( video => {
        let { channelThumbs, snippet: { thumbnails }} = video
        let thumbnailPic = thumbnails.maxres ? thumbnails.maxres: 
                          thumbnails.high ? thumbnails.high : 
                          thumbnails.standard ? thumbnails.standard :
                          thumbnails.default

        let channelOwnerPic = channelThumbs.high ? channelThumbs.high :
                              channelThumbs.medium ? channelThumbs.medium :
                              channelThumbs.default

        let vidTime = formatDuration(video.duration)
        let viewCount = formatViewCount(video.statistics.viewCount)
        
        return(
          <div key={video.id} style={{ display: 'flex', flexDirection: 'column', maxHeight: '20%', maxWidth: '50%', margin: '20px 0', position: 'relative' }}>
            <p style={{ position: 'absolute', right: 10, bottom: 75, backgroundColor: '#323947', color: 'white', padding: '5px 10px', borderRadius: 5,  border: '2px solid #1E2425' }}>{vidTime}</p>
            <img src={thumbnailPic.url}  height='80%' width='100%' alt='thumbnail pic' style={{ borderRadius: '10px 10px 0 0', border: '2px solid #1E2425' }}/>
            <div style={{ display: 'flex', height: '15%', alignItems: 'center', marginTop: 8,  backgroundColor: '#323947', borderRadius: '0 0 5px 5px', border: '2px solid #1E2425'  }} className='detailBar'>
              <div className='picHousing' style={{ height: '100%', width: '20%', padding: '5px 0' }}>
                <img src={channelOwnerPic.url} height='100%' width='60%' alt='channel owner thumbnail pic' style={{ borderRadius: '5px' }}/>
              </div>
              <div className='videoDetails' style={{ display: 'flex', flexDirection: 'column', width: '80%', alignItems: 'flex-start', color: 'white', fontSize: 15 }}>
                <p style={{ margin: '5px 0', fontSize: 18 }}>{video.snippet.title}</p>
                <p style={{ margin: '5px 0', color: '#FF8D0A'}}>
                  {video.snippet.channelTitle}
                  <span style={{ color: 'white', marginLeft: 10, fontSize: 12 }}>- {viewCount} Views</span>
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HotReel