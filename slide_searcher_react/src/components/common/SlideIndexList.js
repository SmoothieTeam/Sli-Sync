import React from "react";

import "./SlideIndex.css";

function timeToString(timeInSecond) {
  return parseInt(timeInSecond / 60) + ":" + parseInt(timeInSecond % 60);
}

function SlideIndex({ index, time, onClick, checked }) {
  return (
    <div className="slide-index">
      <input
        type="radio"
        name="slide_index_group"
        value={index}
        id={`slideIndex${index}`}
        checked={checked}
      />
      <label htmlFor={`slideIndex${index}`} onClick={() => onClick(index)}>
        <div className="slide-index__index">{index}</div>
        <div className="slide-index__time">{timeToString(time)}</div>
      </label>
    </div>
  );
}

function SlideIndexList({ className, times, onClick, selected }) {
  return (
    <div className={className}>
      {times.map((time, index) =>
        SlideIndex({
          time: time,
          index: index,
          onClick: onClick,
          checked: selected === index,
        })
      )}
    </div>
  );
}

export default SlideIndexList;
