import ReactPlayer from 'react-player';
import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import SlideIndexList from '../components/SlideIndexList';
import SharePanel from '../components/SharePanel';
import SlideNavigation from '../components/SlideNavigation';

import './VideoViewPage.css';

function VideoViewPage({videoLoader, slideIndexLoader}) {
    const { id } = useParams();
    const player = useRef(null);
    const [presentSlideIndex, setPresentSlideIndex] = useState(0);

    const source = videoLoader.getSource(id);
    const title = videoLoader.getTitle(id);
    const slideIndexes = slideIndexLoader.getIndexes(id);
    const slideTimes = slideIndexes.map(slideIndex => slideIndex.time);
    const slideImages = slideIndexes.map(slideIndex => slideIndex.src);

    const url = window.location.href;

    const handleSeeking = (i) => {
        setPresentSlideIndex(i);
        player.current.seekTo(slideIndexes[i].time, 'seconds');
    };
    const sendEmail = () => {};
    const copyLink = () => {};

    return (<div className='video_view_page'>
        <div className='banner'>
            <Link to='/' className='banner-icon'>
                <div></div>
                <div></div>
                <div></div>
            </Link>
        </div>
        <div className='video_index'>
            <h1>{title}</h1>
            <SlideIndexList 
                className='slide_index_container' 
                times={slideTimes} 
                onClick={handleSeeking} 
                selected={presentSlideIndex}/>
        </div>
        <div className='content-container'>
            <ReactPlayer 
                ref={player}
                url= {source}
                playing
                controls
                width='900px'
                height='506px'
                type="video/mp4" />
            <SlideNavigation
                className='slide_slider' 
                srcs={slideImages}
                onSlideClick={handleSeeking}
                selected={presentSlideIndex}/>
            <SharePanel 
                className='share_panel' 
                link={url}
                title={title}
                events={{sendEmail, copyLink}}/>
        </div>
    </div>);
}

export default VideoViewPage;