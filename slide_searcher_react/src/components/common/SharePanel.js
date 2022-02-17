import React, { useState } from "react";
import "./SharePanel.css";

function SharePanel({ className, title, link, sendEmail, copyLink }) {
  const [category, setCategory] = useState("url");
  const [showPopup, setShowPopup] = useState(false);

  const submitTexts = {
    url: "Copy link to share",
    email: "Send Email",
  };

  const popupTexts = {
    url: "Link Copyed!",
    email: "Email Sended!",
  };

  const submitEvents = {
    url: copyLink,
    email: sendEmail,
  };

  const showPopupEvent = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 500);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onClick = () => {
    showPopupEvent();
    submitEvents[category]();
  };

  const isCheckedInCategory = (v) => {
    return category === v;
  };

  return (
    <div className={`share-panel ${className}`}>
      <input
        id="sharePanelUrlRadio"
        type="radio"
        className="share-panel__category-button category-button--url"
        name="category"
        value="url"
        onChange={onCategoryChange}
        checked={isCheckedInCategory("url")}
      />
      <label htmlFor="sharePanelUrlRadio">URL</label>
      <input
        id="sharePanelEmailRadio"
        type="radio"
        className="share-panel__category-button category-button--email"
        name="category"
        value="email"
        onChange={onCategoryChange}
        checked={isCheckedInCategory("email")}
      />
      <label htmlFor="sharePanelEmailRadio">Email</label>

      <h1>{title}</h1>
      <hr className="share-panel__divider"></hr>

      <div className="share-panel__input-container">
        <input
          className="share-panel__link-input"
          type="text"
          value={category === "url" ? link : undefined}
        />
        <div className="share-panel__submit-container">
          {showPopup ? (
            <div className="share-panel__popup">{popupTexts[category]}</div>
          ) : (
            <div></div>
          )}
          <button
            className={`share-panel__submit share-panel__submit--${category}`}
            type="submit"
            onClick={onClick}
          >
            {submitTexts[category]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharePanel;
