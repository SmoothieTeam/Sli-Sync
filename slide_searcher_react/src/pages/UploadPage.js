import React from 'react';
import { Link } from 'react-router-dom';
import FileProgress from '../components/FileProgress';
import HeaderBar from '../components/HeaderBar';
import UploadFileInput from '../components/UploadFileInput';
import './UploadPage.css';

function UploadPage({ onSubmit }) {
    let title = "";
    let video = undefined;
    let slide = undefined;
    
    const handleTitle = (e) => {
        title = e.target.value;
    }
    const handleVideo = (e) => {
        video = e;
    }
    const handleSlide = (e) => {
        slide = e.target.files[0];
    }

    return (<div>
        <HeaderBar/>

        <h2>UPLOAD FILES</h2>
        <p>MP4, PDF are supported</p>

        <div>
            <UploadFileInput className='upload_file_input' text='Select Video' accept='video/*' onChangeFile={handleVideo}/>
            <UploadFileInput className='upload_file_input' text='Select PDF' accept='.pdf,.ppt,.pptx' onChangeFile={handleSlide}/>
        </div>

        <div>
            <FileProgress className='pdf_progress'/>
            <FileProgress className='video_progress'/>
        </div>

        <input className='title_input' type="text" onChange = {handleTitle} name="Title" placeholder='Please enter a title for your video here!'/>
        <Link className='submit_button' to="/view/1" type="submit" onClick = {() => onSubmit(title, video, slide)}>Submit</Link>
    </div>);
}

export default UploadPage;