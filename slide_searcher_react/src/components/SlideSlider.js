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
    const length = srcs.length;
    const current = selected + 1;
    const onClickNext = () => {
        onSlideClick(Math.min(selected + 1, length - 1));
    };
    const onClickPrev = () => {
        onSlideClick(Math.max(selected - 1, 0));
    };

    return (<div className={className}>
        <div className='slide_image_container'>
            { srcs.map((src, index) => 
                <SlideImage 
                    index={index} 
                    src={src} 
                    onClick={onSlideClick}
                    checked={index === selected}/>) }
        </div>

        <div className='slide_image_paging'>
            <img className='previous' src='chevron_left.svg' onClick={onClickPrev}/>
            <div className='page_text'>{current} / {length}</div>
            <img className='next' src='chevron_right.svg' onClick={onClickNext}/>
        </div>
    </div>);
}

export default SlideSlider;