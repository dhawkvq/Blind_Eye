import React from 'react'

const PlayButton = ({ handleClick }) => (
  <div onClick={handleClick} className='play-pause'>
    <svg viewBox="0 0 228 229" fill='none' xmlns="http://www.w3.org/2000/svg">
      <path id='ring' d="M227.5 114.5C227.5 177.463 176.682 228.5 114 228.5C51.3177 228.5 0.5 177.463 0.5 114.5C0.5 51.5375 51.3177 0.5 114 0.5C176.682 0.5 227.5 51.5375 227.5 114.5Z" />
      <path id='button' d="M87.5 58.5C81.1 57.7 79.5 62.1667 79.5 64.5V166.5C80.7 171.3 85.3333 172.167 87.5 172L172.5 119.5C176.9 115.1 174.333 111 172.5 109.5L87.5 58.5Z" />
    </svg>
  </div>
)

export default PlayButton