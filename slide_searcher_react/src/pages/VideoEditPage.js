import ReactPlayer from 'react-player';
import React, { useRef, useState } from 'react';
import SlideIndexEditor from '../components/SlideIndexEditor';

function VideoEditPage({video: {source, name}, slideIndexes}) {
    const player = useRef(null);
    const [currentSlideIndexes, setSlideIndexes] = useState(slideIndexes);
    const handleSeeking = (time) => {
        player.current.seekTo(time, 'seconds');
    };
    const handleChangeTime = (index, time) => {
        console.log({index, time});
        setSlideIndexes(prev => {
            const newSlideIndexes = [...prev];
            newSlideIndexes[index].time = time;
            return newSlideIndexes;
        });
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
            {currentSlideIndexes.map((slideIndex, i) => SlideIndexEditor({slideIndex, onSeek: handleSeeking, onChange: (t) => handleChangeTime(i, t)}))}
        </div>
    </div>);
}
  
  export default VideoEditPage;
  