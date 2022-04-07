import { useState } from "react"

const usePostTitleInput = () => {
  const [title, setTitle] = useState("");
  
  return {
    title,
    handleTitleChanged: setTitle,
  };
};

export { usePostTitleInput };