import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { act } from "react-dom/test-utils";
import { useVideoViewPage } from "./useVideoViewPage";

const mockPostResultAPI = (postResult) => {
  const getPostResult = jest.fn(async () => postResult);
  const postResultAPI = { getPostResult };

  return postResultAPI;
};

const postResultDummy = (postTitle) => {
  return {
    postTitle,
    video: {
      url: 'video.mp4'
    },
    timelines: [
      {
        slideNumber: 1,
        time: 5,
        url: '1.png',
      },
      {
        slideNumber: 2,
        time: 10,
        url: '2.png',
      },
      {
        slideNumber: 3,
        time: 20,
        url: '3.png',
      }
    ],
  };
};

const spyPlayer = () => {
  const seekTo = jest.fn();
  const player = { current: { seekTo }};
  
  jest.spyOn(React, 'useRef').mockReturnValue({ current: { seekTo }});
  return player;
};

const randomTimelineIndex = () => Math.floor(Math.random() * 3);

describe('useVideoViewPage', () => {
  let postId;
  let postTitle;
  let postResult;
  let postResultAPI;
  let player;

  beforeEach(() => {
    postId = "post-id";
    postTitle = "title";
    postResult = postResultDummy(postTitle);
    postResultAPI = mockPostResultAPI(postResult);
    player = spyPlayer();
  });

  test('useVideoViewPage gets the post result from postDownloader.', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useVideoViewPage(postId, postResultAPI));
    
    await waitForNextUpdate();

    expect(postResultAPI.getPostResult).toHaveBeenCalledWith(postId);
    expect(result.current.postResult).toBe(postResult);
  });
  
  test('useVideoViewPage checks timeline and seekTo its time as an index is given.', async () => {
    const currentTimelineIndex = randomTimelineIndex();
    const { result, waitForNextUpdate } = renderHook(() => useVideoViewPage(postId, postResultAPI));
    
    await waitForNextUpdate();
    act(() => {
      result.current.setCurrentTimelineIndex(currentTimelineIndex);
    });
  
    expect(result.current.checkedTimelines[currentTimelineIndex].checked).toBe(true);
    expect(player.current.seekTo).toBeCalledWith(postResult.timelines[currentTimelineIndex].time, "seconds");
  });
});