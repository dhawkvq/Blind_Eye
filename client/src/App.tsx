import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AppContext } from './context';
import { SavedVideos, HotReel, WatchLater, VideoPlayer } from './pages'
import { Header } from './components'


const App = () =>  (
  <div className="App">
    <Router>
      <AppContext>
        <Header />
        <Switch>
          <Route exact path='/' component={HotReel} />
          <Route path='/my-vids' component={SavedVideos} />
          <Route path='/watch-later' component={WatchLater} />
          <Route path='/watch-video/:id' component={VideoPlayer} />
        </Switch>
      </AppContext> 
    </Router>
  </div>
);

export default App