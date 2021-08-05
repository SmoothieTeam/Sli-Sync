import ReactPlayer from 'react-player';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const videoview = ({match}) => {
    videoFilePath: match.params.videoFilePath
}

// const sources = {
//     videoFilePath: 'ppt_no_animated.mp4'
// }

class VideoView extends React.Component {
    constructor(props) {
        super(props);
        this.ref = player => this.player = player;
        this.player = undefined;
    }
    render() {   
        return (
        <div >
            <Link to='/'>MainPage</Link>
            <div className="video_player">
                <ReactPlayer 
                    className="video_player"
                    ref={player => {this.player = player}}
                    url= {videoview.videoFilePath}
                    playing
                    controls
                    width="500px" 
                    height="500px" 
                    type="video/mp4" 
                />
            </div>
            <div className="video_index">
                (0 : <button type='button' onClick={() => this.player.seekTo(0.0,'seconds')}>['0:0']</button>) <br/>
                (1 : <button type='button' onClick={() => this.player.seekTo(24.0,'seconds')}>['0:24']</button>) <br/>
                (2 : <button type='button' onClick={() => this.player.seekTo(113.0,'seconds')}>['1:53']</button>) <br/>
            </div>
        </div>
        );
    }
  }
  
  export default VideoView;
  