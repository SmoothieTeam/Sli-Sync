import { useEffect, useState } from "react";
import SharePanelCategory from "./share_panel_category";

const useSharePanelInput = (category, link) => {
  const [text, setText] = useState("");
  const handleSharePanelInputChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText("");
  }, [category]);

  return {
    text: category === SharePanelCategory.url ? link : text,
    readOnly: category === SharePanelCategory.url,
    handleSharePanelInputChange
  };
};

export {
  useSharePanelInput
};