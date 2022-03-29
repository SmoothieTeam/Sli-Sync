import { useEffect, useState } from "react"

const usePostProgress = (postId, postStatusAPI) => {
  const [progress, setProgress] = useState(0);
  const isProgressed = progress === 1;
  const progressInPercent = Math.round(progress * 100);
  
  useEffect(() => {
    postStatusAPI.observeProgress(postId, setProgress);
  }, []);

  return {
    progressInPercent,
    isProgressed,
  };
};

export { usePostProgress };