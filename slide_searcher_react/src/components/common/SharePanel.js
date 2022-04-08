import React from "react";
import SharePanelCategory from "../../hooks/share_panel/share_panel_category";
import { useSharePanelCategory } from "../../hooks/share_panel/useSharePanelCategory";
import { useSharePanelInput } from "../../hooks/share_panel/useSharePanelInput";
import { useSharePanelSubmit } from "../../hooks/share_panel/useSharePanelSubmit";
import { useSharePanelTexts } from "../../hooks/share_panel/useSharePanelTexts";
import "./SharePanel.css";

function SharePanel({ className, title, link }) {
  const {
    category,
    handleCategoryChange,
    isEmailCategory,
    isUrlCategory
  } = useSharePanelCategory();
  const {
    popupText,
    submitText
  } = useSharePanelTexts(category)
  const {
    text,
    readOnly,
    handleSharePanelInputChange
  } = useSharePanelInput(category, link);
  const {
    isShowingPopup,
    handleSubmit
  } = useSharePanelSubmit(category, text, title, link);

  return (
    <div className={`share-panel ${className}`}>
      <input
        id="sharePanelUrlRadio"
        type="radio"
        className="share-panel__category-button category-button--url"
        name="category"
        value={SharePanelCategory.url}
        onChange={handleCategoryChange}
        checked={isUrlCategory}
      />
      <label htmlFor="sharePanelUrlRadio">URL</label>
      <input
        id="sharePanelEmailRadio"
        type="radio"
        className="share-panel__category-button category-button--email"
        name="category"
        value={SharePanelCategory.email}
        onChange={handleCategoryChange}
        checked={isEmailCategory}
      />
      <label htmlFor="sharePanelEmailRadio">Email</label>

      <h1>{title}</h1>
      <hr className="share-panel__divider"></hr>

      <div className="share-panel__input-container">
        <input
          className="share-panel__link-input"
          type="text"
          value={text}
          readOnly={readOnly}
          onChange={handleSharePanelInputChange}
        />
        <div className="share-panel__submit-container">
          {isShowingPopup ? (
            <div className="share-panel__popup">{popupText}</div>
          ) : (
            <div></div>
          )}
          <button
            className={`share-panel__submit share-panel__submit--${category}`}
            type="submit"
            onClick={handleSubmit}
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharePanel;
