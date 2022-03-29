import { useEffect, useState } from "react";

const usePostId = (postAPI) => {
  const [postId, setPostId] = useState();

  useEffect(() => {
    setPostId(postAPI.newPostId());
  }, []);

  return { postId };
};

export { usePostId };