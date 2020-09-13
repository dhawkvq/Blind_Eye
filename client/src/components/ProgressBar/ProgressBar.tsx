import React from 'react'
import './progBarStyles.scss'

type BarProps = {
  progPercent?: number;
  message?: string;
}

const ProgressBar = ({ progPercent = 1, message = 'Downloading...' }: BarProps ) => {
  return (
    <div className='progBar'>
      <p>{message}</p>
      <div style={{ width: `${progPercent}%`}} />
    </div>
  )
}

export default ProgressBar