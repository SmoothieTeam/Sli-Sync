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
    title: postTitle,
    video: {
      url: 'video.mp4'
    },
    timelines: [
      {
        time: 5,
        url: '1.png',
      },
      {
        time: 10,
        url: '2.png',
      },
      {
        time: 20,
        url: '3.png',
      }
    ],
  };
};

const spyPlayer = () => {
  const seekTo = jest.fn();
  const player = { current: { seekTo }};
  
  jest.spyOn(React, 'useRef').mockReturnValue(player);
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

  test('fetches the post result from postDownloader.', async () => {
    const { waitForNextUpdate } = renderHook(() => useVideoViewPage(postId, postResultAPI));
    
    await waitForNextUpdate();

    expect(postResultAPI.getPostResult).toHaveBeenCalledWith(postId);
  });

  test('returns videoControl with the url of postResult', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useVideoViewPage(postId, postResultAPI));
    
    await waitForNextUpdate();

    expect(result.current.videoControl.player).toBe(player);
    expect(result.current.videoControl.src).toBe(postResult.video.url);
  });
  
  test('returns timeline and seeks to its time as an index is given.', async () => {
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