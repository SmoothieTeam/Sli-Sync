import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { usePostTitle } from "./usePostTitle";

const fakePostStatusAPI = (title) => {
  const getPostTitle = jest.fn(async (_) => title);

  return {
    getPostTitle,
  };
};

describe("usePostTitle", () => {
  let postStatusAPI;
  let postId = "post-id";
  let postTitle = "post-title";

  beforeEach(() => {
    postStatusAPI = fakePostStatusAPI(postTitle);
  });

  test("get the title of the post using postStatusAPI", async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePostTitle(postId, postStatusAPI));

    await act(async () => await waitForNextUpdate());

    expect(postStatusAPI.getPostTitle).toBeCalledTimes(1);
    expect(postStatusAPI.getPostTitle).toBeCalledWith(postId);
    expect(result.current.postTitle).toBe(postTitle);
  });
});