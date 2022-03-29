import { useState } from "react"

const usePostTitle = () => {
  const [title, setTitle] = useState("");
  
  return {
    title,
    handleTitleChanged: setTitle,
  };
};

export { usePostTitle };