import UploadPage from './pages/UploadPage.js';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import VideoViewPage from './pages/VideoViewPage.js';
import VideoEditPage from './pages/VideoEditPage.js';
import UploadedPage from './pages/UploadedPage.js';
import LoadingPage from './pages/LoadingPage.js';

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
  const videoLoader = {
    getSource: (id) => 'ppt_no_animated.mp4',
    getTitle: (id) => '운영체제론 1강'
  };
  const slideIndexLoader = {
    getIndexes: (id) => [{index: 0, time: 0.0}, {index: 1, time: 24.0}, {index: 2, time: 103.0}]
  }

  return(
    <div className='App'>
      <Switch>
        <Route exact path='/view/:id'>
          <VideoViewPage
            videoLoader={videoLoader} 
            slideIndexLoader={slideIndexLoader}/>
        </Route>
        <Route exact path='/edit/:id'>
          <VideoEditPage 
            videoLoader={videoLoader} 
            slideIndexLoader={slideIndexLoader}
            onSubmit={handleUpdate}/>
        </Route>
        <Route path='/'>
          <LoadingPage />
          {/* <UploadPage onSubmit={handleUpload}/> */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;