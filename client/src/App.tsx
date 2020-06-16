import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { getStorageInfo } from './utility'
import PouchDB from 'pouchdb'
import AppContext from './AppContext';
import { CurrentVideos, HotReel, WatchLater } from './pages'
import { Header } from './components'


export const db = new PouchDB('kittens')

const App = () => {  

  useEffect(() => {
    getStorageInfo(navigator)
  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <AppContext>
          <Switch>
            <Route exact path='/' component={CurrentVideos} />
            <Route path='/popular' component={HotReel} />
            <Route path='/watch-later' component={WatchLater} />
          </Switch>
        </AppContext> 
      </Router>
    </div>
  );
}

export default App