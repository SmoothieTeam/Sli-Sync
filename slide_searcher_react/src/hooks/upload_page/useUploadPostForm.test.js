import { useUploadPostForm } from "./useUploadPostForm";
import { renderHook, act } from "@testing-library/react-hooks";

const mockPostAPI = (postId) => {
  const createPost = jest.fn();
  const newPostId = jest.fn(() => postId);
  const replaceFile = jest.fn();
  const mockPostAPI = { newPostId, createPost, replaceFile };

  return mockPostAPI;
};

describe('useUploadPostForm', () => {
  const postId = "post-id";
  let postAPI;

  beforeEach(() => {
    postAPI = mockPostAPI(postId);
  });

  test("cannot submit if post files are not uploaded and title is not empty", () => {
    const isUploaded = false;
    const title = "title";
    const { result } = renderHook(() => useUploadPostForm(postAPI, {postId, isUploaded, title}));

    act(() => {
      result.current.handleSubmit();
    });

    expect(postAPI.createPost).not.toBeCalled();
  });

  test("can submit if post files are uploaded and title is not empty", () => {
    const isUploaded = true;
    const title = "title";
    const { result } = renderHook(() => useUploadPostForm(postAPI, {postId, isUploaded, title}));

    act(() => {
      result.current.handleSubmit();
    });

    expect(postAPI.createPost).toBeCalled();
  });
});