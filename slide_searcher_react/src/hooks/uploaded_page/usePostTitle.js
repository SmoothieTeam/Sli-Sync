import { useEffect, useState } from "react";

const usePostTitle = (postId, postStatusAPI) => {
  const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    postStatusAPI.getPostTitle(postId).then(setPostTitle);
  }, []);

  return {
    postTitle
  };
};

export { usePostTitle };