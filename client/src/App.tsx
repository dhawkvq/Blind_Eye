import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getStorageInfo, fetchInfo, downloadVideo } from './utility'


const App = () => {

  useEffect(() => {
    getStorageInfo(navigator)
    fetchInfo()
      .then(res => res.items[0].id)
      .then(downloadVideo)
      .then(data => console.log('this is what was sent back from downloadVideo =>', data))
      .catch(error => {
        console.log('the error that was hit by fetchInfo =>',error)
      })
  }, [])

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