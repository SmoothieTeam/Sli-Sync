import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
import SlideIndex from '../components/SlideIndex';
import { Link, useParams } from 'react-router-dom';

function VideoViewPage({videoLoader, slideIndexLoader}) {
    const { id } = useParams();
    const player = useRef(null);
    const source = videoLoader.getSource(id);
    const title = videoLoader.getTitle(id);
    const slideIndexes = slideIndexLoader.getIndexes(id);
    const handleSeeking = (time) => {
        player.current.seekTo(time, 'seconds');
    };

    return (<div>
        <Link to='/'>UploadPages</Link> <tab/>
        <Link to={'/edit/' + id}>VideoEdit</Link>
        <h1>{title}</h1>
        <div className="video_player">
            <ReactPlayer 
                className="video_player"
                ref={player}
                url= {source}
                playing
                controls
                width="500px"
                height="500px"
                type="video/mp4" />
        </div>
        <div className="video_index">
            {slideIndexes.map(slideIndex => SlideIndex({slideIndex, onSeek: handleSeeking}))}
        </div>
    </div>);
}

export default VideoViewPage;