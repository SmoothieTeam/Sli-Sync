import React from 'react';

function timeToString(timeInSecond) {
    return parseInt(timeInSecond / 60) + ':' + parseInt(timeInSecond % 60);
}

function SlideIndex({slideIndex: {index, time}, onSeek}) {
    return (<div>
        {index}: <button onClick={() => onSeek(time)}>{timeToString(time)}</button>
    </div>);
}

export default SlideIndex;