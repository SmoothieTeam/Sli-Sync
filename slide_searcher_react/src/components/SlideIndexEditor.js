import React from 'react';

function parseTime(timeInSecond) {
    return {
        minute: parseInt(timeInSecond / 60),
        second: parseInt(timeInSecond % 60)
    };
}

function timeToString(timeInSecond) {
    const {minute, second} = parseTime(timeInSecond);
    return minute + ':' + second;
}

function SlideIndexEditor({slideIndex: {index, time}, onSeek, onChange}) {
    const {minute, second} = parseTime(time);

    return (<div>
        {index}: <button onClick={() => onSeek(time)}>{timeToString(time)}</button>
        <input type='number' min={0} defaultValue={minute} onChange={ e => console.log(e)}/> : <input type='number' min={0} max={59} value={second}/>
    </div>);
}

export default SlideIndexEditor;