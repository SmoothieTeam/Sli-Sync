import SharePanelCategory from "./share_panel_category";

const useSharePanelTexts = (category) => {
  const texts = {};
  texts[SharePanelCategory.url] = {
    submitText: "Copy link to share",
    popupText: "Link Copyed!"
  };
  texts[SharePanelCategory.email] = {
    submitText: "Send Email",
    popupText: "Email Sended!"
  };

  return texts[category];
};

export {
  useSharePanelTexts
};