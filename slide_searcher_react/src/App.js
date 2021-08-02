import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-video-js-player';
import React, { Component } from 'react';
import txt from './ch08_result.txt'

class App extends Component {
  render() {
    const gotTheText = txt;
    return (
      <>
        <div className="video_player">
          <ReactPlayer 
            autostart autoPlay
            src= "ppt_no_animated.mp4"
            width="500px" 
            height="500px" 
            type="video/mp4" 
            control={true} 
          />
        </div>
        <div className="video_index">
          pdf : ch8-annotated.pdf<br/>
          video : ch8-video.mp4<br/>

          start analyzation...
        </div>
      </>
      );
  }
}

export default App;
