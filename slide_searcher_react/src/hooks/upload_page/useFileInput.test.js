import { useFileInput } from "./useFileInput";
import { renderHook, act } from "@testing-library/react-hooks";

function fakeReplaceFile(progresses = [], isCompleted = false) {
  const replaceFile = (_id, _oldFile, _newFile, onProgress, onComplete) => {
    progresses.map((progress) => onProgress(progress));
    if (isCompleted) onComplete();
  };

  return replaceFile;
}

test("useFileInput should use replaceFile when upload", () => {
  const id = "id";
  const initialFile = undefined;
  const file = "file";
  const replaceFile = jest.fn();
  const { result } = renderHook(() => useFileInput(id, { replaceFile }));

  act(() => {
    result.current.upload(file);
  });

  expect(replaceFile).toBeCalled();
  expect(replaceFile).toBeCalledWith(id, initialFile, file, expect.anything(), expect.anything());
});

test("usefileInput should replace file using replaceFile when upload is called", () => {
  const id = "id";
  const initialFile = undefined;
  const firstFile = "first file";
  const secondFile = "second file";
  const replaceFile = jest.fn();
  const { result } = renderHook(() => useFileInput(id, { replaceFile }));

  act(() => {
    result.current.upload(firstFile);
    result.current.upload(secondFile);
  });

  expect(replaceFile).toBeCalledTimes(2);
  expect(replaceFile).toBeCalledWith(id, initialFile, firstFile, expect.anything(), expect.anything());
  expect(replaceFile).toBeCalledWith(id, firstFile, secondFile, expect.anything(), expect.anything());
});

test("useFileInput should have correct uploading state when upload is not completed.", () => {
  const id = "id";
  const file = {};
  const progresses = Array(10)
    .fill()
    .map(() => Math.random());
  const maxProgress = Math.max(...progresses);
  const replaceFile = fakeReplaceFile(progresses);
  const { result } = renderHook(() => useFileInput(id, { replaceFile }));

  act(() => {
    result.current.upload(file);
  });

  expect(result.current.progress).toBe(maxProgress);
  expect(result.current.isUploading()).toBe(true);
  expect(result.current.isUploaded).toBe(false);
});

test("useFileInput should have correct uploaded state when upload is completed.", () => {
  const id = "id";
  const file = {};
  const finishedProgress = 1;
  const replaceFile = fakeReplaceFile([], true);
  const { result } = renderHook(() => useFileInput(id, { replaceFile }));

  act(() => {
    result.current.upload(file);
  });

  expect(result.current.progress).toBe(finishedProgress);
  expect(result.current.isUploading()).toBe(false);
  expect(result.current.isUploaded).toBe(true);
});
