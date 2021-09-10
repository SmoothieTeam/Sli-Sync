import React from 'react';

import './SlideIndex.css';

function timeToString(timeInSecond) {
    return parseInt(timeInSecond / 60) + ':' + parseInt(timeInSecond % 60);
}

function SlideIndex({className, slideIndex: {index, time}, onSeek}) {
    return (<div className={className}>
        <input className='slide_index_group' type="radio" name='slide_index_group' value={index} id={'slide_index_input_' + index}></input>
        <label className='slide_index_input_label' htmlFor={'slide_index_input_' + index} onClick={() => onSeek(time)}>
            <div className='index_container'>{index}</div>
            <div className='timing_container'>{timeToString(time)}</div>
        </label>
    </div>);
}

export default SlideIndex;