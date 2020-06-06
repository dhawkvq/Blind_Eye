import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getStorageInfo, fetchInfo, downloadVideo,grabReadStream } from './utility'
import PouchDB from 'pouchdb'


const App = () => {  

  const [mortyRickPage, setMortyRickPage] = useState([])
  
  const db = new PouchDB('kittens')

  useEffect(() => {
    getStorageInfo(navigator)
    grabReadStream()
      .then(res => {
        console.log('the stream returned successfully')
        setMortyRickPage(res)
      })
      .catch(error => console.log('grabReadStream returned an error =>', error ))
    // fetchInfo()
    //   .then(res => res.items[0].id)
    //   .then(downloadVideo)
    //   .then(data => console.log('this is what was sent back from downloadVideo =>', data))
    //   .catch(error => {
    //     console.log('the error that was hit by fetchInfo =>',error)
    //   })
  }, [])

  useEffect(() => {
    if(mortyRickPage.length){
      console.log('the morty rick page is filled out')
      console.log(mortyRickPage)
    }
  }, [mortyRickPage])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App