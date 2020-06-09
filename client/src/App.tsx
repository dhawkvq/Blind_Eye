import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getStorageInfo } from './utility'
import PouchDB from 'pouchdb'
// import CurrentVideos from './CurrentVideos';
import AppContext from './AppContext';
import HotReel from './HotReel';

export const db = new PouchDB('kittens')

const App = () => {  

  useEffect(() => {
    getStorageInfo(navigator)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AppContext>
          {/* <CurrentVideos />  */}
          <HotReel />
        </AppContext> 
      </header>
    </div>
  );
}

export default App