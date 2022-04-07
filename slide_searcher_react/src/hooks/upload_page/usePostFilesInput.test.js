import { usePostFilesInput } from "./usePostFilesInput";
import { renderHook, act } from "@testing-library/react-hooks";
import FileProgressStatus from "../../value/file_progress_status";

const fakeReplaceFile = (progresses = [], isCompleted = false) => {
  const replaceFile = jest.fn((_id, _oldFile, _newFile, onProgress, onComplete) => {
    progresses.map((progress) => onProgress(progress));
    if (isCompleted) onComplete();
  });

  return replaceFile;
};

const fakeFile = (filename) => {
  return {name: filename};
};

const fakeProgresses = (file) => {
  const progresses = Array(10)
    .fill()
    .map(() => Math.random());
  const maxProgress = Math.max(...progresses);
  const progressStatus = new FileProgressStatus(file, maxProgress);

  return {progresses, progressStatus};
};

describe('usePostFilesInput uses replace file', () => {
  test("uses replaceFile if the slide file is changed.", () => {
    const id = "id";
    const initialFile = undefined;
    const slide = fakeFile("slide");
    const replaceFile = fakeReplaceFile();
    const { result } = renderHook(() => usePostFilesInput(id, { replaceFile }));
  
    act(() => {
      result.current.handleSlideFileChanged(slide);
    });
  
    expect(replaceFile).toBeCalledTimes(1);
    expect(replaceFile).toBeCalledWith(id, initialFile, slide, expect.anything(), expect.anything());
  });
  
  test("uses replaceFile if the video file is changed.", () => {
    const id = "id";
    const initialFile = undefined;
    const video = fakeFile("video");
    const replaceFile = fakeReplaceFile();
    const { result } = renderHook(() => usePostFilesInput(id, { replaceFile }));
  
    act(() => {
      result.current.handleVideoFileChanged(video);
    });
  
    expect(replaceFile).toBeCalledTimes(1);
    expect(replaceFile).toBeCalledWith(id, initialFile, video, expect.anything(), expect.anything());
  });
  
  test("replaces file using replaceFile if the slide file is changed more than twice.", () => {
    const id = "id";
    const initialFile = undefined;
    const firstFile = fakeFile("first file");
    const secondFile = fakeFile("second file");
    const replaceFile = fakeReplaceFile();
    const { result } = renderHook(() => usePostFilesInput(id, { replaceFile }));
  
    act(() => {
      result.current.handleSlideFileChanged(firstFile);
      result.current.handleSlideFileChanged(secondFile);
    });
  
    expect(replaceFile).toBeCalledTimes(2);
    expect(replaceFile).toBeCalledWith(id, initialFile, firstFile, expect.anything(), expect.anything());
    expect(replaceFile).toBeCalledWith(id, firstFile, secondFile, expect.anything(), expect.anything());
  });

  test("replaces file using replaceFile if the video file is changed more than twice", () => {
    const id = "id";
    const initialFile = undefined;
    const firstFile = fakeFile("first file");
    const secondFile = fakeFile("second file");
    const replaceFile = fakeReplaceFile();
    const { result } = renderHook(() => usePostFilesInput(id, { replaceFile }));
  
    act(() => {
      result.current.handleVideoFileChanged(firstFile);
      result.current.handleVideoFileChanged(secondFile);
    });
  
    expect(replaceFile).toBeCalledTimes(2);
    expect(replaceFile).toBeCalledWith(id, initialFile, firstFile, expect.anything(), expect.anything());
    expect(replaceFile).toBeCalledWith(id, firstFile, secondFile, expect.anything(), expect.anything());
  });
});

describe('usePostFilesInput has correct progress status', () => {
  test("has correct uploading state when upload is not completed.", () => {
    const id = "id";
    const file = fakeFile();
    const { progresses, progressStatus } = fakeProgresses(file);
    const replaceFile = fakeReplaceFile(progresses);
    const { result } = renderHook(() => usePostFilesInput(id, { replaceFile }));
  
    act(() => {
      result.current.handleSlideFileChanged(file);
    });
  
    expect(result.current.slideProgressStatus).toStrictEqual(progressStatus);
  });

  test("has correct uploading state when upload is not completed.", () => {
    const id = "id";
    const file = fakeFile();
    const { progresses, progressStatus } = fakeProgresses(file);
    const replaceFile = fakeReplaceFile(progresses);
    const { result } = renderHook(() => usePostFilesInput(id, { replaceFile }));
  
    act(() => {
      result.current.handleVideoFileChanged(file);
    });
  
    expect(result.current.videoProgressStatus).toStrictEqual(progressStatus);
  });
  
  test("slideProgressStatus has progressed state when upload is completed.", () => {
    const id = "id";
    const file = fakeFile();
    const progressStatus = new FileProgressStatus(file, 1);
    const replaceFile = fakeReplaceFile([], true);
    const { result } = renderHook(() => usePostFilesInput(id, { replaceFile }));
  
    act(() => {
      result.current.handleSlideFileChanged(file);
    });
    
    expect(result.current.slideProgressStatus).toStrictEqual(progressStatus);
  });

  test("has correct uploaded state when video and slide is uploaded.", () => {
    const id = "id";
    const slide = fakeFile();
    const video = fakeFile();
    const replaceFile = fakeReplaceFile([], true);
    const { result } = renderHook(() => usePostFilesInput(id, { replaceFile }));
  
    act(() => {
      result.current.handleSlideFileChanged(slide);
      result.current.handleVideoFileChanged(video)
    });
    
    expect(result.current.isUploaded).toBe(true);
  });
});