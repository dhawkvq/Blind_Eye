import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import { getStorageInfo } from './utility'
import PouchDB from 'pouchdb'
import CurrentVideos from './CurrentVideos';
import AppContext from './AppContext';
import HotReel from './HotReel';


export const db = new PouchDB('kittens')

const styles = {
  span:{
    alignSelf: 'flex-end'
  },
  link:{
    padding: 10, 
    textDecoration: 'none', 
    color: 'white' 
  },
  active: {
    fontWeight: "bold",
    color: "#61dafb"
  }
}

const App = () => {  

  useEffect(() => {
    getStorageInfo(navigator)
  }, [])

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span style={styles.span}>
            <NavLink 
              exact to='/' 
              style={styles.link}
              activeStyle={styles.active}
            >
              Saved Vids
            </NavLink>
            <NavLink 
              to='/popular' 
              activeStyle={styles.active}
              style={styles.link}
            >
              Popular Vids
            </NavLink>
          </span>
        </header>
        <AppContext>
          <Switch>
            <Route exact path='/' component={CurrentVideos} />
            <Route path='/popular' component={HotReel} />
          </Switch>
        </AppContext> 
      </Router>
    </div>
  );
}

export default App