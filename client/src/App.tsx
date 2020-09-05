import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { getStorageInfo } from './utility'
import { AppContext } from './context';
import { CurrentVideos, HotReel, WatchLater, VideoPlayer } from './pages'
import { Header } from './components'


const App = () => {  

  useEffect(() => {
    getStorageInfo(navigator)
  }, [])

  return (
    <div className="App">
      <Router>
        <AppContext>
          <Header />
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