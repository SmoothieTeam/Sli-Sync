import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
import SlideIndex from '../components/SlideIndex';

function VideoViewPage({video: {source, name}, slideIndexes}) {
    const player = useRef(null);

    const handleSeeking = (time) => {
        player.current.seekTo(time, 'seconds');
    };

    return (<div>
        <div className="video_player">
            <ReactPlayer 
                className="video_player"
                ref={player}
                url= {source}
                playing
                controls
                width="500px"
                height="500px"
                type="video/mp4" 
            />
        </div>
        <div className="video_index">
            {slideIndexes.map(slideIndex => SlideIndex({slideIndex, onSeek: handleSeeking}))}
        </div>
    </div>);
}
  
  export default VideoViewPage;
  