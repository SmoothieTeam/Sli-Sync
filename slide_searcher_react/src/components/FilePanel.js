import React, { useState } from 'react';

function FilePanel() {
    const [video, setVideo] = useState();
    const [slide, setSlide] = useState();

    const handleVideo = (e) => {
        setVideo(e.target.files[0]);
    }
    const handleSlide = (e) => {
        setSlide(e.target.files[0]);
    }
    const handleSubmit = () => {
        // TODO handle submit
    }

    return (<div>
        <input type="file" accept="video/*" onChange = {handleVideo} name="Video File"/>
        <input type="file" accept=".pdf,.ppt,.pptx" onChange = {handleSlide} name="Slide File"/>
        <button type="submit" onClick = {handleSubmit}>Submit</button>
    </div>);
}

export default FilePanel;