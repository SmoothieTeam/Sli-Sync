import ReactPlayer from 'react-player';
import React, { useRef, useState } from 'react';
import SlideIndexEditor from '../components/SlideIndexEditor';
import { Link, useParams } from 'react-router-dom';

function VideoEditPage({video: {source, name}, slideIndexes, onSubmit}) {
    const {filename} = useParams();
    const player = useRef(null);
    const [currentSlideIndexes, setSlideIndexes] = useState(slideIndexes);
    const handleSeeking = (time) => {
        player.current.seekTo(time, 'seconds');
    };
    const handleChangeTime = (index, time) => {
        setSlideIndexes(prev => {
            const newSlideIndexes = [...prev];
            newSlideIndexes[index].time = time;
            return newSlideIndexes;
        });
    };
    const handleSubmit = () => {
        onSubmit({source, name}, currentSlideIndexes);
    };

    return (<div>
        <div className="video_player">
            <ReactPlayer 
                className="video_player"
                ref={player}
                url= {filename}
                playing
                controls
                width="500px"
                height="500px"
                type="video/mp4" />
        </div>
        <div className="video_index">
            {currentSlideIndexes.map((slideIndex, i) => SlideIndexEditor({slideIndex, onSeek: handleSeeking, onChange: (t) => handleChangeTime(i, t)}))}
        </div>
        <Link to={'/videoview/'+filename} type="submit" onClick={handleSubmit}>Submit</Link>
    </div>);
}
  
  export default VideoEditPage;
  