import React from "react";
import "./SlideNavigation.css";
import "./SlideImage.css";
import HorizontalList from "./HorizontalList";

function SlideImageEntry({ index, checkedTimeline, onChange }) {
  const { url, checked } = checkedTimeline;

  return (
    <div role="listitem" aria-label={`slide-image-${index}`} className="slide-image">
      <input
        type="radio"
        name="slide_image_group"
        value={index}
        id={`slideImage${index}`}
        checked={checked}
        onChange={(e) => onChange(parseInt(e.currentTarget.value))}
      />
      <label htmlFor={`slideImage${index}`}>
        <img src={url}/>
      </label>
    </div>
  );
}

function SlideNavigation({ className, checkedTimelines, onChangeSlide }) {
  const length = checkedTimelines.length;
  const current = checkedTimelines.findIndex(checkedTimeline => checkedTimeline.checked);
  const onNext = () => {
    onChangeSlide(Math.min(current + 1, length - 1));
  };
  const onPrev = () => {
    onChangeSlide(Math.max(current - 1, 0));
  };

  return (
    <div className={`slide-nav ${className}`}>
      <HorizontalList className="slide-nav__slide-image-container">
        {checkedTimelines.map((checkedTimeline, index) => (
          <SlideImageEntry
            key={index}
            index={index}
            checkedTimeline={checkedTimeline}
            onChange={onChangeSlide}
          />
        ))}
      </HorizontalList>

      <div className="slide-nav__navigation">
        <div role="button" aria-label="previous-button" onClick={onPrev}>
          <img src="/chevron_left.svg"/>
        </div>
        <div className="slide-nav__current">
          {current+1} / {length}
        </div>
        <div role="button" aria-label="next-button" onClick={onNext}>
          <img src="/chevron_right.svg"/>
        </div>
      </div>
    </div>
  );
}

export default SlideNavigation;
