import React from "react";
import './SlideSlider.css';

function SlideSlider({ className, slideSrcs }) {
    return (<div className={className}>
        <div className='slide_image_container'>
            { slideSrcs.map((src) => <img className='slide_image' src={src}/>) }
        </div>

        <div className='slide_image_paging'>
            <img className='previous' src='chevron_left.svg' onClick={() => {}}/>
            1 / 20
            <img className='next' src='chevron_right.svg' onClick={() => {}}/>
        </div>
    </div>);
}

export default SlideSlider;