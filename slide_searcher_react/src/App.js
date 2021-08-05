import MainPage from './pages/MainPage.js';
import UploadPage from './pages/UploadPage.js';
import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { render } from 'react-dom';
import VideoIndex from './components/VideoIndex.js';

function App() {
  const handleSubmit = (t, v, s) => {
    console.log(t);
    console.log(v);
    console.log(s);
  }

  return(
    <div className='App'>
      <Switch>
        <Route path='videobutton'>
         <VideoIndex></VideoIndex>
        </Route>
        <Route path='/upload'>
          <UploadPage onSubmit={handleSubmit}/>
        </Route>
        <Route path='/'>
          <MainPage slidedVideos={[{video: 'a'}, {video: 'b'}, {video: 'c'}]}/>
        </Route>
      </Switch>
    </div>
  );
}
export default App;
