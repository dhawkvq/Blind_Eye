import React, { useState } from 'react'
import './notifStyles.scss'

type NotifProps = {
  message?: string;
  clearNotification: () => void;
}


const NotificationBar = ({ message = "No message", clearNotification }: NotifProps ) => {

  const [removeNotif, setRemoveNotif] = useState(false)

  const handleAnimation = ({ animationName }) => {
    if(animationName === 'slideIn'){
      setRemoveNotif(true)
    } else if(animationName === 'slideOut'){
      clearNotification()
    }
  }

  let notifClass = removeNotif ? 'notifBar remove': 'notifBar'

  return (
    <div className={notifClass} onAnimationEnd={handleAnimation}>
      <p>{message}</p>
    </div>
  )
}

export default NotificationBar