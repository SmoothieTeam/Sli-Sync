import React from 'react';

import './SlideIndex.css';

function timeToString(timeInSecond) {
    return parseInt(timeInSecond / 60) + ':' + parseInt(timeInSecond % 60);
}

function SlideIndex({className, index, time, onClick, checked}) {
    return (<div className={className}>
        <input 
            className='slide_index_group' 
            type="radio" 
            name='slide_index_group' 
            value={index} 
            id={`slide_index_input_${index}`} 
            checked={checked}/>
        <label 
            className='slide_index_input_label' 
            htmlFor={`slide_index_input_${index}`} 
            onClick={() => onClick(index)}>
            <div className='index_container'>{index}</div>
            <div className='timing_container'>{timeToString(time)}</div>
        </label>
    </div>);
}

function SlideIndexList({className, times, onClick, selected}) {
    return (<div>
        {times.map((time, index) => SlideIndex({
            className: className, 
            time: time,
            index: index, 
            onClick: onClick,
            checked: selected === index
        }))}
    </div>);
}

export default SlideIndexList;