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

        <h2 className='upload_title'>UPLOAD FILES</h2>
        <p>MP4, PDF are supported</p>

        <div>
            <TwoColoredFileInput 
                className='upload_file_input' 
                id='upload_video_input' 
                text='Select Video' 
                accept='video/*' 
                onChangeFile={handleVideo}/>
            <TwoColoredFileInput 
                className='upload_file_input' 
                id='upload_pdf_input' 
                text='Select PDF' 
                accept='.pdf' 
                onChangeFile={handleSlide}/>
        </div>

        <div className='progress-container'>
            { slide === undefined 
                ? '' 
                : <FileProgress 
                        className='progress' 
                        file={slide} 
                        progress={slideProgress}/> }
            { video === undefined
                ? '' 
                : <FileProgress 
                        className='progress' 
                        file={video} 
                        progress={videoProgress}/> }
        </div>

        <input 
            className='title_input' 
            type='text' 
            onChange = {handleTitle} 
            name='Title' 
            placeholder='Please enter a title for your video here!'/>
        <Link 
            className='submit_button' 
            to='/uploaded/1' 
            type='submit'
            onClick = {() => onSubmit(title, video, slide)}>Submit</Link>
    </div>);
}

export default UploadPage;