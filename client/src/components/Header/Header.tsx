import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../logo.svg'
import './headStyles.scss'

const styles = {
  active: {
    fontWeight: "bold",
    color: "#61dafb"
  }
}

const Header = () => {
  return (
    <header>
      <img src={logo} alt="logo" />
      <span>
        <NavLink 
          exact to='/' 
          activeStyle={styles.active}
        >
          Popular Vids
        </NavLink>
        <NavLink 
          to='/watch-later' 
          activeStyle={styles.active}
        >
          Watch Later
        </NavLink>
        <NavLink 
          to='/my-vids' 
          activeStyle={styles.active}
        >
          Saved Vids
        </NavLink>
      </span>
    </header>
  )
}

export default Header