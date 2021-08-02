import React, { useState } from 'react';

function UploadPanel({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState();
    const [slide, setSlide] = useState();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleVideo = (e) => {
        setVideo(e.target.files[0]);
    }
    const handleSlide = (e) => {
        setSlide(e.target.files[0]);
    }

    return (<div>
        <input type="text" onChange = {handleTitle} name="Title"/>
        <input type="file" accept="video/*" onChange = {handleVideo} name="Video File"/>
        <input type="file" accept=".pdf,.ppt,.pptx" onChange = {handleSlide} name="Slide File"/>
        <button type="submit" onClick = {() => onSubmit(title, video, slide)}>Submit</button>
    </div>);
}

export default UploadPanel;