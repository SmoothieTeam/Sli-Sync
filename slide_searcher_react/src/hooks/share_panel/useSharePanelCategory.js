import { useState } from "react";
import SharePanelCategory from "./share_panel_category";

const useSharePanelCategory = () => {
  const [category, setCategory] = useState(SharePanelCategory.url);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return {
    category,
    isUrlCategory: category === SharePanelCategory.url,
    isEmailCategory: category === SharePanelCategory.email,
    handleCategoryChange
  };
};

export {
  useSharePanelCategory
};