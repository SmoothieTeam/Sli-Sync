import React from "react";
import "./SlideNavigation.css";
import "./SlideImage.css";

function SlideImage({ index, src, onClick, checked }) {
  return (
    <div className="slide-image">
      <input
        type="radio"
        name="slide_image_group"
        value={index}
        id={`slideImage${index}`}
        checked={checked}
      />
      <label htmlFor={`slideImage${index}`} onClick={() => onClick(index)}>
        <img src={src} />
      </label>
    </div>
  );
}

function SlideNavigation({ className, checkedTimelines, onClickSlide }) {
  const length = srcs.length;
  const current = selected + 1;
  const onNext = () => {
    onClickSlide(Math.min(selected + 1, length - 1));
  };
  const onPrev = () => {
    onClickSlide(Math.max(selected - 1, 0));
  };

  return (
    <div className={`slide-nav ${className}`}>
      <div className="slide-nav__slide-image-container">
        {checkedTimelines.map((timeline, index) => (
          <SlideImage
            index={index}
            src={timeline.url}
            onClick={onClickSlide}
            checked={timeline.checked}
          />
        ))}
      </div>

      <div className="slide-nav__navigation">
        <img src="chevron_left.svg" onClick={onPrev} />
        <div className="slide-nav__current">
          {current} / {length}
        </div>
        <img src="chevron_right.svg" onClick={onNext} />
      </div>
    </div>
  );
}

export default SlideNavigation;
