import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import './headStyles.scss'
import { PopularIcon, WatchLaterIcon, SavedVidsIcon } from './components'


const Header = () => {

  const [activeLink, setActiveLink] = useState<string|null>(null)

  const activeColor = "#61dafb"

  const handleActive = (match,arg) => {
    if(match) {
      setActiveLink(arg)
      return true
    }
  }

  const handleFill = (arg:string) => {
    if(activeLink === arg) return activeColor
    return undefined
  }

  return (
    <header>
      <NavLink 
        exact to='/' 
        activeStyle={{ color: activeColor }}
        isActive={(match) => handleActive(match,'popular')}
      >
        <PopularIcon fill={handleFill('popular')}/>
        Popular
      </NavLink>
      <NavLink 
        to='/watch-later' 
        activeStyle={{ color: activeColor }}
        isActive={(match) => handleActive(match,'watchLater') }
      >
        <WatchLaterIcon fill={handleFill('watchLater')}/>
        Watch Later
      </NavLink>
      <NavLink 
        to='/my-vids' 
        activeStyle={{ color: activeColor }}
        isActive={(match) => handleActive(match,'savedVideos') }
      >
        <SavedVidsIcon fill={handleFill('savedVideos')}/>
        Saved Vids
      </NavLink>
    </header>
  )
}

export default Header