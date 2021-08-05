import MainPage from './pages/MainPage.js';
import UploadPage from './pages/UploadPage.js';
import { Switch, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import { render } from 'react-dom';
import VideoViewPage from './pages/VideoViewPage.js';
import VideoEditPage from './pages/VideoEditPage.js';

function App() {
  const handleSubmit = (t, v, s) => {
    console.log(t);
    console.log(v);
    console.log(s);
  }

  return(
    <div className='App'>
      <Switch>
        <Route path='/videoedit'>
        <VideoEditPage 
          video={{source:'ppt_no_animated.mp4', name:'test'}} 
          slideIndexes={[{index: 0, time: 0.0}, {index: 1, time: 24.0}, {index: 2, time: 103.0}]}/>
        </Route>
        <Route path='/videoview/:filename'>
         <VideoViewPage
         video={{source:'ppt_no_animated.mp4', name:'test'}} 
         slideIndexes={[{index: 0, time: 0.0}, {index: 1, time: 24.0}, {index: 2, time: 103.0}]}/>
        </Route>

        <Route path='/upload'>
          <UploadPage onSubmit={handleSubmit}/>
        </Route>

        <Route path='/'>
          <MainPage slidedVideos={[
            {video: <Link to='/videoview/a.mp4'>a</Link>}, 
            {video: <Link to='/videoview/b.mp4'>b</Link>}, 
            {video: <Link to='/videoview/c.mp4'>c</Link>}
            ]}/>
        </Route>
        
      </Switch>
    </div>
  );
}
export default App;
