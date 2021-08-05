import MainPage from './pages/MainPage.js';
import UploadPage from './pages/UploadPage.js';
import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { render } from 'react-dom';
import VideoView from './pages/VideoViewPage.js';
import { Link } from 'react-router-dom';

function App() {
  const handleSubmit = (t, v, s) => {
    console.log(t);
    console.log(v);
    console.log(s);
  }

  return(
    <div className='App'>
      <Switch>
        <Route path='/videoview:videoFilePath'>
         <VideoView></VideoView>
        </Route>
        <Route path='/upload'>
          <UploadPage onSubmit={handleSubmit}/>
        </Route>
        <Route path='/'>
          <MainPage slidedVideos={
            [{video: <Link to='/videoview/a.mp4'>a</Link>}, 
             {video: <Link to='/videoview/b.mp4'>b</Link>}, 
             {video: <Link to='/videoview/c.mp4'>c</Link>}]
            }/>
        </Route>
      </Switch>
    </div>
  );
}
export default App;
