import { useEffect, useRef, useState } from "react";

const usePostResult = (postId, postResultAPI) => {
  const [postResult, setPostResult] = useState();
  useEffect(() => {
    postResultAPI.getPostResult(postId).then(setPostResult);
  }, []);

  return {
    postResult
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
  const { postResult } = usePostResult(postId, postResultAPI);
  const { seekTo, videoControl } = useVideoControl();
  const { currentTimelineIndex, setCurrentTimelineIndex: setTimelineIndex } = useCurrentTimelineIndex(postResult);
  const setCurrentTimelineIndex = (index) => {
    setTimelineIndex(index);
    seekTo(Math.floor(postResult?.timelines[index].time ?? 0));
  };

  return {
    title: postResult?.title ?? "",
    setCurrentTimelineIndex,
    videoControl,
    ...checkedTimelines(currentTimelineIndex, postResult),
  };
};

export { useVideoViewPage };