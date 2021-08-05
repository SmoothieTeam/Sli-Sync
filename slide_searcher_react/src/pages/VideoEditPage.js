import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
import SlideIndexEditor from '../components/SlideIndexEditor';

function VideoEditPage({video: {source, name}, slideIndexes}) {
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
            {slideIndexes.map(slideIndex => SlideIndexEditor({slideIndex, onSeek: handleSeeking}))}
        </div>
    </div>);
}
  
  export default VideoEditPage;
  