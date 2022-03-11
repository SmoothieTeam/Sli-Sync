import React from "react";

import "./SlideIndex.css";

function timeToString(timeInSecond) {
  return parseInt(timeInSecond / 60) + ":" + parseInt(timeInSecond % 60);
}

function TimelineEntry({ index, checkedTimeline, onChange }) {
  const { time, checked } = checkedTimeline;
  const timeString = timeToString(time);
  return (
    <div className="slide-index">
      <input
        type="radio"
        name="slide_index_group"
        value={index}
        id={`slideIndex${index}`}
        checked={checked}
      />
      <label htmlFor={`slideIndex${index}`} onClick={() => onChange(index)}>
        <div className="slide-index__index">{index}</div>
        <div className="slide-index__time">{timeString}</div>
      </label>
    </div>
  );
}

function TimelineList({ checkedTimelines, onChange }) {
  return (
    <div>
      {checkedTimelines.map((checkedTimeline, index) =>
        TimelineEntry({
          checkedTimeline,
          index,
          onChange: onChange,
        })
      )}
    </div>
  );
}

export default TimelineList;
