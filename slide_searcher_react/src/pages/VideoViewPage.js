import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
import SlideIndex from '../components/SlideIndex';
import { Link, useParams } from 'react-router-dom';

import './VideoViewPage.css';
import SharePanel from '../components/SharePanel';

function VideoViewPage({videoLoader, slideIndexLoader}) {
    const { id } = useParams();
    const player = useRef(null);
    const source = videoLoader.getSource(id);
    const title = videoLoader.getTitle(id);
    const slideIndexes = slideIndexLoader.getIndexes(id);

    const handleSeeking = (time) => {
        player.current.seekTo(time, 'seconds');
    };
    const sendEmail = () => {};
    const copyLink = () => {};

    return (<div className='video_view_page'>
        <div className="video_index">
            <h1>{title}</h1>
            {slideIndexes.map(slideIndex => SlideIndex({
                className: 'slide_index_container', 
                slideIndex, 
                onSeek: handleSeeking
            }))}
        </div>
        <div className="video_player">
            <ReactPlayer 
                ref={player}
                url= {source}
                playing
                controls
                width='900px'
                height='506px'
                type="video/mp4" />
        </div>
        <SharePanel className='share_panel' events={{sendEmail, copyLink}}/>
    </div>);
}

export default VideoViewPage;