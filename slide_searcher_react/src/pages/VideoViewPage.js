import ReactPlayer from 'react-player';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import HeaderBuilder from '../components/HeaderBuilder';
import SlideIndexList from '../components/SlideIndexList';
import SharePanel from '../components/SharePanel';
import SlideNavigation from '../components/SlideNavigation';

import './VideoViewPage.css';

function VideoViewPage({ getPost, sendEmail, copyLink }) {
    const { id } = useParams();
    const player = useRef(null);
    const [presentTimeline, setPresentTimeline] = useState(0);
    const [title, setTitle] = useState('');
    const [videoURL, setVideoURL] = useState('');
    const [times, setTimes] = useState([]);
    const [slideImageURLs, setSlideImageURLs] = useState([]);
    const handleSeeking = (i) => {
        setPresentTimeline(i);
        player.current.seekTo(times[i], 'seconds');
    };
    const loadPost = async () => {
        const { title, videoURL, times, slideImageURLs } = await getPost(id);
        setTitle(title);
        setVideoURL(videoURL);
        setTimes(times);
        setSlideImageURLs(slideImageURLs);
    };
    const builder = new HeaderBuilder();

    useEffect(() => {
        loadPost();
    }, []);

    return (<div className='view-page'>
        { builder.addIcon().build() }
        <div className='view-page__main'>
            <div className='view-page__slide-index-container'>
                <h1>{title}</h1>
                <SlideIndexList 
                    times={times} 
                    onClick={handleSeeking} 
                    selected={presentTimeline}/>
            </div>
            <div className='view-page__content-container'>
                <ReactPlayer 
                    ref={player}
                    url= {videoURL}
                    playing
                    controls
                    width='900px'
                    height='506px'
                    type='video/mp4' />
                <SlideNavigation
                    className='view-page__slide-nav' 
                    srcs={slideImageURLs}
                    onSlideClick={handleSeeking}
                    selected={presentTimeline}/>
                <SharePanel 
                    link={window.location.href}
                    title={title}
                    sendEmail={sendEmail}
                    copyLink={copyLink}/>
            </div>
        </div>
    </div>);
}

export default VideoViewPage;