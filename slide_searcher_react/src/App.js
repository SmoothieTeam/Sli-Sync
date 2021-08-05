import MainPage from './pages/MainPage.js';
import UploadPage from './pages/UploadPage.js';
import { Switch, Route } from 'react-router-dom';
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
      <VideoEditPage 
        video={{source:'ppt_no_animated.mp4', name:'test'}} 
        slideIndexes={[{index: 0, time: 0.0}, {index: 1, time: 24.0}, {index: 2, time: 103.0}]}/>
      {/* <Switch>
        <Route path='videobutton'>
         <VideoIndex></VideoIndex>
        </Route>
        <Route path='/upload'>
          <UploadPage onSubmit={handleSubmit}/>
        </Route>
        <Route path='/'>
          <MainPage slidedVideos={[{video: 'a'}, {video: 'b'}, {video: 'c'}]}/>
        </Route>
      </Switch> */}
    </div>
  );
}
export default App;
