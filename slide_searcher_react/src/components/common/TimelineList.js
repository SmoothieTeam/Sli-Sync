import React from "react";

import "./TimelineList.css";

const timelineToTimeString = (timeline) => {
  const time = timeline.time;
  const minute = Math.floor(time / 60).toString().padStart(2, '0');
  const second = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};

function TimelineEntry({ index, checkedTimeline, onChange }) {
  const timeString = timelineToTimeString(checkedTimeline);
  return (
    <div role="listitem" className="slide-index">
      <input
        type="radio"
        name="slide_index_group"
        value={index}
        id={`slideIndex${index}`}
        checked={checkedTimeline.checked}
        onChange={(e) => onChange(parseInt(e.currentTarget.value))}
      />
      <label htmlFor={`slideIndex${index}`}>
        <div className="slide-index__index">{index}</div>
        <div className="slide-index__time">{timeString}</div>
      </label>
    </div>
  );
}

function TimelineList({ checkedTimelines, onChangeTimeline }) {
  return (
    <div role="list">
      {checkedTimelines.map((checkedTimeline, index) => (
        <TimelineEntry
          key={index}
          index={index}
          checkedTimeline={checkedTimeline}
          onChange={onChangeTimeline}
        />
      ))}
    </div>
  );
}

export default TimelineList;
