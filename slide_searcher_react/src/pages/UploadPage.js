import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FileProgress from '../components/FileProgress';
import HeaderBuilder from '../components/HeaderBuilder';
import TwoColoredFileInput from '../components/TwoColoredFileInput';
import './UploadPage.css';

function UploadPage({ onSubmit, uploader }) {
    let title = "";
    const [video, setVideo] = useState();
    const [videoProgress, setVideoProgress] = useState(0);
    const [slide, setSlide] = useState();
    const [slideProgress, setSlideProgress] = useState(0);
    
    const handleTitle = (e) => {
        title = e.target.value;
    }
    const handleVideo = (e) => {
        setVideo(e);
        uploader.uploadVideo(e, setVideoProgress);
    }
    const handleSlide = (e) => {
        setSlide(e);
        uploader.uploadSlide(e, setSlideProgress);
    }

    const builder = new HeaderBuilder();

    return (<div className='upload-page'>
        { builder.build() }

        <div className='upload-page__main'>
            <>
                <h2>UPLOAD FILES</h2>
                <p>MP4, PDF are supported</p>
            </>
            <>
                <TwoColoredFileInput 
                    className='upload-page__file-input' 
                    id='videoInput' 
                    text='Select Video' 
                    accept='video/*' 
                    onChangeFile={handleVideo}/>
                <TwoColoredFileInput 
                    className='upload-page__file-input' 
                    id='pdfInput' 
                    text='Select PDF' 
                    accept='.pdf' 
                    onChangeFile={handleSlide}/>
            </>

            <div className='upload-page__progress-container'>
                { slide === undefined 
                    ? '' 
                    : <FileProgress 
                            className='progress-container__progress' 
                            file={slide} 
                            progress={slideProgress}/> }
                { video === undefined
                    ? '' 
                    : <FileProgress 
                            className='progress-container__progress' 
                            file={video} 
                            progress={videoProgress}/> }
            </div>
            
            <>
                <input 
                    className='upload-page__title-input' 
                    type='text' 
                    onChange = {handleTitle} 
                    name='Title' 
                    placeholder='Please enter a title for your video here!'/>
                <Link 
                    className='upload-page__submit' 
                    to='/uploaded/1' 
                    type='submit'
                    onClick = {() => onSubmit(title, video, slide)}>Submit</Link>
            </>
        </div>
    </div>);
}

export default UploadPage;