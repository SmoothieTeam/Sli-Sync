import { useFileInput } from "./useFileInput";
import { renderHook, act } from "@testing-library/react-hooks";
import "jest";

function mockReplaceFile() {
  const replaceFile = jest.fn();
  
  replaceFile.calls = () => replaceFile.mock.calls.length;
  replaceFile.calledId = (call) => replaceFile.mock.calls[call][0];
  replaceFile.calledOldFile = (call) => replaceFile.mock.calls[call][1];
  replaceFile.calledNewFile = (call) => replaceFile.mock.calls[call][2];
  return replaceFile;
}

function fakeReplaceFile(progresses = [], isCompleted = false) {
  const replaceFile = (_id, _oldFile, _newFile, onProgress, onComplete) => {
    progresses.map((progress) => onProgress(progress));
    if(isCompleted) onComplete();
  };

  return replaceFile;
}

test("useFileInput should use replaceFile when upload", () => {
  const id = "id";
  const file = {};
  const replaceFile = mockReplaceFile();
  const { result } = renderHook(() => useFileInput(id, {replaceFile}));

  act(() => {
    result.current.upload(file);
  });

  expect(replaceFile.calls()).toBe(1);
  expect(replaceFile.calledId(0)).toBe(id);
  expect(replaceFile.calledNewFile(0)).toBe(file);
});

test("useFileInput should have correct uploading state when upload is not completed.", () => {
  const id = "id";
  const file = {};
  const progresses = Array(10).fill().map(() => Math.random());
  const maxProgress = Math.max(...progresses);
  const replaceFile = fakeReplaceFile(progresses);
  const { result } = renderHook(() => useFileInput(id, {replaceFile}));

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
  const { result } = renderHook(() => useFileInput(id, {replaceFile}));

  act(() => {
    result.current.upload(file);
  });

  expect(result.current.progress).toBe(finishedProgress);
  expect(result.current.isUploading()).toBe(false);
  expect(result.current.isUploaded).toBe(true);
});