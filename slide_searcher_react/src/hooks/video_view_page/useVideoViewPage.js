import { useEffect, useRef, useState } from "react";

const usePostResult = (postId, postResultAPI) => {
  const [postResult, setPostResult] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const getPostResult = async () => {
    let result;
    
    try {
      result = await postResultAPI.getPostResult(postId);
      
      setPostResult(result);
    }
    catch(e) {
      setHasData(false);
    }
    finally {
      setHasData(result !== undefined);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostResult();
  }, []);

  return {
    postResult,
    isLoading,
    hasData
  };
};

const useCurrentTimelineIndex = (postResult) => {
  const maxIndex = postResult?.timelines.length ?? 0;
  const [currentTimelineIndex, setIndex] = useState(0);

  return {
    currentTimelineIndex,
    setCurrentTimelineIndex: index => setIndex(Math.min(index, maxIndex))
  };
}

const checkedTimelines = (currentTimelineIndex, postResult) => {
  const timelines = postResult?.timelines ?? [];
  const checkedTimelines = timelines.map((timeline, index) => ({...timeline, checked: index === currentTimelineIndex}));

  return {
    checkedTimelines
  };
};

const useVideoControl = (postResult) => {
  const player = useRef(null);
  const seekTo = (seconds) => player.current.seekTo(seconds, "seconds");
  
  return {
    seekTo,
    videoControl : {
      player,
      src: postResult?.video.url
    }
  };
};

const useVideoViewPage = (postId, postResultAPI) => {
  const { postResult, isLoading, hasData } = usePostResult(postId, postResultAPI);
  const { seekTo, videoControl } = useVideoControl(postResult);
  const { currentTimelineIndex, setCurrentTimelineIndex: setTimelineIndex } = useCurrentTimelineIndex(postResult);
  const setCurrentTimelineIndex = (index) => {
    setTimelineIndex(index);
    seekTo(Math.floor(postResult?.timelines[index].time ?? 0));
  };

  return {
    title: postResult?.title ?? "",
    isLoading,
    hasData,
    setCurrentTimelineIndex,
    videoControl,
    ...checkedTimelines(currentTimelineIndex, postResult),
  };
};

export { useVideoViewPage };