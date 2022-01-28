import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FileProgress from '../components/FileProgress';
import HeaderBuilder from '../components/HeaderBuilder';
import TwoColoredFileInput from '../components/TwoColoredFileInput';
import './UploadPage.css';

function UploadPage({ onUpload, uploadVideo, uploadSlide }) {
    let title = "";
    const history = useHistory();
    const [video, setVideo] = useState();
    const [videoProgress, setVideoProgress] = useState(0);
    const [slide, setSlide] = useState();
    const [slideProgress, setSlideProgress] = useState(0);
    const handleTitle = e => {
        title = e.target.value;
    };
    const handleVideo = e => {
        setVideo(e);
        uploadVideo(e, setVideoProgress);
    };
    const handleSlide = e => {
        setSlide(e);
        uploadSlide(e, setSlideProgress);
    };
    const onSubmit = async e => {
        e.preventDefault();
        const { id } = await onUpload(title, video, slide);
        history.push(`/uploaded/${id}`);
    };
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
                    type='submit'
                    onClick = {onSubmit}>Submit</Link>
            </>
        </div>
    </div>);
}

export default UploadPage;