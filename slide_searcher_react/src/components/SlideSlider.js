import React from "react";
import './SlideSlider.css';

function SlideImage({index, src, onClick, checked}) {
    return (<div>
        <input 
            className='slide_image_group' 
            type="radio" 
            name='slide_image_group' 
            value={index} 
            id={`slide_image_index_${index}`} 
            checked={checked}/>
        <label 
            className='slide_image_input_label' 
            htmlFor={`slide_image_index_${index}`} 
            onClick={() => onClick(index)}>
            <img className='slide_image' src={src}/>
        </label>
    </div>);
}

function SlideSlider({ className, srcs, selected, onSlideClick }) {
    return (<div className={className}>
        <div className='slide_image_container'>
            { srcs.map((src, index) => 
                <SlideImage 
                    index={index} 
                    src={src} 
                    onClick={onSlideClick}
                    checked={index === selected}/>) }
        </div>

        {/* <div className='slide_image_paging'>
            <img className='previous' src='chevron_left.svg' onClick={() => {}}/>
            <span className='page_text'>1 / 20</span>
            <img className='next' src='chevron_right.svg' onClick={() => {}}/>
        </div> */}
    </div>);
}

export default SlideSlider;