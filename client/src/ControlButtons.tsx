import React from 'react'


const ControlButtons = ({ setVidPlaying }) => (
  <div style={{ border: '1px dashed purple', display: 'flex'}}>
    <button onClick={() => setVidPlaying('play')}>Play</button>
    <button onClick={() => setVidPlaying('pause')}>Pause</button>
  </div>
)

export default ControlButtons