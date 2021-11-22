import ReactPlayer from 'react-player';
import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import HeaderBuilder from '../components/HeaderBuilder';
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

    const builder = new HeaderBuilder();

    return (<div className='view-page'>
        { builder.addIcon().build() }
        <div className='view-page__main'>
            <div className='view-page__slide-index-container'>
                <h1>{title}</h1>
                <SlideIndexList 
                    times={slideTimes} 
                    onClick={handleSeeking} 
                    selected={presentSlideIndex}/>
            </div>
            <div className='view-page__content-container'>
                <ReactPlayer 
                    ref={player}
                    url= {source}
                    playing
                    controls
                    width='900px'
                    height='506px'
                    type='video/mp4' />
                <SlideNavigation
                    className='view-page__slide-nav' 
                    srcs={slideImages}
                    onSlideClick={handleSeeking}
                    selected={presentSlideIndex}/>
                <SharePanel 
                    link={url}
                    title={title}
                    events={{sendEmail, copyLink}}/>
            </div>
        </div>
    </div>);
}

export default VideoViewPage;