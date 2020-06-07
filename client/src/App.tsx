import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getStorageInfo, fetchInfo } from './utility'
// import PouchDB from 'pouchdb'
import VideoPlayer from './VideoPlayer';


const App = () => {  
  // const db = new PouchDB('kittens')
  const [videoId, setVideoId] = useState('')

  useEffect(() => {
    getStorageInfo(navigator)
    fetchInfo()
      .then(res => res.items[0].id)
      .then(setVideoId)
      .catch(error => {
        console.log('the error that was hit by fetchInfo =>',error)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <VideoPlayer {...{videoId}}/>
      </header>
    </div>
  );
}

export default App