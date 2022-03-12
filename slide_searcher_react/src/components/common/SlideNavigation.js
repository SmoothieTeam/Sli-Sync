import React from "react";
import "./SlideNavigation.css";
import "./SlideImage.css";

function SlideImageEntry({ index, checkedTimeline, onChange }) {
  const { url, checked } = checkedTimeline;

  return (
    <li aria-label={`slide-image-${index}`} className="slide-image" key={index}>
      <input
        type="radio"
        name="slide_image_group"
        value={index}
        id={`slideImage${index}`}
        defaultChecked={checked}
        onChange={(e) => onChange(parseInt(e.currentTarget.value))}
      />
      <label htmlFor={`slideImage${index}`}>
        <img src={url}/>
      </label>
    </li>
  );
}

function SlideNavigation({ className, checkedTimelines, onChangeSlide }) {
  const length = checkedTimelines.length;
  const selected = checkedTimelines.findIndex(checkedTimeline => checkedTimeline.checked);
  const current = selected;
  const onNext = () => {
    onChangeSlide(Math.min(selected + 1, length - 1));
  };
  const onPrev = () => {
    onChangeSlide(Math.max(selected - 1, 0));
  };

  return (
    <div className={`slide-nav ${className}`}>
      <ul className="slide-nav__slide-image-container">
        {checkedTimelines.map((checkedTimeline, index) => (
          <SlideImageEntry
            index={index}
            checkedTimeline={checkedTimeline}
            onChange={onChangeSlide}
          />
        ))}
      </ul>

      <div className="slide-nav__navigation">
        <button aria-label="previous-button" onClick={onPrev}>
          <img src="chevron_left.svg"/>
        </button>
        <div className="slide-nav__current">
          {current} / {length}
        </div>
        <button aria-label="next-button" onClick={onNext}>
          <img src="chevron_right.svg"/>
        </button>
      </div>
    </div>
  );
}

export default SlideNavigation;
