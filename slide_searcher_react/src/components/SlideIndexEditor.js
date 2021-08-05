import React, { useEffect, useState } from 'react';

function parseTime(timeInSecond) {
    return {
        minute: parseInt(timeInSecond / 60),
        second: parseInt(timeInSecond % 60)
    };
}

function toTime({minute, second}) {
    return minute * 60 + second;
}

function timeToString({minute, second}) {
    return minute + ':' + second;
}

function SlideIndexEditPanel({currentTime: {minute, second}, onChange}) {
    const handleChangeMinute = (e) => {
        const minute = parseInt(e.target.value);
        onChange({minute, second});
    };
    const handleChangeSecond = (e) => {
        const second = parseInt(e.target.value);
        onChange({minute, second});
    };

    return (<div>
        <input type='number' min={0} defaultValue={minute} onChange={handleChangeMinute}/> : <input type='number' min={0} max={59} defaultValue={second} onChange={handleChangeSecond}/>
    </div>);
}

function SlideIndexEditor({slideIndex: {index, time}, onSeek, onChange}) {
    const currentTime = parseTime(time);
    const handleChangeTime = (t) => {
        console.log(t);
        onChange(toTime(t));
    };

    return (<div>
        {index}: <button onClick={() => onSeek(toTime(currentTime))}>{timeToString(currentTime)}</button>
        <SlideIndexEditPanel currentTime={currentTime} onChange={handleChangeTime}/>
    </div>);
}

export default SlideIndexEditor;