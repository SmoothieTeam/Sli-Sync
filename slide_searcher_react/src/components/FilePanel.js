import React, { useState } from 'react';

function FilePanel({ onSubmit }) {
    const [video, setVideo] = useState();
    const [slide, setSlide] = useState();

    const handleVideo = (e) => {
        setVideo(e.target.files[0]);
    }
    const handleSlide = (e) => {
        setSlide(e.target.files[0]);
    }

    return (<div>
        <input type="file" accept="video/*" onChange = {handleVideo} name="Video File"/>
        <input type="file" accept=".pdf,.ppt,.pptx" onChange = {handleSlide} name="Slide File"/>
        <button type="submit" onClick = {() => onSubmit(video, slide)}>Submit</button>
    </div>);
}

export default FilePanel;