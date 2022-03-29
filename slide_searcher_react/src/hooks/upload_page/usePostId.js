import { useEffect, useState } from "react";

const usePostId = (postCreateAPI) => {
  const [postId, setPostId] = useState();

  useEffect(() => {
    setPostId(postCreateAPI.newPostId());
  }, []);

  return { postId };
};

export { usePostId };