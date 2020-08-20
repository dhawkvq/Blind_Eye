import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { getStorageInfo } from './utility'
import AppContext from './AppContext';
import { CurrentVideos, HotReel, WatchLater } from './pages'
import { Header, VideoPlayer } from './components'


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
            <Route exact path='/' component={HotReel} />
            <Route path='/my-vids' component={CurrentVideos} />
            <Route path='/watch-later' component={WatchLater} />
            <Route path='/watch-video/:id' component={VideoPlayer} />
          </Switch>
        </AppContext> 
      </Router>
    </div>
  );
}

export default App