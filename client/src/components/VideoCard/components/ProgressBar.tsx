import React from 'react'
import './progBarStyles.scss'

const ProgressBar = ({ progPercent = 1 }:{ progPercent?: number}) => {
  return (
    <div className='progBar'>
      <p>Downloading....</p>
      <div style={{ width: `${progPercent}%`}} />
    </div>
  )
}

export default ProgressBar