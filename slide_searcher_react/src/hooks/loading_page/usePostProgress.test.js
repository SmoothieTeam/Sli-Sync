import { renderHook } from "@testing-library/react-hooks";
import { usePostProgress } from "./usePostProgress";

const fakePostStatusAPI = (progress) => {
  const observeProgress = jest.fn((_, cb) => cb(progress));

  return {
    observeProgress,
  };
};

describe("usePostProgress", () => {
  let postId = "post-id";

  test("get progress from postStatusAPI", () => {
    const progress = Math.random();
    const postStatusAPI = fakePostStatusAPI(progress);
    const progressInPercent = Math.round(progress * 100);
    const { result } = renderHook(() => usePostProgress(postId, postStatusAPI));

    expect(postStatusAPI.observeProgress).toBeCalledTimes(1);
    expect(postStatusAPI.observeProgress).toBeCalledWith(postId, expect.anything());
    expect(result.current.progressInPercent).toBe(progressInPercent);
  });

  test("isProgressed is true if progress is equal to 1", () => {
    const progress = 1;
    const postStatusAPI = fakePostStatusAPI(progress);
    const { result } = renderHook(() => usePostProgress(postId, postStatusAPI));

    expect(result.current.isProgressed).toBe(true);
  });
});
