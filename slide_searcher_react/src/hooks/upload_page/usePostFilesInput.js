import { useEffect, useState } from "react";
import FileProgressStatus from "../../value/file_progress_status";

const useFileProgress = () => {
  const [progress, setProgress] = useState(0);
  const completeProgress = () => {
    setProgress(1);
  };
  const reduceProgress = (progress) => {
    setProgress((prevProgress) => Math.max(progress, prevProgress));
  };
  const resetProgress = () => {
    setProgress(0);
  };

  return {
    progress, 
    completeProgress,
    reduceProgress,
    resetProgress,
  };
};

const useFileInput = (id, fileAPI) => {
  const [file, setFile] = useState();
  const {progress, completeProgress, reduceProgress, resetProgress} = useFileProgress();
  const handleFileChanged = (file) => {
    resetProgress();
    setFile((prevFile) => {
      if (prevFile !== file)
        fileAPI.replaceFile(id, prevFile, file, reduceProgress, completeProgress);
      return file;
    });
  };

  return {
    filename: file?.name,
    progressStatus: new FileProgressStatus(file, progress),
    handleFileChanged,
  };
};

const usePostFilesInput = (postId, fileAPI) => {
  const {
    filename: videoFilename,
    progressStatus: videoProgressStatus, 
    handleFileChanged: handleVideoFileChanged,
  } = useFileInput(postId, fileAPI);
  const {
    filename: slideFilename,
    progressStatus: slideProgressStatus, 
    handleFileChanged: handleSlideFileChanged,
  } = useFileInput(postId, fileAPI);
  const [isUploaded, setIsUploaded] = useState(false);
  const filenames = {
    video: videoFilename,
    slide: slideFilename
  };

  useEffect(() => {
    setIsUploaded(videoProgressStatus.isProgressed && slideProgressStatus.isProgressed);
  }, [videoProgressStatus, slideProgressStatus]);

  return {
    filenames,
    videoProgressStatus,
    slideProgressStatus,
    handleVideoFileChanged,
    handleSlideFileChanged,
    isUploaded,
  };
};

export { usePostFilesInput };
