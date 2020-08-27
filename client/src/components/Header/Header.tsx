import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AppCtx } from '../../AppContext'
import './headStyles.scss'
import { PopularIcon, WatchLaterIcon, SavedVidsIcon } from './components'


const Header = () => {

  const [activeLink, setActiveLink] = useState<string|null>(null)

  const activeColor = "#61dafb"

  const appCtx = useContext(AppCtx)

  let location = useLocation()

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location])

  if(appCtx){

    const { handleTransition } = appCtx
    
    const handleFill = (arg:string) => {
      if(activeLink === arg) return activeColor
      return undefined
    }

    const handleClick = (path) => {
      if(location.pathname === path) return
      handleTransition(path)
      setActiveLink(path)
    }

    const isActiveClass = (path) => {
      if(activeLink === path) return 'active'
      return undefined
    }

    return (  
      <header>
        <div onClick={() => handleClick('/')} className={isActiveClass('/')}>
          <PopularIcon fill={handleFill('/')}/>
          <p>Popular</p>
        </div>

        <div onClick={() => handleClick('/watch-later')} className={isActiveClass('/watch-later')}>
          <WatchLaterIcon fill={handleFill('/watch-later')}/>
          <p>Watch Later</p>
        </div>

        <div onClick={() => handleClick('/my-vids')} className={isActiveClass('/my-vids')}>
          <SavedVidsIcon fill={handleFill('/my-vids')}/>
          <p>Saved Vids</p>
        </div>
      </header>
    )
  }
  else return null
}

export default Header