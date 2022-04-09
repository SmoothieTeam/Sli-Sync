import { useState } from "react";
import { useClipboard } from "../useClipboard";
import { useEmail } from "../useEmail";
import SharePanelCategory from "./share_panel_category";

const usePopupEvent = () => {
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const showPopup = () => {
    setIsShowingPopup(true);
    setTimeout(() => {
      setIsShowingPopup(false);
    }, 500);
  };

  return {
    isShowingPopup,
    showPopup
  };
};

const useSharePanelSubmit = (category, sharePanelInput, title, link) => {
  const { isShowingPopup, showPopup } = usePopupEvent();
  const { copyToClipboard } = useClipboard();
  const { sendEmail } = useEmail(title, link);
  const submitEvents = {};
  const handleSubmit = () => {
    showPopup();
    submitEvents[category]();
  };
  submitEvents[SharePanelCategory.url] = () => copyToClipboard(sharePanelInput);
  submitEvents[SharePanelCategory.email] = () => sendEmail(sharePanelInput);

  return {
    isShowingPopup,
    handleSubmit
  };
};

export {
  useSharePanelSubmit
};