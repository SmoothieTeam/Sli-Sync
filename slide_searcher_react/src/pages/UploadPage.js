import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FileProgress from '../components/FileProgress';
import HeaderBar from '../components/HeaderBar';
import UploadFileInput from '../components/UploadFileInput';
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

    return (<div>
        <HeaderBar/>

        <h2>UPLOAD FILES</h2>
        <p>MP4, PDF are supported</p>

        <div>
            <UploadFileInput className='upload_file_input' id='upload_video_input' text='Select Video' accept='video/*' onChangeFile={handleVideo}/>
            <UploadFileInput className='upload_file_input' id='upload_pdf_input' text='Select PDF' accept='.pdf' onChangeFile={handleSlide}/>
        </div>

        <div className='progres_container'>
            { slide === undefined ? '' : <FileProgress className='pdf_progress' file={slide} progress={slideProgress}/> }
            { video === undefined ? '' : <FileProgress className='video_progress' file={video} progress={videoProgress}/> }
        </div>

        <input className='title_input' type="text" onChange = {handleTitle} name="Title" placeholder='Please enter a title for your video here!'/>
        <Link className='submit_button' to="/view/1" type="submit" onClick = {() => onSubmit(title, video, slide)}>Submit</Link>
    </div>);
}

export default UploadPage;