import React, { useState } from 'react';

function UploadPanel({ onSubmit }) {
    let title = "";
    let video = undefined;
    let slide = undefined;

    const handleTitle = (e) => {
        title = e.target.value;
    }
    const handleVideo = (e) => {
        video = e.target.files[0];
    }
    const handleSlide = (e) => {
        slide = e.target.files[0];
    }

    return (<div>
        <input type="text" onChange = {handleTitle} name="Title"/>
        <input type="file" accept="video/*" onChange = {handleVideo} name="Video File"/>
        <input type="file" accept=".pdf,.ppt,.pptx" onChange = {handleSlide} name="Slide File"/>
        <button type="submit" onClick = {() => onSubmit(title, video, slide)}>Submit</button>
    </div>);
}

export default UploadPanel;