import MainPage from './pages/MainPage.js';
import UploadPage from './pages/UploadPage.js';
import { Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import VideoViewPage from './pages/VideoViewPage.js';
import VideoEditPage from './pages/VideoEditPage.js';

function App() {
  const handleUpload = (t, v, s) => {
    console.log(t);
    console.log(v);
    console.log(s);
  };
  const handleUpdate = (v, s) => {
    console.log(v);
    console.log(s);
  }

  return(
    <div className='App'>
      <Switch>
        <Route path='/videoview/:filename'>
         <VideoViewPage
         video={{source:'ppt_no_animated.mp4', name:'test'}} 
         slideIndexes={[{index: 0, time: 0.0}, {index: 1, time: 24.0}, {index: 2, time: 103.0}]}/>
        </Route>

        <Route path='/upload'>
          <UploadPage onSubmit={handleUpload}/>
        </Route>
        <Route path='/videoedit'>
          <VideoEditPage 
            video={{source:'ppt_no_animated.mp4', name:'test'}} 
            slideIndexes={[{index: 0, time: 0.0}, {index: 1, time: 24.0}, {index: 2, time: 103.0}]}
            onSubmit={handleUpdate}/>
        </Route>

        <Route path='/'>
          <MainPage slidedVideos={[
            {video: 'a.mp4'}, 
            {video: 'b.mp4'}, 
            {video: 'c.mp4'}
            ]}/>
        </Route>
        
      </Switch>
    </div>
  );
}
export default App;
