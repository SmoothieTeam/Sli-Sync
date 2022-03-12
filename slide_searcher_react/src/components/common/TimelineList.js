import React from "react";

import "./TimelineList.css";

const timelineToTimeString = (timeline) => {
  const time = timeline.time;
  const minute = Math.floor(time / 60).toString().padStart(2, '0');
  const second = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};

function TimelineEntry({ index, checkedTimeline, onClick }) {
  const timeString = timelineToTimeString(checkedTimeline);
  return (
    <li className="slide-index" key={index}>
      <input
        type="radio"
        name="slide_index_group"
        value={index}
        id={`slideIndex${index}`}
        defaultChecked={checkedTimeline.checked}
      />
      <label htmlFor={`slideIndex${index}`} onClick={() => onClick(index)}>
        <div className="slide-index__index">{index}</div>
        <div className="slide-index__time">{timeString}</div>
      </label>
    </li>
  );
}

function TimelineList({ checkedTimelines, onClickTimeline }) {
  return (
    <ol>
      {checkedTimelines.map((checkedTimeline, index) => (
        <TimelineEntry
          index={index}
          checkedTimeline={checkedTimeline}
          onClick={onClickTimeline}
        />
      ))}
    </ol>
  );
}

export default TimelineList;
