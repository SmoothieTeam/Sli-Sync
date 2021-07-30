import React, { useState } from 'react';

function FilePanel() {
    const [video, setVideo] = useState();
    const [slide, setSlide] = useState();

    const handleVideo = (e) => {setVideo(e.target.files[0]);}
    const handleSlide = (e) => {setSlide(e.target.files[0]);}
    const handleSubmit = () => { console.log(video); console.log(slide);}

    return (<div>
        <p>hi</p>
        <input type="file" onClick = {handleVideo} name="Video File"/>
        <input type="file" onClick = {handleSlide} name="Slide File"/>
        <button type="submit" onClick = {handleSubmit}>Submit</button>
    </div>);
}

export default FilePanel;