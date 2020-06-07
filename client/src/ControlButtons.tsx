import React from 'react'

const ControlButtons = ({ videoId, isVideo, handleDownload, setVidPlaying }) => (
  <div style={{ border: '1px dashed purple', display: 'flex'}}>
    { isVideo ?
        <>
          <button onClick={() => setVidPlaying('play')}>Play</button>
          <button onClick={() => setVidPlaying('pause')}>Pause</button>
        </>
      : videoId ?
        <button onClick={handleDownload}>
          Download Video
        </button>
      :
        <p>Waiting for id.....</p>
    }
  </div>
)

export default ControlButtons
